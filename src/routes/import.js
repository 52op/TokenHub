import * as db from "../db.js";
import { jsonResponse, errorResponse } from "../utils.js";
import { requireUser } from "../auth.js";

const PROVIDER_MAP = {
  "openai-compatible-chat": { protocol: "openai_chat", urlField: "baseUrl" },
  "openai-compatible-responses": { protocol: "openai_responses", urlField: "baseUrl" },
  "anthropic-compatible": { protocol: "anthropic", urlField: "baseUrl" },
  "cloudflare-ai": { protocol: "openai_chat", url: "https://api.cloudflare.com/client/v4/accounts/{accountId}/ai/v1" },
  "openrouter": { protocol: "openai_chat", url: "https://openrouter.ai/api/v1" },
  "nvidia": { protocol: "openai_chat", url: "https://integrate.api.nvidia.com/v1" },
  "gemini": { protocol: "openai_chat", url: "https://generativelanguage.googleapis.com/v1beta" },
  "mistral": { protocol: "openai_chat", url: "https://api.mistral.ai/v1" },
  "glm-cn": { protocol: "openai_chat", url: "https://open.bigmodel.cn/api/paas/v4" },
};

function resolveProvider(conn) {
  const provider = conn.provider || "";
  const data = conn.providerSpecificData || {};

  for (const [prefix, cfg] of Object.entries(PROVIDER_MAP)) {
    if (provider.startsWith(prefix)) {
      let url = "";
      if (cfg.urlField && data[cfg.urlField]) {
        url = data[cfg.urlField];
      } else if (cfg.url) {
        url = cfg.url;
        if (url.includes("{accountId}") && data.accountId) {
          url = url.replace("{accountId}", data.accountId);
        }
      }
      return { protocol: cfg.protocol, url: url.replace(/\/+$/, "") };
    }
  }

  if (data.baseUrl) {
    const apiType = data.apiType || "chat";
    return {
      protocol: apiType === "responses" ? "openai_responses" : "openai_chat",
      url: data.baseUrl.replace(/\/+$/, ""),
    };
  }

  return null;
}

export async function handleParse(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const body = await request.json();
  const connections = body.connections || [];
  const modelAliases = body.modelAliases || {};

  const modelsByProvider = {};
  for (const [alias, val] of Object.entries(modelAliases)) {
    const idx = val.indexOf("/");
    if (idx < 0) continue;
    const provider = val.substring(0, idx);
    const modelId = val.substring(idx + 1);
    if (!modelsByProvider[provider]) modelsByProvider[provider] = [];
    if (!modelsByProvider[provider].includes(modelId)) modelsByProvider[provider].push(modelId);
  }

  const results = [];

  for (const conn of connections) {
    const resolved = resolveProvider(conn);
    if (!resolved || !resolved.url) continue;

    const keyValue = conn.apiKey || conn.accessToken || "";
    if (!keyValue) continue;

    const provider = conn.provider || "";
    const models = modelsByProvider[provider] || [];
    if (conn.defaultModel && !models.includes(conn.defaultModel)) {
      models.unshift(conn.defaultModel);
    }

    results.push({
      id: conn.id,
      name: conn.name || conn.email || "",
      url: resolved.url,
      protocol: resolved.protocol,
      keyValue: keyValue,
      defaultModel: conn.defaultModel || "",
      models: models,
      provider: provider,
      isActive: conn.isActive !== false,
      testStatus: conn.testStatus || "",
    });
  }

  return jsonResponse({ items: results, total: results.length });
}

export async function handleImport(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const body = await request.json();
  const items = body.items || [];
  if (items.length === 0) return errorResponse("没有要导入的数据");

  let imported = 0;
  let skipped = 0;

  for (const item of items) {
    if (!item.url || !item.keyValue) { skipped++; continue; }

    const protocols = {};
    if (item.protocol) protocols[item.protocol] = true;
    const models = (item.models && item.models.length > 0) ? item.models : (item.defaultModel ? [item.defaultModel] : []);

    try {
      const ep = await db.createEndpoint(env, user.id, {
        url: item.url,
        name: item.name || item.url,
        protocols,
        models,
      });
      if (ep) {
        await db.createKey(env, user.id, ep.id, item.keyValue, item.name || "");
        imported++;
      } else {
        skipped++;
      }
    } catch (e) {
      skipped++;
    }
  }

  return jsonResponse({ imported, skipped, total: items.length });
}
