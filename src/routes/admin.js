import { requireAdmin } from "../auth.js";
import * as db from "../db.js";
import { jsonResponse, errorResponse } from "../utils.js";

export async function handle(request, env, path) {
  const admin = await requireAdmin(request, env);
  if (!admin) return errorResponse("无权限", 403);

  // User management
  if (path === "/api/admin/users" && request.method === "GET") {
    const url = new URL(request.url);
    const result = await db.getUsers(env, {
      search: url.searchParams.get("search"),
      page: parseInt(url.searchParams.get("page")) || 1,
      limit: parseInt(url.searchParams.get("limit")) || 20,
    });
    return jsonResponse({ users: result.results });
  }

  const userMatch = path.match(/^\/api\/admin\/users\/([^/]+)$/);
  if (userMatch) {
    const uid = userMatch[1];
    if (request.method === "GET") {
      const user = await env.DB.prepare(
        "SELECT id, email, username, role, avatar_url, created_at, updated_at FROM users WHERE id = ?"
      ).bind(uid).first();
      if (!user) return errorResponse("未找到", 404);
      const endpoints = await db.getEndpoints(env, uid, {});
      return jsonResponse({ user, endpoints: endpoints.results });
    }
    if (request.method === "DELETE") {
      await db.deleteUser(env, uid);
      return jsonResponse({ success: true });
    }
  }

  // Site settings
  if (path === "/api/admin/settings") {
    if (request.method === "GET") {
      const settings = await db.getSiteSettings(env);
      const map = {};
      for (const row of settings.results || []) map[row.key] = row.value;
      return jsonResponse({
        settings: map,
        _meta: {
          hasImportBucket: typeof env.IMPORTS_BUCKET !== "undefined",
        },
      });
    }
    if (request.method === "PUT") {
      const body = await request.json();
      for (const [key, value] of Object.entries(body)) {
        await db.updateSiteSetting(env, key, String(value), admin.id);
      }
      return jsonResponse({ success: true });
    }
  }

  return errorResponse("Not Found", 404);
}
