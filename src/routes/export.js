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

function protocolToAppType(protocol) {
  if (protocol === "openai_chat" || protocol === "openai_responses") return "codex";
  if (protocol === "anthropic") return "claude";
  return "openclaw";
}

function buildCodexSettingsConfig(url, apiType, model, keyValue) {
  const wireApi = apiType === "responses" ? "responses" : "chat";
  return JSON.stringify({
    config: "base_url = \"" + url + "\"\nwire_api = \"" + wireApi + "\"\nmodel = \"" + (model || "") + "\"\n",
    auth: { OPENAI_API_KEY: keyValue },
  });
}

function buildClaudeSettingsConfig(url, keyValue, model) {
  const env = { ANTHROPIC_BASE_URL: url, ANTHROPIC_AUTH_TOKEN: keyValue };
  if (model) env.ANTHROPIC_MODEL = model;
  return JSON.stringify({ env });
}

function buildOpenclawSettingsConfig(url, keyValue, model) {
  const obj = { baseUrl: url, apiKey: keyValue, api: "openai-completions" };
  if (model) obj.models = [{ id: model }];
  return JSON.stringify(obj);
}

export async function handleExportCCSwitchData(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const eps = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? ORDER BY name"
  ).bind(user.id).all();

  const providers = [];
  const providerEndpoints = [];
  let providerId = 0;

  for (const ep of (eps.results || [])) {
    const keys = await env.DB.prepare(
      "SELECT * FROM api_keys WHERE endpoint_id = ? ORDER BY created_at"
    ).bind(ep.id).all();
    const keyList = (keys.results || []).filter(k => k.key_value);
    if (keyList.length === 0) continue;

    const protos = safeJsonParse(ep.protocols, {});
    const firstProto = Object.keys(protos).find(k => protos[k]) || "openai_chat";
    const appType = protocolToAppType(firstProto);
    const apiType = firstProto === "openai_responses" ? "responses" : "chat";
    const models = safeJsonParse(ep.models, []);
    const defaultModel = models.length > 0 ? models[0] : "";

    for (let ki = 0; ki < keyList.length; ki++) {
      providerId++;
      let providerName = ep.name || ep.url;
      if (keyList.length > 1) providerName += " #" + (ki + 1);
      const slug = "provider-" + providerId;

      let settingsConfig;
      if (appType === "codex") {
        settingsConfig = buildCodexSettingsConfig(ep.url, apiType, defaultModel, keyList[ki].key_value);
      } else if (appType === "claude") {
        settingsConfig = buildClaudeSettingsConfig(ep.url, keyList[ki].key_value, defaultModel);
      } else {
        settingsConfig = buildOpenclawSettingsConfig(ep.url, keyList[ki].key_value, defaultModel);
      }

      providers.push({
        id: providerId,
        app_type: appType,
        name: providerName,
        slug,
        sort: ki,
        settings_config: settingsConfig,
        website_url: "",
        enable_provider: keyList[ki].is_active === 1 ? 1 : 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      });

      providerEndpoints.push({
        id: providerId,
        provider_id: providerId,
        app_type: appType,
        endpoint_type: "main",
        name: providerName,
        baseUrl: ep.url,
        apiKey: keyList[ki].key_value,
        models: models.join(","),
        sort: 0,
        status: keyList[ki].is_active === 1 ? "active" : "inactive",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      });
    }
  }

  return jsonResponse({ providers, provider_endpoints: providerEndpoints });
}
