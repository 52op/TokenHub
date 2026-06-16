import * as db from "../db.js";
import { jsonResponse, errorResponse } from "../utils.js";
import { requireUser } from "../auth.js";
import { runDetection } from "../detect.js";

export async function handleList(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const url = new URL(request.url);
  const result = await db.getEndpoints(env, user.id, {
    search: url.searchParams.get("search"),
    sort: url.searchParams.get("sort"),
    order: url.searchParams.get("order"),
    page: parseInt(url.searchParams.get("page")) || 1,
    limit: parseInt(url.searchParams.get("limit")) || 20,
  });
  const count = await db.countEndpoints(env, user.id, url.searchParams.get("search"));
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
    "SELECT key_value FROM api_keys WHERE endpoint_id = ? AND user_id = ? LIMIT 1"
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
  }

  return jsonResponse(result);
}
