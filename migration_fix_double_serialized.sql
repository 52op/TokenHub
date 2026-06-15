-- Fix double-serialized protocols/models (stored as '"{}"' instead of '{}')
UPDATE endpoints SET protocols = '{}', models = '[]', updated_at = datetime('now')
WHERE protocols = '"{}"' AND models = '"[]"';
