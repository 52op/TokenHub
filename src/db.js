// ==================== Endpoints ====================

export async function getEndpoints(env, userId, { search, sort, order, page, limit, tag }) {
  let sql = `SELECT e.*,
    (SELECT COUNT(*) FROM api_keys k WHERE k.endpoint_id = e.id) as key_count,
    (SELECT CASE WHEN EXISTS(SELECT 1 FROM api_keys k2 WHERE k2.endpoint_id = e.id AND k2.last_status > 0) THEN 1 ELSE 0 END) as is_alive
    FROM endpoints e WHERE e.user_id = ?`;
  const binds = [userId];
  if (search) {
    sql += " AND (e.name LIKE ? OR e.url LIKE ? OR e.notes LIKE ?)";
    const q = `%${search}%`;
    binds.push(q, q, q);
  }
  if (tag) {
    sql += " AND e.id IN (SELECT endpoint_id FROM endpoint_tags WHERE tag = ? AND user_id = ?)";
    binds.push(tag, userId);
  }
  const sortMap = { name: "e.name", key_count: "key_count", created_at: "e.created_at" };
  const sortCol = sortMap[sort] || "e.created_at";
  const ord = order === "asc" ? "ASC" : "DESC";
  sql += ` ORDER BY ${sortCol} ${ord}`;
  const pg = Math.max(1, page || 1);
  const lim = Math.min(50, Math.max(1, limit || 20));
  sql += " LIMIT ? OFFSET ?";
  binds.push(lim, (pg - 1) * lim);
  return env.DB.prepare(sql).bind(...binds).all();
}

export async function countEndpoints(env, userId, search) {
  let sql = "SELECT COUNT(*) as total FROM endpoints WHERE user_id = ?";
  const binds = [userId];
  if (search) {
    sql += " AND (name LIKE ? OR url LIKE ?)";
    const q = `%${search}%`;
    binds.push(q, q);
  }
  return env.DB.prepare(sql).bind(...binds).first();
}

export async function getEndpoint(env, id, userId) {
  return env.DB.prepare(
    "SELECT * FROM endpoints WHERE id = ? AND user_id = ?"
  ).bind(id, userId).first();
}

export async function createEndpoint(env, userId, data) {
  const { name, url, source_url, protocols, models, notes } = data;

  const existing = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? AND url = ?"
  ).bind(userId, url).first();

  if (existing) {
    const mergedProtos = { ...(JSON.parse(existing.protocols || '{}') || {}), ...(protocols || {}) };
    const existingModels = (function() { try { var m = JSON.parse(existing.models || '[]'); return Array.isArray(m) ? m : []; } catch { return []; } })();
    const newModels = models || [];
    const mergedModels = [...new Set([...existingModels, ...newModels])];
    await env.DB.prepare(
      "UPDATE endpoints SET protocols = ?, models = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(JSON.stringify(mergedProtos), JSON.stringify(mergedModels), existing.id).run();
    return { ...(await env.DB.prepare("SELECT * FROM endpoints WHERE id = ?").bind(existing.id).first()), _existed: true };
  }

  await env.DB.prepare(
    `INSERT INTO endpoints (user_id, name, url, source_url, protocols, models, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(userId, name || "", url, source_url || "", JSON.stringify(protocols || {}),
    JSON.stringify(models || []), notes || "").run();
  return env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? AND url = ? ORDER BY id DESC LIMIT 1"
  ).bind(userId, url).first();
}

export async function updateEndpoint(env, id, userId, data) {
  const updates = [];
  const binds = [];
  for (const key of ["name", "notes", "auto_health", "health_interval"]) {
    if (data[key] !== undefined) {
      updates.push(`${key} = ?`);
      binds.push(data[key]);
    }
  }
  if (data.models !== undefined) {
    updates.push("models = ?");
    binds.push(JSON.stringify(data.models));
  }
  if (data.protocols !== undefined) {
    updates.push("protocols = ?");
    binds.push(JSON.stringify(data.protocols));
  }
  if (updates.length === 0) return null;
  updates.push("updated_at = datetime('now')");
  binds.push(id, userId);
  await env.DB.prepare(
    `UPDATE endpoints SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`
  ).bind(...binds).run();
  return env.DB.prepare(
    "SELECT * FROM endpoints WHERE id = ? AND user_id = ?"
  ).bind(id, userId).first();
}

export async function updateEndpointDetection(env, id, userId, protocols, models) {
  await env.DB.prepare(
    `UPDATE endpoints SET protocols = ?, models = ?, last_detected_at = datetime('now'),
     updated_at = datetime('now') WHERE id = ? AND user_id = ?`
  ).bind(protocols || "{}", models || "[]", id, userId).run();
}

// ==================== Tags ====================

export async function getEndpointTags(env, endpointId, userId) {
  return env.DB.prepare(
    "SELECT tag FROM endpoint_tags WHERE endpoint_id = ? AND user_id = ? ORDER BY tag"
  ).bind(endpointId, userId).all();
}

export async function setEndpointTags(env, endpointId, userId, tags) {
  await env.DB.prepare("DELETE FROM endpoint_tags WHERE endpoint_id = ? AND user_id = ?")
    .bind(endpointId, userId).run();
  for (const tag of tags) {
    const t = String(tag).trim().slice(0, 32);
    if (t) {
      await env.DB.prepare(
        "INSERT OR IGNORE INTO endpoint_tags (endpoint_id, user_id, tag) VALUES (?, ?, ?)"
      ).bind(endpointId, userId, t).run();
    }
  }
}

export async function getAllTags(env, userId) {
  return env.DB.prepare(
    "SELECT DISTINCT tag, COUNT(*) as count FROM endpoint_tags WHERE user_id = ? GROUP BY tag ORDER BY count DESC"
  ).bind(userId).all();
}

export async function deleteEndpoint(env, id, userId) {
  await env.DB.prepare("DELETE FROM api_keys WHERE endpoint_id = ? AND user_id = ?")
    .bind(id, userId).run();
  await env.DB.prepare("DELETE FROM health_checks WHERE endpoint_id = ? AND user_id = ?")
    .bind(id, userId).run();
  await env.DB.prepare("DELETE FROM endpoint_tags WHERE endpoint_id = ? AND user_id = ?")
    .bind(id, userId).run();
  await env.DB.prepare("DELETE FROM endpoints WHERE id = ? AND user_id = ?")
    .bind(id, userId).run();
}

export async function deleteEndpoints(env, ids, userId) {
  const placeholders = ids.map(() => "?").join(",");
  await env.DB.prepare(`DELETE FROM api_keys WHERE endpoint_id IN (${placeholders}) AND user_id = ?`)
    .bind(...ids, userId).run();
  await env.DB.prepare(`DELETE FROM health_checks WHERE endpoint_id IN (${placeholders}) AND user_id = ?`)
    .bind(...ids, userId).run();
  await env.DB.prepare(`DELETE FROM endpoint_tags WHERE endpoint_id IN (${placeholders}) AND user_id = ?`)
    .bind(...ids, userId).run();
  await env.DB.prepare(`DELETE FROM endpoints WHERE id IN (${placeholders}) AND user_id = ?`)
    .bind(...ids, userId).run();
}

// ==================== API Keys ====================

export async function getKeys(env, endpointId, userId) {
  return env.DB.prepare(
    "SELECT id, endpoint_id, alias, SUBSTR(key_value, 1, 3) || '...' || SUBSTR(key_value, -4) as key_masked, last_checked_at, last_status, last_response_time_ms, is_active, created_at FROM api_keys WHERE endpoint_id = ? AND user_id = ? ORDER BY created_at DESC"
  ).bind(endpointId, userId).all();
}

export async function getKeyById(env, id, userId) {
  return env.DB.prepare(
    "SELECT * FROM api_keys WHERE id = ? AND user_id = ?"
  ).bind(id, userId).first();
}

export async function createKey(env, userId, endpointId, keyValue, alias) {
  const existing = await env.DB.prepare(
    "SELECT id, endpoint_id, alias, SUBSTR(key_value, 1, 3) || '...' || SUBSTR(key_value, -4) as key_masked, created_at FROM api_keys WHERE endpoint_id = ? AND key_value = ?"
  ).bind(endpointId, keyValue).first();
  if (existing) return { ...existing, _existed: true };

  await env.DB.prepare(
    "INSERT INTO api_keys (endpoint_id, user_id, key_value, alias) VALUES (?, ?, ?, ?)"
  ).bind(endpointId, userId, keyValue, alias || "").run();
  return env.DB.prepare(
    "SELECT id, endpoint_id, alias, SUBSTR(key_value, 1, 3) || '...' || SUBSTR(key_value, -4) as key_masked, created_at FROM api_keys WHERE endpoint_id = ? AND key_value = ? ORDER BY id DESC LIMIT 1"
  ).bind(endpointId, keyValue).first();
}

export async function updateKey(env, id, userId, data) {
  const updates = [];
  const binds = [];
  if (data.alias !== undefined) { updates.push("alias = ?"); binds.push(data.alias); }
  if (data.is_active !== undefined) { updates.push("is_active = ?"); binds.push(data.is_active ? 1 : 0); }
  if (updates.length === 0) return null;
  binds.push(id, userId);
  await env.DB.prepare(
    `UPDATE api_keys SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`
  ).bind(...binds).run();
}

export async function updateKeyCheckResult(env, id, status, responseTimeMs) {
  await env.DB.prepare(
    `UPDATE api_keys SET last_checked_at = datetime('now'), last_status = ?, last_response_time_ms = ? WHERE id = ?`
  ).bind(status, responseTimeMs, id).run();
}

export async function deleteKey(env, id, userId) {
  await env.DB.prepare("DELETE FROM api_keys WHERE id = ? AND user_id = ?")
    .bind(id, userId).run();
}

// ==================== Health Checks ====================

export async function createHealthCheck(env, userId, data) {
  const { endpoint_id, api_key_id, check_type, target_url, status_code, response_time_ms, is_alive, error_message } = data;
  await env.DB.prepare(
    `INSERT INTO health_checks (endpoint_id, api_key_id, user_id, check_type, target_url, status_code, response_time_ms, is_alive, error_message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(endpoint_id || null, api_key_id || null, userId, check_type || "manual",
    target_url, status_code || null, response_time_ms || null, is_alive ? 1 : 0,
    error_message || "").run();
}

export async function getHealthHistory(env, userId, { endpoint_id, days, page, limit }) {
  let sql = "SELECT * FROM health_checks WHERE user_id = ?";
  const binds = [userId];
  if (endpoint_id) {
    sql += " AND endpoint_id = ?"; binds.push(endpoint_id);
  }
  if (days) {
    sql += " AND checked_at >= datetime('now', '-' || ? || ' days')"; binds.push(String(days));
  }
  sql += " ORDER BY checked_at DESC";
  const pg = Math.max(1, page || 1);
  const lim = Math.min(100, Math.max(1, limit || 20));
  sql += " LIMIT ? OFFSET ?";
  binds.push(lim, (pg - 1) * lim);
  return env.DB.prepare(sql).bind(...binds).all();
}

// ==================== Users (admin) ====================

export async function getUsers(env, { search, page, limit }) {
  let sql = "SELECT id, email, username, role, created_at, updated_at FROM users";
  const binds = [];
  if (search) {
    sql += " WHERE email LIKE ? OR username LIKE ?";
    const q = `%${search}%`;
    binds.push(q, q);
  }
  sql += " ORDER BY created_at DESC";
  const pg = Math.max(1, page || 1);
  const lim = Math.min(50, Math.max(1, limit || 20));
  sql += " LIMIT ? OFFSET ?";
  binds.push(lim, (pg - 1) * lim);
  return env.DB.prepare(sql).bind(...binds).all();
}

export async function deleteUser(env, userId) {
  await env.DB.prepare("DELETE FROM api_keys WHERE user_id = ?").bind(userId).run();
  await env.DB.prepare("DELETE FROM health_checks WHERE user_id = ?").bind(userId).run();
  await env.DB.prepare("DELETE FROM endpoints WHERE user_id = ?").bind(userId).run();
  await env.DB.prepare("DELETE FROM user_settings WHERE user_id = ?").bind(userId).run();
  await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
}

// ==================== Site Settings ====================

export async function getSiteSettings(env) {
  return env.DB.prepare("SELECT * FROM site_settings").all();
}

export async function updateSiteSetting(env, key, value, userId) {
  await env.DB.prepare(
    "INSERT INTO site_settings (key, value, updated_by, updated_at) VALUES (?, ?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = ?, updated_by = ?, updated_at = datetime('now')"
  ).bind(key, value, userId, value, userId).run();
}
