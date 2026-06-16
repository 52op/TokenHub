import * as db from "../db.js";
import { jsonResponse, errorResponse, buildHeaders, fetchWithTimeout } from "../utils.js";
import { requireUser } from "../auth.js";
import { PROBE_PAYLOADS } from "../config.js";

async function withConcurrencyLimit(tasks, limit) {
  const results = [];
  for (let i = 0; i < tasks.length; i += limit) {
    const batch = tasks.slice(i, i + limit);
    results.push(...await Promise.allSettled(batch.map(fn => fn())));
  }
  return results;
}

export async function handleCheckAll(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const endpoints = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? AND auto_health = 1"
  ).bind(user.id).all();

  const epMap = {};
  for (const ep of endpoints.results || []) epMap[ep.id] = ep;

  const keys = await env.DB.prepare(
    "SELECT k.* FROM api_keys k JOIN endpoints e ON k.endpoint_id = e.id WHERE e.user_id = ? AND e.auto_health = 1 AND k.is_active = 1"
  ).bind(user.id).all();

  const allTasks = [];
  for (const key of keys.results || []) {
    const ep = epMap[key.endpoint_id];
    if (!ep) continue;
    allTasks.push(async () => {
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
      return { key_id: key.id, is_alive: isAlive, status_code: statusCode };
    });
  }

  const settled = await withConcurrencyLimit(allTasks, 10);
  const results = settled.filter(r => r.status === "fulfilled").map(r => r.value);
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

  const epMap = {};
  for (const ep of endpoints.results || []) epMap[ep.id] = ep;

  const keys = await env.DB.prepare(
    "SELECT k.* FROM api_keys k JOIN endpoints e ON k.endpoint_id = e.id WHERE e.auto_health = 1 AND k.is_active = 1"
  ).all();

  const allTasks = [];
  for (const key of keys.results || []) {
    const ep = epMap[key.endpoint_id];
    if (!ep) continue;
    allTasks.push(async () => {
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
    });
  }

  await withConcurrencyLimit(allTasks, 10);
}

export async function handleSummary(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const row = await env.DB.prepare(`
    SELECT
      COUNT(DISTINCT e.id) as total_endpoints,
      COUNT(CASE WHEN k.last_status IS NOT NULL AND k.last_status > 0 THEN 1 END) as alive_keys,
      AVG(k.last_response_time_ms) as avg_response_time_ms,
      MAX(k.last_checked_at) as last_checked_at
    FROM endpoints e
    LEFT JOIN api_keys k ON k.endpoint_id = e.id
    WHERE e.user_id = ?
  `).bind(user.id).first();

  return jsonResponse({
    total_endpoints: row.total_endpoints || 0,
    alive_keys: row.alive_keys || 0,
    avg_response_time_ms: row.avg_response_time_ms ? Math.round(row.avg_response_time_ms) : 0,
    last_checked_at: row.last_checked_at || "",
  });
}
