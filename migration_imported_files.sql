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

INSERT OR IGNORE INTO site_settings (key, value) VALUES ('enable_import_storage', '0');
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('max_storage_per_user', '50');
