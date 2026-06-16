import { requireUser, requireAdmin } from "../auth.js";
import { jsonResponse, errorResponse } from "../utils.js";

export async function handleSaveFile(request, env) {
  var user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  if (!env.IMPORTS_BUCKET) return errorResponse("R2 未配置", 500);

  var enabled = await env.DB.prepare(
    "SELECT value FROM site_settings WHERE key = 'enable_import_storage'"
  ).first();
  if (!enabled || enabled.value !== "1") return errorResponse("导入存储未开启", 400);

  var formData = await request.formData();
  var file = formData.get("file");
  if (!file) return errorResponse("未上传文件", 400);

  var importedRows = parseInt(formData.get("imported_rows")) || 0;
  var fileType = formData.get("file_type") || "9router";
  var filename = file.name || ("import-" + Date.now() + ".json");

  // Check storage quota
  var maxMbStr = await env.DB.prepare(
    "SELECT value FROM site_settings WHERE key = 'max_storage_per_user'"
  ).first();
  var maxMb = parseInt((maxMbStr && maxMbStr.value) || "50");
  var maxBytes = maxMb * 1024 * 1024;

  var used = await env.DB.prepare(
    "SELECT COALESCE(SUM(file_size), 0) as total FROM imported_files WHERE user_id = ?"
  ).bind(user.id).first();
  var usedBytes = (used && used.total) || 0;

  if (usedBytes + file.size > maxBytes) {
    return errorResponse("存储空间不足（上限 " + maxMb + "MB）", 413);
  }

  var r2Key = "imports/" + user.id + "/" + Date.now() + "_" + filename;

  // Upload to R2 first
  try {
    await env.IMPORTS_BUCKET.put(r2Key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
    });
  } catch (e) {
    return errorResponse("上传 R2 失败: " + e.message, 500);
  }

  // Write DB record
  await env.DB.prepare(
    "INSERT INTO imported_files (user_id, filename, file_type, r2_key, file_size, imported_rows) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(user.id, filename, fileType, r2Key, file.size, importedRows).run();

  return jsonResponse({ success: true, filename: filename, size: file.size });
}

export async function handleListFiles(request, env) {
  var user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  var url = new URL(request.url);
  var search = url.searchParams.get("search") || "";
  var page = Math.max(1, parseInt(url.searchParams.get("page")) || 1);
  var limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit")) || 20));

  var sql = "SELECT * FROM imported_files WHERE user_id = ?";
  var binds = [user.id];

  if (search) {
    sql += " AND filename LIKE ?";
    binds.push("%" + search + "%");
  }

  var countResult = await env.DB.prepare(
    sql.replace("SELECT *", "SELECT COUNT(*) as total")
  ).bind(...binds).first();
  var total = (countResult && countResult.total) || 0;

  sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  binds.push(limit, (page - 1) * limit);

  var result = await env.DB.prepare(sql).bind(...binds).all();

  return jsonResponse({ files: result.results || [], total: total, page: page, limit: limit });
}

export async function handleDownloadFile(request, env, fileId) {
  var user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  var row = await env.DB.prepare(
    "SELECT * FROM imported_files WHERE id = ?"
  ).bind(fileId).first();

  if (!row) return errorResponse("文件不存在", 404);
  if (row.user_id !== user.id && user.role !== "admin") return errorResponse("无权限", 403);

  if (!env.IMPORTS_BUCKET) return errorResponse("R2 未配置", 500);

  var obj = await env.IMPORTS_BUCKET.get(row.r2_key);
  if (!obj) return errorResponse("文件不存在", 404);

  var headers = {
    "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
    "Content-Disposition": 'attachment; filename="' + row.filename + '"',
    "Cache-Control": "private, max-age=3600",
  };

  return new Response(obj.body, { headers: headers });
}

export async function handleDeleteFile(request, env, fileId) {
  var user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  var row = await env.DB.prepare(
    "SELECT * FROM imported_files WHERE id = ?"
  ).bind(fileId).first();

  if (!row) return errorResponse("文件不存在", 404);
  if (row.user_id !== user.id && user.role !== "admin") return errorResponse("无权限", 403);

  if (env.IMPORTS_BUCKET) {
    try { await env.IMPORTS_BUCKET.delete(row.r2_key); } catch (e) { /* ignore */ }
  }

  await env.DB.prepare("DELETE FROM imported_files WHERE id = ?").bind(fileId).run();

  return jsonResponse({ success: true });
}
