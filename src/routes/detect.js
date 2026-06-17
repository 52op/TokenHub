import { runDetection, probeSinglePath } from "../detect.js";
import { jsonResponse, errorResponse } from "../utils.js";
import { requireUser } from "../auth.js";

export async function handle(request, env) {
  try {
    const body = await request.json();
    const { url, apiKey, path, model } = body;
    if (!url) return errorResponse("缺少 url 参数");

    let result;
    if (path) {
      result = await probeSinglePath(url.trim(), apiKey?.trim() || "", path.trim(), model?.trim() || "");
    } else {
      result = await runDetection(url.trim(), apiKey?.trim() || "");
    }
    return jsonResponse(result);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}

export async function handleRecent(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  const rows = await env.DB.prepare(
    "SELECT hc.*, e.name as endpoint_name FROM health_checks hc LEFT JOIN endpoints e ON hc.endpoint_id = e.id WHERE hc.user_id = ? AND hc.check_type = 'manual' ORDER BY hc.checked_at DESC LIMIT 10"
  ).bind(user.id).all();
  return jsonResponse({ records: rows.results || [] });
}
