import { requireUser } from "../auth.js";
import { jsonResponse, errorResponse } from "../utils.js";

export async function handleMe(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);
  return jsonResponse({ user });
}

export async function handleCheck(request, env) {
  const user = await requireUser(request, env);
  return jsonResponse({ authenticated: !!user });
}

export function handleLogout() {
  return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*" } });
}
