import { requireUser } from "../auth.js";
import { jsonResponse, errorResponse, buildHeaders, fetchWithTimeout } from "../utils.js";
import { PROBE_PAYLOADS } from "../config.js";

const PROBE_PATHS = {
  openai_chat: "/chat/completions",
  openai_responses: "/responses",
  anthropic: "/messages",
};

export async function handleEndpointTest(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const body = await request.json();
  const { url, apiKey, protocol } = body;
  if (!url || !protocol) return errorResponse("缺少 url 或 protocol 参数");

  const path = PROBE_PATHS[protocol];
  if (!path) return errorResponse("不支持的协议");

  const fullUrl = url.replace(/\/+$/, "") + path;
  const headers = buildHeaders(apiKey || "", protocol === "anthropic" ? "anthropic" : "openai");

  try {
    const start = Date.now();
    const resp = await fetchWithTimeout(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(PROBE_PAYLOADS[protocol]),
    }, 10000);
    const bodyText = await resp.text();
    const responseTime = Date.now() - start;

    return jsonResponse({
      status: resp.status,
      responseTime,
      body: bodyText.substring(0, 2000),
      contentType: resp.headers.get("content-type") || "",
      ok: resp.ok,
    });
  } catch (e) {
    return jsonResponse({ status: 0, responseTime: -1, error: e.message || "连接失败", body: "" });
  }
}

export async function handleDirectSend(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const body = await request.json();
  const { url, apiKey, model, message } = body;
  if (!url || !model || !message) return errorResponse("缺少参数");

  let headers, payload;
  if (url.includes("/messages")) {
    headers = buildHeaders(apiKey || "", "anthropic");
    payload = { model, max_tokens: 4096, messages: [{ role: "user", content: message }] };
  } else {
    headers = buildHeaders(apiKey || "", "openai");
    payload = { model, messages: [{ role: "user", content: message }], max_tokens: 4096 };
  }

  try {
    const start = Date.now();
    const resp = await fetchWithTimeout(url, { method: "POST", headers, body: JSON.stringify(payload) }, 30000);
    const bodyText = await resp.text();
    const responseTime = Date.now() - start;

    let reply = "";
    let parsed;
    try { parsed = JSON.parse(bodyText); } catch {}

    if (parsed) {
      if (url.includes("/messages")) {
        reply = (parsed.content || []).map(function(c) { return c.text || ""; }).join("");
      } else {
        const data = parsed.data || parsed;
        const choice = (data.choices || [])[0];
        if (choice) reply = choice.message?.content || choice.delta?.content || "";
      }
    }

    return jsonResponse({ status: resp.status, responseTime, ok: resp.ok, reply, raw: bodyText.substring(0, 1000) });
  } catch (e) {
    return jsonResponse({ status: 0, responseTime: -1, error: e.message || "连接失败" });
  }
}

export async function handleModelTest(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const body = await request.json();
  const { url, apiKey, model, protocol } = body;
  if (!url || !model || !protocol) return errorResponse("缺少参数");

  const path = PROBE_PATHS[protocol];
  if (!path) return errorResponse("不支持的协议");

  const fullUrl = url.replace(/\/+$/, "") + path;
  const headers = buildHeaders(apiKey || "", protocol === "anthropic" ? "anthropic" : "openai");

  let payload;
  if (protocol === "anthropic") {
    payload = { model, max_tokens: 100, messages: [{ role: "user", content: "hi" }] };
  } else {
    payload = { model, messages: [{ role: "user", content: "hi" }], max_tokens: 100 };
  }

  try {
    const start = Date.now();
    const resp = await fetchWithTimeout(fullUrl, { method: "POST", headers, body: JSON.stringify(payload) }, 15000);
    const bodyText = await resp.text();
    const responseTime = Date.now() - start;

    let parsed = null;
    try { parsed = JSON.parse(bodyText); } catch {}

    return jsonResponse({ status: resp.status, responseTime, body: bodyText.substring(0, 3000), parsed, ok: resp.ok });
  } catch (e) {
    return jsonResponse({ status: 0, responseTime: -1, error: e.message || "连接失败", body: "" });
  }
}
