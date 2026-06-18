import * as db from "../db.js";
import { jsonResponse, errorResponse, fetchWithTimeout, buildHeaders } from "../utils.js";
import { requireUser } from "../auth.js";
import { runDetection } from "../detect.js";
import { PROBE_PAYLOADS } from "../config.js";

export async function handleList(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const url = new URL(request.url);
  const result = await db.getEndpoints(env, user.id, {
    search: url.searchParams.get("search"),
    sort: url.searchParams.get("sort"),
    order: url.searchParams.get("order"),
    tag: url.searchParams.get("tag"),
    page: parseInt(url.searchParams.get("page")) || 1,
    limit: parseInt(url.searchParams.get("limit")) || 20,
  });
  const count = await db.countEndpoints(env, user.id, url.searchParams.get("search"));
  // Attach tags to each endpoint
  for (const ep of result.results || []) {
    const tags = await db.getEndpointTags(env, ep.id, user.id);
    ep.tags = (tags.results || []).map(t => t.tag);
  }
  return jsonResponse({ endpoints: result.results, total: count.total });
}

export async function handleCreate(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const body = await request.json();
  if (!body.url) return errorResponse("缺少 url");
  const endpoint = await db.createEndpoint(env, user.id, body);
  return jsonResponse({ endpoint }, 201);
}

export async function handleGet(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const endpoint = await db.getEndpoint(env, id, user.id);
  if (!endpoint) return errorResponse("未找到", 404);
  const keys = await db.getKeys(env, id, user.id);
  return jsonResponse({ endpoint, keys: keys.results });
}

export async function handleUpdate(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const body = await request.json();
  const endpoint = await db.updateEndpoint(env, id, user.id, body);
  if (!endpoint) return errorResponse("未找到或无权限", 404);
  return jsonResponse({ endpoint });
}

export async function handleDelete(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  await db.deleteEndpoint(env, id, user.id);
  return jsonResponse({ success: true });
}

export async function handleBatchDelete(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const body = await request.json();
  if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0)
    return errorResponse("缺少 ids 参数");
  await db.deleteEndpoints(env, body.ids, user.id);
  return jsonResponse({ success: true, count: body.ids.length });
}

export async function handleRedetect(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const endpoint = await db.getEndpoint(env, id, user.id);
  if (!endpoint) return errorResponse("未找到", 404);

  const keyRow = await env.DB.prepare(
    "SELECT id, key_value FROM api_keys WHERE endpoint_id = ? AND user_id = ? LIMIT 1"
  ).bind(id, user.id).first();
  const apiKey = keyRow?.key_value || "";
  const result = await runDetection(endpoint.url, apiKey);

  if (result.success && result.recommendedBase) {
    const protos = {};
    const models = [];
    for (const b of result.allBases) {
      for (const [k, v] of Object.entries(b.protocols)) {
        protos[k] = v.supported;
      }
      if (b.models?.models) {
        models.push(...b.models.models.map(m => m.id || m));
      }
    }
    await db.updateEndpointDetection(env, id, user.id, JSON.stringify(protos), JSON.stringify([...new Set(models)]));

    // Also health-check the first key so is_alive updates
    if (keyRow && apiKey) {
      try {
        const probeUrl = endpoint.url.replace(/\/+$/, "") + "/chat/completions";
        const start = Date.now();
        const resp = await fetchWithTimeout(probeUrl, {
          method: "POST",
          headers: buildHeaders(apiKey, "openai"),
          body: JSON.stringify(PROBE_PAYLOADS.openai_chat),
        }, 10000);
        const status = resp.status;
        const isAlive = (status >= 200 && status < 300) || [400, 401, 403, 422, 429].includes(status);
        const responseTime = Date.now() - start;
        await db.updateKeyCheckResult(env, keyRow.id, isAlive ? status : 0, responseTime);
      } catch (e) {
        // key check failed, don't block detection result
      }
    }
  }

  return jsonResponse(result);
}

export async function handleUpdateTags(request, env, id) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const body = await request.json();
  if (!body.tags || !Array.isArray(body.tags)) return errorResponse("缺少 tags 参数");
  await db.setEndpointTags(env, id, user.id, body.tags);
  const tags = await db.getEndpointTags(env, id, user.id);
  return jsonResponse({ tags: (tags.results || []).map(t => t.tag) });
}

export async function handleAllTags(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const result = await db.getAllTags(env, user.id);
  return jsonResponse({ tags: result.results || [] });
}
