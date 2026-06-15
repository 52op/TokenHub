import * as db from "../db.js";
import { jsonResponse, errorResponse, buildHeaders, fetchWithTimeout } from "../utils.js";
import { requireUser } from "../auth.js";
import { PROBE_PAYLOADS } from "../config.js";

export async function handleCheckAll(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const endpoints = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? AND auto_health = 1"
  ).bind(user.id).all();

  const results = [];
  for (const ep of endpoints.results || []) {
    const keys = await env.DB.prepare(
      "SELECT * FROM api_keys WHERE endpoint_id = ? AND user_id = ? AND is_active = 1"
    ).bind(ep.id, user.id).all();

    for (const key of keys.results || []) {
      const startTime = Date.now();
      let statusCode = 0, isAlive = false, errorMsg = "";
      try {
        const probeUrl = ep.url.replace(/\/+$/, "") + "/chat/completions";
        const resp = await fetchWithTimeout(probeUrl, {
          method: "POST",
          headers: buildHeaders(key.key_value, "openai"),
          body: JSON.stringify(PROBE_PAYLOADS.openai_chat),
        }, 10000);
        statusCode = resp.status;
        isAlive = statusCode >= 200 || [400, 401, 403, 422, 429].includes(statusCode);
      } catch (e) {
        errorMsg = e.message;
      }
      const elapsed = Date.now() - startTime;
      await db.updateKeyCheckResult(env, key.id, isAlive ? statusCode : 0, elapsed);
      await db.createHealthCheck(env, user.id, {
        endpoint_id: ep.id, api_key_id: key.id, check_type: "manual",
        target_url: ep.url, status_code: statusCode, response_time_ms: elapsed,
        is_alive: isAlive, error_message: errorMsg,
      });
      results.push({ key_id: key.id, is_alive: isAlive, status_code: statusCode });
    }
  }
  return jsonResponse({ results, total: results.length });
}

export async function handleHistory(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const url = new URL(request.url);
  const result = await db.getHealthHistory(env, user.id, {
    endpoint_id: url.searchParams.get("endpoint_id"),
    days: parseInt(url.searchParams.get("days")) || 7,
    page: parseInt(url.searchParams.get("page")) || 1,
    limit: parseInt(url.searchParams.get("limit")) || 20,
  });
  return jsonResponse({ checks: result.results });
}

export async function handleCron(env) {
  const endpoints = await env.DB.prepare("SELECT * FROM endpoints WHERE auto_health = 1").all();
  for (const ep of endpoints.results || []) {
    const keys = await env.DB.prepare(
      "SELECT * FROM api_keys WHERE endpoint_id = ? AND is_active = 1"
    ).bind(ep.id).all();
    for (const key of keys.results || []) {
      let statusCode = 0, isAlive = false, errorMsg = "";
      const startTime = Date.now();
      try {
        const probeUrl = ep.url.replace(/\/+$/, "") + "/chat/completions";
        const resp = await fetchWithTimeout(probeUrl, {
          method: "POST",
          headers: buildHeaders(key.key_value, "openai"),
          body: JSON.stringify(PROBE_PAYLOADS.openai_chat),
        }, 10000);
        statusCode = resp.status;
        isAlive = statusCode >= 200 && statusCode < 300 ||
          [400, 401, 403, 422, 429].includes(statusCode);
      } catch (e) {
        errorMsg = e.message;
      }
      const elapsed = Date.now() - startTime;
      await db.updateKeyCheckResult(env, key.id, isAlive ? statusCode : 0, elapsed);
      await db.createHealthCheck(env, key.user_id, {
        endpoint_id: ep.id, api_key_id: key.id, check_type: "auto",
        target_url: ep.url, status_code: statusCode, response_time_ms: elapsed,
        is_alive: isAlive, error_message: errorMsg,
      });
    }
  }
}
