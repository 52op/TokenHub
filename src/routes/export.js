import { jsonResponse, errorResponse } from "../utils.js";
import { requireUser } from "../auth.js";

const PROTOCOL_TO_PROVIDER = {
  openai_chat: "openai-compatible-chat",
  openai_responses: "openai-compatible-responses",
  anthropic: "anthropic-compatible",
};

function protocolToProvider(protocol) {
  return PROTOCOL_TO_PROVIDER[protocol] || "openai-compatible-chat";
}

function protocolToApiType(protocol) {
  return protocol === "openai_responses" ? "responses" : "chat";
}

function safeJsonParse(str, fallback) {
  try { const v = JSON.parse(str); return v; } catch { return fallback; }
}

export async function handleExport9router(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const eps = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? ORDER BY name"
  ).bind(user.id).all();

  const connections = [];
  const modelAliases = [];

  for (const ep of (eps.results || [])) {
    const keys = await env.DB.prepare(
      "SELECT * FROM api_keys WHERE endpoint_id = ? ORDER BY created_at"
    ).bind(ep.id).all();
    const keyList = (keys.results || []).filter(k => k.key_value);
    if (keyList.length === 0) continue;

    const protos = safeJsonParse(ep.protocols, {});
    const firstProto = Object.keys(protos).find(k => protos[k]) || "openai_chat";
    const provider = protocolToProvider(firstProto);
    const apiType = protocolToApiType(firstProto);
    const models = safeJsonParse(ep.models, []);

    for (const m of models) {
      if (m) modelAliases.push({ model: m });
    }

    for (let ki = 0; ki < keyList.length; ki++) {
      const suffix = keyList.length > 1 ? (" #" + (ki + 1)) : "";
      connections.push({
        id: ep.id + "-" + ki,
        provider,
        name: (ep.name || ep.url) + suffix,
        apiKey: keyList[ki].key_value,
        defaultModel: models.length > 0 ? models[0] : "",
        providerSpecificData: {
          baseUrl: ep.url,
          apiType,
        },
        isActive: keyList[ki].is_active === 1,
        testStatus: "",
      });
    }
  }

  return jsonResponse({ providerConnections: connections, modelAliases });
}

export async function handleExportCCSwitchData(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const eps = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? ORDER BY name"
  ).bind(user.id).all();

  const result = [];
  for (const ep of (eps.results || [])) {
    const keys = await env.DB.prepare(
      "SELECT * FROM api_keys WHERE endpoint_id = ? ORDER BY created_at"
    ).bind(ep.id).all();
    const keyList = (keys.results || []).filter(k => k.key_value);
    if (keyList.length === 0) continue;

    result.push({
      name: ep.name || ep.url,
      url: ep.url,
      protocols: safeJsonParse(ep.protocols, {}),
      models: safeJsonParse(ep.models, []),
      keys: keyList.map(k => ({ key_value: k.key_value, is_active: k.is_active })),
    });
  }

  return jsonResponse({ endpoints: result });
}
