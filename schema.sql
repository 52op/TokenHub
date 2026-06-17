-- TokenHub Database Schema

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'admin')),
  avatar_url TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS endpoints (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL,
  source_url TEXT NOT NULL DEFAULT '',
  protocols TEXT NOT NULL DEFAULT '{}',
  models TEXT NOT NULL DEFAULT '[]',
  auto_health INTEGER NOT NULL DEFAULT 0,
  health_interval INTEGER NOT NULL DEFAULT 30,
  last_detected_at TEXT,
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_endpoints_user ON endpoints(user_id);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  endpoint_id TEXT NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  alias TEXT NOT NULL DEFAULT '',
  key_value TEXT NOT NULL,
  last_checked_at TEXT,
  last_status INTEGER,
  last_response_time_ms INTEGER,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_keys_endpoint ON api_keys(endpoint_id);
CREATE INDEX IF NOT EXISTS idx_keys_user ON api_keys(user_id);

CREATE TABLE IF NOT EXISTS health_checks (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  endpoint_id TEXT REFERENCES endpoints(id) ON DELETE SET NULL,
  api_key_id TEXT REFERENCES api_keys(id) ON DELETE SET NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  check_type TEXT NOT NULL DEFAULT 'manual' CHECK(check_type IN ('manual', 'auto', 'redetect')),
  target_url TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  is_alive INTEGER NOT NULL DEFAULT 0,
  error_message TEXT DEFAULT '',
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_checks_user ON health_checks(user_id);
CREATE INDEX IF NOT EXISTS idx_checks_time ON health_checks(checked_at);
CREATE INDEX IF NOT EXISTS idx_checks_endpoint ON health_checks(endpoint_id);

CREATE TABLE IF NOT EXISTS user_settings (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  default_interval INTEGER NOT NULL DEFAULT 30,
  notifications_on INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_by TEXT REFERENCES users(id),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Default site settings
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('site_name', 'TokenHub');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('site_description', 'AI API 接口检测与管理工具');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('default_health_interval', '30');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('max_auto_endpoints', '10');

CREATE TABLE IF NOT EXISTS imported_files (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  imported_rows INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_imported_files_user ON imported_files(user_id);

CREATE TABLE IF NOT EXISTS endpoint_tags (
  endpoint_id TEXT NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  PRIMARY KEY(endpoint_id, tag)
);
CREATE INDEX IF NOT EXISTS idx_tags_user ON endpoint_tags(user_id);
CREATE INDEX IF NOT EXISTS idx_tags_tag ON endpoint_tags(tag);
