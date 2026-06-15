import * as db from "../db.js";
import { jsonResponse, errorResponse, buildHeaders, fetchWithTimeout } from "../utils.js";
import { requireUser } from "../auth.js";
import { PROBE_PAYLOADS } from "../config.js";

export async function handleList(request, env, endpointId) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const keys = await db.getKeys(env, endpointId, user.id);
  return jsonResponse({ keys: keys.results });
}

export async function handleCreate(request, env, endpointId) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const body = await request.json();
  if (!body.key_value) return errorResponse("缺少 key_value");
  const key = await db.createKey(env, user.id, endpointId, body.key_value, body.alias);
  return jsonResponse({ key }, 201);
}

export async function handleUpdate(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const body = await request.json();
  await db.updateKey(env, id, user.id, body);
  return jsonResponse({ success: true });
}

export async function handleDelete(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  await db.deleteKey(env, id, user.id);
  return jsonResponse({ success: true });
}

export async function handleCheck(request, env, keyId) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const key = await db.getKeyById(env, keyId, user.id);
  if (!key) return errorResponse("未找到", 404);
  if (!key.is_active) return errorResponse("Key 已禁用");

  const endpoint = await db.getEndpoint(env, key.endpoint_id, user.id);
  if (!endpoint) return errorResponse("关联接口未找到", 404);

  const startTime = Date.now();
  let statusCode = 0;
  let isAlive = false;
  let errorMsg = "";

  try {
    const probeUrl = endpoint.url.replace(/\/+$/, "") + "/chat/completions";
    const resp = await fetchWithTimeout(probeUrl, {
      method: "POST",
      headers: buildHeaders(key.key_value, "openai"),
      body: JSON.stringify(PROBE_PAYLOADS.openai_chat),
    }, 10000);
    statusCode = resp.status;
    isAlive = statusCode >= 200 && statusCode < 300 ||
      [400, 401, 403, 422, 429].includes(statusCode);
  } catch (e) {
    errorMsg = e.message || "timeout";
    statusCode = 0;
  }

  const elapsed = Date.now() - startTime;
  await db.updateKeyCheckResult(env, keyId, isAlive ? statusCode : 0, elapsed);
  await db.createHealthCheck(env, user.id, {
    endpoint_id: key.endpoint_id,
    api_key_id: keyId,
    check_type: "manual",
    target_url: endpoint.url,
    status_code: statusCode,
    response_time_ms: elapsed,
    is_alive: isAlive,
    error_message: errorMsg,
  });

  return jsonResponse({ is_alive: isAlive, status_code: statusCode, response_time_ms: elapsed, error: errorMsg });
}
