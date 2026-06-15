import { requireUser } from "../auth.js";
import { jsonResponse, errorResponse, buildHeaders, fetchWithTimeout } from "../utils.js";

const PROBE_PATHS = {
  openai_chat: "/chat/completions",
  openai_responses: "/responses",
  anthropic: "/messages",
};

export async function handleChat(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const body = await request.json();
  let { endpointId, model, messages, protocol } = body;
  if (!model || !messages) return errorResponse("缺少参数");
  if (!Array.isArray(messages) || messages.length === 0) return errorResponse("消息不能为空");

  let baseUrl = "", apiKey = "";

  if (endpointId) {
    const endpoint = await env.DB.prepare(
      "SELECT id, url, protocols FROM endpoints WHERE id = ? AND user_id = ?"
    ).bind(endpointId, user.id).first();
    if (!endpoint) return errorResponse("端点不存在", 404);
    baseUrl = endpoint.url;

    if (!protocol) {
      const protos = (function() { try { return JSON.parse(endpoint.protocols || '{}'); } catch { return {}; } })();
      const keys = Object.keys(protos).filter(k => protos[k]);
      protocol = keys[0] || "openai_chat";
    }

    const key = await env.DB.prepare(
      "SELECT id, value FROM api_keys WHERE endpoint_id = ? ORDER BY created_at DESC LIMIT 1"
    ).bind(endpointId).first();
    if (key) apiKey = key.value;
  } else if (body.url) {
    baseUrl = body.url;
    apiKey = body.apiKey || "";
    protocol = protocol || "openai_chat";
  } else {
    return errorResponse("缺少端点信息");
  }

  const path = PROBE_PATHS[protocol];
  if (!path) return errorResponse("不支持的协议");

  const fullUrl = baseUrl.replace(/\/+$/, "") + path;
  const headers = buildHeaders(apiKey, protocol === "anthropic" ? "anthropic" : "openai");

  try {
    const start = Date.now();
    const payload = protocol === "anthropic"
      ? { model, max_tokens: 4096, messages }
      : { model, messages, max_tokens: 4096 };

    const resp = await fetchWithTimeout(fullUrl, { method: "POST", headers, body: JSON.stringify(payload) }, 30000);
    const bodyText = await resp.text();
    const responseTime = Date.now() - start;

    let parsed = null;
    try { parsed = JSON.parse(bodyText); } catch {}

    let reply = "";
    let usage = null;

    if (parsed) {
      if (protocol === "anthropic") {
        const content = parsed.content || [];
        reply = content.map(c => c.text || "").join("");
        usage = parsed.usage || null;
      } else {
        const choice = (parsed.choices || [])[0];
        if (choice) reply = choice.message?.content || choice.delta?.content || "";
        usage = parsed.usage || null;
      }
    }

    return jsonResponse({
      status: resp.status,
      responseTime,
      ok: resp.ok,
      reply,
      usage,
      raw: parsed ? JSON.stringify(parsed).substring(0, 1000) : bodyText.substring(0, 500),
    });
  } catch (e) {
    return jsonResponse({ status: 0, responseTime: -1, error: e.message || "连接失败" });
  }
}
