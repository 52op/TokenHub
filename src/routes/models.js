import { jsonResponse, errorResponse, fetchWithTimeout, isCloudflareUrl, fetchCloudflareModels } from "../utils.js";
import { requireUser } from "../auth.js";

const ANTHROPIC_MODELS = [
  "claude-opus-4-7", "claude-opus-4-6", "claude-sonnet-4-6", "claude-sonnet-4-5-20250514",
  "claude-haiku-4-5-20251001", "claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022",
  "claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307",
];

const CF_HARDCODED = [
  "@cf/meta/llama-4-scout-17b-16e-instruct", "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/moonshotai/kimi-k2.6", "@cf/qwen/qwen2.5-72b-instruct",
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", "@cf/openai/gpt-oss-120b",
  "@cf/google/gemma-3-27b-it", "@cf/mistral/mistral-large-2",
];

async function tryFetchModels(url, apiKey, authType) {
  const headers = {};
  if (apiKey) {
    if (authType === "anthropic") {
      headers["x-api-key"] = apiKey;
      headers["anthropic-version"] = "2023-06-01";
    } else {
      headers["Authorization"] = "Bearer " + apiKey;
    }
  }
  headers["Content-Type"] = "application/json";

  const resp = await fetchWithTimeout(url, { method: "GET", headers }, 10000);
  if (!resp.ok) return null;

  const text = await resp.text();
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data.data)) {
      return data.data.map(function(m) { return typeof m === "string" ? m : (m.id || ""); }).filter(Boolean);
    }
    if (Array.isArray(data.models)) {
      return data.models.map(function(m) { return typeof m === "string" ? m : (m.id || m.name || ""); }).filter(Boolean);
    }
    return null;
  } catch {
    return null;
  }
}

export async function handleGetModels(request, env) {
  const url = new URL(request.url);
  const baseUrl = (url.searchParams.get("url") || "").replace(/\/+$/, "");
  const endpointId = url.searchParams.get("endpointId") || "";
  var apiKey = url.searchParams.get("apiKey") || "";
  const protocol = url.searchParams.get("protocol") || "";

  if (!baseUrl) return errorResponse("缺少 url 参数");

  // If endpointId is given, fetch API key from DB
  if (endpointId) {
    const user = await requireUser(request, env);
    if (!user) return errorResponse("未登录", 401);
    var keyRow = await env.DB.prepare(
      "SELECT key_value FROM api_keys WHERE endpoint_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 1"
    ).bind(endpointId, user.id).first();
    if (keyRow) apiKey = keyRow.key_value;
  }

  if (protocol === "anthropic") {
    return jsonResponse({ models: ANTHROPIC_MODELS, source: "hardcoded" });
  }

  if (isCloudflareUrl(baseUrl) && apiKey) {
    var cfModels = await fetchCloudflareModels(baseUrl, apiKey);
    if (cfModels && cfModels.length > 0) {
      return jsonResponse({ models: cfModels, source: "cloudflare-api" });
    }
    return jsonResponse({ models: CF_HARDCODED, source: "cloudflare-hardcoded" });
  }

  const paths = ["/v1/models", "/models", "/v1/model/list"];
  for (const path of paths) {
    const models = await tryFetchModels(baseUrl + path, apiKey, protocol === "anthropic" ? "anthropic" : "openai");
    if (models && models.length > 0) {
      return jsonResponse({ models: models, source: baseUrl + path });
    }
  }

  return jsonResponse({ models: [], source: null });
}
