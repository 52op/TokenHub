const CSS = `:root {
  --primary: #000000;
  --primary-active: #1a1a1a;
  --text-link: #0d74ce;
  --ink: #171717;
  --body: #60646c;
  --body-strong: #171717;
  --muted: #999999;
  --muted-soft: #cccccc;
  --hairline: #f0f0f3;
  --hairline-soft: #f5f5f7;
  --hairline-strong: #dcdee0;
  --canvas: #ffffff;
  --canvas-soft: #fafafa;
  --surface-card: #ffffff;
  --surface-strong: #f0f0f3;
  --surface-dark: #171717;
  --on-primary: #ffffff;
  --on-dark: #ffffff;
  --on-dark-soft: #b0b4ba;
  --success: #16a34a;
  --error: #eb8e90;
  --warning: #ab6400;
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

body {
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--canvas);
  line-height: 1.5;
  min-height: 100vh;
}

a { color: var(--text-link); text-decoration: none; }
a:hover { text-decoration: underline; }

.display-lg {
  font-family: var(--font-sans);
  font-size: 36px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -1.08px;
  color: var(--ink);
}

.display-sm {
  font-family: var(--font-sans);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: var(--ink);
}

.body-md {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--body);
}

.caption-uppercase {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.88px;
  text-transform: uppercase;
  color: var(--muted);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Navigation */
.top-nav {
  height: 64px;
  background: var(--canvas);
  border-bottom: 1px solid var(--hairline);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--ink) !important;
  text-decoration: none !important;
  letter-spacing: -0.3px;
}

.nav-links {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-links a {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--body) !important;
  text-decoration: none !important;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  transition: color 0.15s, background 0.15s;
}

.nav-links a:hover {
  color: var(--ink) !important;
  background: var(--canvas-soft);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-user-name {
  font-weight: 500;
  color: var(--ink);
}

.badge-admin {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.88px;
  text-transform: uppercase;
  background: var(--surface-strong);
  color: var(--ink);
  padding: 3px 8px;
  border-radius: var(--radius-pill);
  line-height: 1;
}

.nav-logout {
  font-size: 14px;
  font-weight: 500;
  color: var(--body) !important;
  text-decoration: none !important;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: color 0.15s, background 0.15s;
}

.nav-logout:hover {
  color: var(--ink) !important;
  background: var(--canvas-soft);
}

/* Main content */
main {
  padding: 32px 0 64px;
}

/* Cards */
.card {
  background: var(--surface-card);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 16px;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

.card-header {
  margin-bottom: 16px;
}

.key-tooltip {
  position: fixed; z-index: 200;
  background: var(--surface-card);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-md);
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-size: 13px;
  min-width: 260px;
}
.key-tooltip .btn-row { display: flex; gap: 6px; justify-content: flex-end; margin-top: 6px; }
.key-dropdown {
  position: fixed; z-index: 200;
  background: var(--surface-card);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 260px;
  max-height: 200px;
  overflow-y: auto;
}
.key-dropdown-item {
  padding: 8px 12px; cursor: pointer; font-size: 13px;
  border-bottom: 1px solid var(--hairline);
}
.key-dropdown-item:hover { background: var(--surface-strong); }
.key-dropdown-item .label { font-weight: 500; }
.key-dropdown-item .sub { color: var(--muted); font-size: 11px; }

.card-section {
  margin-bottom: 16px;
}

.card-section:last-child {
  margin-bottom: 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  padding: 10px 18px;
  height: 40px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  text-decoration: none !important;
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--primary);
  color: var(--on-primary);
  border-color: var(--primary);
}

.btn-primary:hover {
  background: var(--primary-active);
  border-color: var(--primary-active);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--surface-card);
  color: var(--ink);
  border: 1px solid var(--hairline-strong);
}

.btn-secondary:hover {
  background: var(--surface-strong);
}

.btn-small {
  height: 32px;
  padding: 6px 14px;
  font-size: 13px;
  background: var(--surface-card);
  color: var(--ink);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s;
  font-family: var(--font-sans);
  font-weight: 500;
}

.btn-small:hover {
  background: var(--surface-strong);
}

/* Text Input */
.text-input {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  color: var(--ink);
  background: var(--surface-card);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  height: 44px;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}

.text-input:focus {
  border-color: var(--ink);
  border-width: 2px;
  padding: 11px 15px;
}

select.text-input {
  height: 44px;
  padding: 10px 16px;
  cursor: pointer;
}

.text-input::placeholder {
  color: var(--muted-soft);
}

textarea.text-input {
  height: auto;
  resize: vertical;
  line-height: 1.5;
}

/* Input rows */
.input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.input-row .text-input {
  flex: 1;
}

/* Hero band */
.hero-band {
  padding: 48px 0 32px;
  text-align: center;
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.88px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  line-height: 1.2;
  gap: 4px;
}

.badge-green {
  background: #ecfdf5;
  color: #065f46;
}

.badge-red {
  background: #fef2f2;
  color: #991b1b;
}

.badge-blue {
  background: #eff6ff;
  color: #1e40af;
}

.badge-purple {
  background: #f5f3ff;
  color: #5b21b6;
}

.badge-muted {
  background: var(--surface-strong);
  color: var(--muted);
}

/* Dots */
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-green {
  background: var(--success);
}

.dot-red {
  background: var(--error);
}

.dot-gray {
  background: var(--muted-soft);
}

/* Protocol grid */
.protocol-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

.proto-card {
  background: var(--surface-card);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-md);
  padding: 14px 16px;
}

.proto-card.ok {
  border-color: var(--hairline-strong);
}

.proto-card.no {
  opacity: 0.6;
}

.proto-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.proto-status {
  font-size: 13px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 6px;
}

.proto-url {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--muted);
  margin-top: 6px;
  word-break: break-all;
}

/* Best base URL */
.best-base {
  background: var(--surface-card);
  border: 1px solid var(--success);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 16px;
  text-align: center;
}

.best-base-url {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  margin-top: 4px;
  word-break: break-all;
}

/* Proto base URL */
.proto-base-url {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}

/* Models grid */
.models-wrap {
  margin-top: 16px;
}

.models-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.model-chip {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  background: var(--surface-strong);
  color: var(--muted);
  border: 1px solid var(--hairline);
}

.model-chip.available {
  background: var(--canvas-soft);
  color: var(--ink);
  border-color: var(--hairline-strong);
}

/* Endpoint grid */
.endpoint-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 12px;
}

.endpoint-card {
  background: var(--surface-card);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: pointer;
  transition: box-shadow 0.15s, border-color 0.15s;
  position: relative;
}

.endpoint-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  border-color: var(--hairline-strong);
}

.ep-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}

.ep-url {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
  word-break: break-all;
}

.ep-meta {
  font-size: 12px;
  color: var(--muted-soft);
  margin-top: 8px;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 64px 24px;
  color: var(--muted);
  font-size: 15px;
}

.empty-state a {
  color: var(--text-link);
}

/* Error panel */
.error-panel {
  background: #fef2f2;
  border: 1px solid var(--error);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  color: #991b1b;
  font-size: 14px;
  line-height: 1.5;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--hairline-strong);
  border-top-color: var(--ink);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Search bar */
.search-bar {
  margin-bottom: 16px;
}

/* Filters */
.filters {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* Back link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--body) !important;
  text-decoration: none !important;
  margin-bottom: 20px;
  padding: 4px 0;
}

.back-link:hover {
  color: var(--ink) !important;
}

/* Label */
.label {
  display: block;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  margin-bottom: 6px;
}

/* Code block */
.code-block {
  background: var(--surface-dark);
  color: var(--on-dark);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Toggle */
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--body);
  cursor: pointer;
}

.toggle input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
  cursor: pointer;
}

/* Key list */
.key-list {
  margin-bottom: 12px;
}

.key-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--hairline-soft);
}

.key-row:last-child {
  border-bottom: none;
}

.key-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.key-alias {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

.key-actions {
  display: flex;
  gap: 4px;
}

.add-key-form {
  display: flex;
  gap: 8px;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--hairline-soft);
}

.add-key-form .text-input {
  flex: 1;
}

/* Health table */
.health-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.health-table th {
  text-align: left;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.88px;
  text-transform: uppercase;
  color: var(--muted);
  padding: 10px 12px;
  border-bottom: 1px solid var(--hairline);
}

.health-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--hairline-soft);
  color: var(--ink);
}

.health-table tr:last-child td {
  border-bottom: none;
}

.cell-time {
  white-space: nowrap;
  color: var(--body);
  font-size: 13px;
}

.cell-url {
  font-family: var(--font-mono);
  font-size: 13px;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Progress indicator */
#detectProgress {
  display: none;
  align-items: center;
  gap: 8px;
}

/* Page not found placeholder */

/* Test results */
.test-result { margin-top: 12px; }
.test-result-item { background: var(--canvas-soft); border: 1px solid var(--hairline); border-radius: var(--radius-md); padding: 12px; font-size: 13px; }
.result-item { display: flex; gap: 12px; align-items: center; margin-bottom: 8px; }
.result-status { font-weight: 600; }
.result-status.ok { color: var(--success); }
.result-status.err { color: var(--error); }
.result-time { color: var(--muted); font-size: 12px; }
.result-error { color: var(--error); margin-top: 4px; }
.result-body { font-family: var(--font-mono); font-size: 11px; margin-top: 8px; white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow: auto; color: var(--body); }
.result-chat { font-size: 14px; margin-top: 8px; padding: 8px; background: var(--surface-card); border-radius: var(--radius-sm); line-height: 1.5; }
.send-url { font-size: 12px; color: var(--muted); margin-bottom: 8px; word-break: break-all; }
.btn-small-ghost { background: none; border: none; color: var(--primary); cursor: pointer; font-size: 11px; padding: 2px 6px; border-radius: var(--radius-sm); font-family: var(--font-sans); }
.btn-small-ghost:hover { background: var(--surface-strong); }

/* Chat */
.chat-section { margin-top: 32px; }
.chat-messages { border: 1px solid var(--hairline); border-radius: var(--radius-md); padding: 16px; max-height: 400px; overflow-y: auto; margin-bottom: 12px; background: var(--canvas-soft); }
.chat-msg { margin-bottom: 12px; display: flex; gap: 8px; }
.chat-msg:last-child { margin-bottom: 0; }
.chat-msg .role { font-weight: 600; font-size: 12px; color: var(--muted); min-width: 60px; text-transform: uppercase; letter-spacing: 0.5px; }
.chat-msg .content { flex: 1; font-size: 14px; line-height: 1.6; color: var(--ink); white-space: pre-wrap; }
.chat-msg .content p { margin: 0 0 8px 0; }
.chat-msg .content p:last-child { margin-bottom: 0; }
.chat-msg .content pre { background: var(--surface-dark); color: var(--on-dark); padding: 10px 14px; border-radius: var(--radius-sm); overflow-x: auto; margin: 6px 0; font-size: 12px; line-height: 1.5; }
.chat-msg .content code { font-family: var(--font-mono); font-size: 12px; background: var(--surface-strong); padding: 1px 4px; border-radius: 3px; }
.chat-msg .content pre code { background: none; padding: 0; }
.chat-msg .content ul, .chat-msg .content ol { margin: 6px 0; padding-left: 20px; }
.chat-msg .content li { margin-bottom: 2px; }
.chat-msg .content blockquote { border-left: 3px solid var(--hairline-strong); padding-left: 12px; color: var(--body); margin: 6px 0; }
.chat-msg .content h1, .chat-msg .content h2, .chat-msg .content h3 { margin: 12px 0 6px 0; font-size: 15px; }
.chat-msg .content h1:first-child, .chat-msg .content h2:first-child, .chat-msg .content h3:first-child { margin-top: 0; }
.chat-msg .content table { border-collapse: collapse; margin: 6px 0; font-size: 13px; }
.chat-msg .content th, .chat-msg .content td { border: 1px solid var(--hairline-strong); padding: 4px 8px; text-align: left; }
.chat-msg .content th { background: var(--canvas-soft); font-weight: 600; }
.chat-msg.user .role { color: var(--primary); }
.chat-msg.error .role { color: var(--error); }
.chat-msg.error .content { background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 10px; }
.chat-msg.assistant .role { color: var(--success); }
.chat-input-row { display: flex; gap: 8px; align-items: flex-start; }
.chat-input-row textarea { flex: 1; min-height: 60px; resize: vertical; }
.chat-model-bar { display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
.chat-model-bar select { max-width: 250px; }
.chat-model-bar .label-sm { font-size: 12px; color: var(--muted); font-weight: 500; }

/* Responsive */
@media (max-width: 768px) {
  .nav-links { gap: 2px; }
  .nav-links a { padding: 8px; font-size: 13px; }
  .endpoint-grid { grid-template-columns: 1fr; }
  .protocol-grid { grid-template-columns: 1fr; }
  .add-key-form { flex-direction: column; }
  .input-row { flex-direction: column; }
  .input-row .btn { width: 100%; }
  .hero-band { padding: 32px 0 24px; }
  .display-lg { font-size: 28px; }
  .display-sm { font-size: 20px; }
  .card { padding: 16px; }
  .container { padding: 0 16px; }
  main { padding: 20px 0 40px; }
  .health-table { font-size: 13px; }
  .health-table th, .health-table td { padding: 8px; }
  .cell-url { max-width: 120px; }
}

@media (max-width: 480px) {
  .nav-links a { padding: 6px; font-size: 12px; }
  .nav-user-name { display: none; }
  .nav-inner { gap: 12px; padding: 0 12px; }
  .container { padding: 0 12px; }
}
.toast-container {
  position: fixed; top: 16px; right: 16px; z-index: 9999;
  display: flex; flex-direction: column; gap: 8px; pointer-events: none;
}
.toast {
  pointer-events: auto; padding: 10px 16px; border-radius: var(--radius-sm);
  font-size: 14px; line-height: 1.4; max-width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  animation: toastIn 0.25s ease, toastOut 0.3s ease 2.7s forwards;
  display: flex; align-items: center; gap: 8px;
}
.toast-success { background: #16a34a; color: #fff; }
.toast-error { background: #dc2626; color: #fff; }
.toast-info { background: #2563eb; color: #fff; }
.toast-close { cursor: pointer; opacity: 0.8; margin-left: auto; font-size: 16px; line-height: 1; }
.toast-close:hover { opacity: 1; }
@keyframes toastIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes toastOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(30px); } }
`;

const APP_JS = `
const TOKEN_KEY = 'tokenhub_token';
let detectedBaseUrl = '';
let detectedData = null;
const LS_FORM = 'tokenhub_detect_form';
const LS_KEYS = 'tokenhub_saved_keys';

function showToast(msg, type) {
  type = type || 'success';
  var container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.innerHTML = '<span>' + msg + '</span><span class="toast-close" onclick="this.parentElement.remove()">&times;</span>';
  container.appendChild(el);
  setTimeout(function() { if (el.parentElement) el.remove(); }, 3000);
}

function saveDetectForm() {
  const fields = ['detectUrl','detectKey','detectPath','detectModel','detectMessage'];
  const form = {};
  for (const id of fields) {
    const el = document.getElementById(id);
    form[id] = el ? el.value : '';
  }
  try { localStorage.setItem(LS_FORM, JSON.stringify(form)); } catch (e) {}
  var resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.style.display = (form.detectUrl || form.detectKey || form.detectPath || form.detectModel || form.detectMessage) ? '' : 'none';
}

function restoreDetectForm() {
  try {
    const raw = localStorage.getItem(LS_FORM);
    if (!raw) return;
    const form = JSON.parse(raw);
    for (const id of Object.keys(form)) {
      const el = document.getElementById(id);
      if (el) el.value = form[id] || '';
    }
  } catch (e) {}
  var resetBtn = document.getElementById('resetBtn');
  if (resetBtn && (document.getElementById('detectUrl')?.value || document.getElementById('detectKey')?.value)) resetBtn.style.display = '';
}

function clearLocalData() {
  try { localStorage.removeItem(LS_FORM); localStorage.removeItem(LS_KEYS); } catch (e) {}
}

function handleReset() {
  if (!confirm('确定清空所有本地保存内容？')) return;
  clearLocalData();
  for (const id of ['detectUrl','detectKey','detectPath','detectModel','detectMessage']) {
    const el = document.getElementById(id);
    if (el) el.value = '';
  }
  var resetBtn = document.getElementById('resetBtn');
  if (resetBtn) resetBtn.style.display = 'none';
  clearKeyEditIcon();
}

/* Key marking */
function getSavedKeys() {
  try { const raw = localStorage.getItem(LS_KEYS); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
}

function putSavedKeys(keys) {
  try { localStorage.setItem(LS_KEYS, JSON.stringify(keys)); } catch (e) {}
}

function generateKeyId() { return 'k_' + Date.now() + '_' + Math.random().toString(36).substring(2,6); }

function handleKeyBlur() {
  var keyEl = document.getElementById('detectKey');
  if (!keyEl) return;
  var val = keyEl.value.trim();
  if (!val) return;
  var keys = getSavedKeys();
  var existing = null;
  for (var i = 0; i < keys.length; i++) { if (keys[i].key_value === val) { existing = keys[i]; break; } }
  if (existing) { showKeyEditIcon(existing); return; }
  showKeyTooltip(val);
}

function handleKeyFocus() {
  var keys = getSavedKeys();
  if (keys.length === 0) return;
  var currentUrl = getDetectUrl();
  var filtered = keys.filter(function(k) { return !k.url || k.url === currentUrl; });
  if (filtered.length === 0) return;
  var existing = document.getElementById('keyDropdown');
  if (existing) existing.remove();
  var keyEl = document.getElementById('detectKey');
  if (!keyEl) return;
  var rect = keyEl.getBoundingClientRect();
  var dd = document.createElement('div');
  dd.id = 'keyDropdown';
  dd.className = 'key-dropdown';
  dd.style.top = (rect.bottom + 4) + 'px';
  dd.style.left = rect.left + 'px';
  filtered.sort(function(a,b) { return (a.updated_at||'') > (b.updated_at||'') ? -1 : 1; });
  for (var i = 0; i < filtered.length; i++) {
    (function(k) {
      var item = document.createElement('div');
      item.className = 'key-dropdown-item';
      item.innerHTML = '<div class="label">' + escapeHtml(k.label) + '</div><div class="sub">' + escapeHtml(k.key_value.substring(0,12)) + '...' + escapeHtml(k.key_value.slice(-4)) + '</div>';
      item.onclick = function() {
        keyEl.value = k.key_value;
        dd.remove();
        saveDetectForm();
        showKeyEditIcon(k);
      };
      dd.appendChild(item);
    })(filtered[i]);
  }
  document.body.appendChild(dd);
  setTimeout(function() {
    document.addEventListener('click', function _close(e) {
      if (!dd.contains(e.target) && e.target !== keyEl) { dd.remove(); document.removeEventListener('click', _close); }
    });
  }, 10);
}

function showKeyTooltip(keyVal) {
  var tooltip = document.getElementById('keyTooltip');
  var keyEl = document.getElementById('detectKey');
  if (!tooltip || !keyEl) return;
  var rect = keyEl.getBoundingClientRect();
  tooltip.style.top = (rect.bottom + 4) + 'px';
  tooltip.style.left = rect.left + 'px';
  tooltip.style.display = 'block';
  var defaultLabel = 'Key #' + (getSavedKeys().length + 1);
  tooltip.innerHTML =
    '<div style="margin-bottom:6px;color:var(--body);font-size:12px">为此 Key 添加备注</div>' +
    '<input type="text" id="keyLabelInput" class="text-input" value="' + escapeHtml(defaultLabel) + '" placeholder="备注名" />' +
    '<div class="btn-row">' +
      '<button class="btn btn-small btn-secondary" onclick="skipKeyLabel()">跳过</button>' +
      '<button class="btn btn-small btn-primary" onclick="confirmKeyLabel()">确定</button>' +
    '</div>';
  setTimeout(function() { var inp = document.getElementById('keyLabelInput'); if (inp) inp.focus(); }, 50);
}

function getDetectUrl() {
  var el = document.getElementById('detectUrl');
  return el ? el.value.trim() : '';
}

function confirmKeyLabel() {
  var inp = document.getElementById('keyLabelInput');
  var tooltip = document.getElementById('keyTooltip');
  if (!inp || !tooltip) return;
  var label = inp.value.trim() || 'Key #' + (getSavedKeys().length + 1);
  var keyEl = document.getElementById('detectKey');
  var val = keyEl ? keyEl.value.trim() : '';
  if (!val) { tooltip.style.display = 'none'; return; }
  var keys = getSavedKeys();
  keys.push({ id: generateKeyId(), key_value: val, label: label, url: getDetectUrl(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  putSavedKeys(keys);
  tooltip.style.display = 'none';
  showKeyEditIcon({ key_value: val, label: label });
}

function skipKeyLabel() {
  var tooltip = document.getElementById('keyTooltip');
  var keyEl = document.getElementById('detectKey');
  var val = keyEl ? keyEl.value.trim() : '';
  if (!val) { tooltip.style.display = 'none'; return; }
  var keys = getSavedKeys();
  var label = 'Key #' + (keys.length + 1);
  keys.push({ id: generateKeyId(), key_value: val, label: label, url: getDetectUrl(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  putSavedKeys(keys);
  tooltip.style.display = 'none';
  showKeyEditIcon({ key_value: val, label: label });
}

function clearKeyEditIcon() {
  var el = document.getElementById('keyEditIcon');
  if (el) el.remove();
  var dd = document.getElementById('keyDropdown');
  if (dd) dd.remove();
}

function showKeyEditIcon(savedKey) {
  clearKeyEditIcon();
  var keyEl = document.getElementById('detectKey');
  if (!keyEl) return;
  var icon = document.createElement('span');
  icon.id = 'keyEditIcon';
  icon.textContent = ' ✏️';
  icon.style.cssText = 'cursor:pointer;font-size:14px;margin-left:4px;color:var(--muted);user-select:none';
  icon.title = savedKey.label ? ('备注: ' + savedKey.label) : '编辑备注';
  icon.onclick = function() { editKeyLabel(savedKey); };
  keyEl.parentNode.insertBefore(icon, keyEl.nextSibling);
}

function editKeyLabel(savedKey) {
  var tooltip = document.getElementById('keyTooltip');
  var keyEl = document.getElementById('detectKey');
  if (!tooltip || !keyEl) return;
  var rect = keyEl.getBoundingClientRect();
  tooltip.style.top = (rect.bottom + 4) + 'px';
  tooltip.style.left = rect.left + 'px';
  tooltip.style.display = 'block';
  tooltip.innerHTML =
    '<div style="margin-bottom:6px;color:var(--body);font-size:12px">修改备注</div>' +
    '<input type="text" id="keyLabelInput" class="text-input" value="' + escapeHtml(savedKey.label) + '" placeholder="备注名" />' +
    '<div class="btn-row">' +
      '<button class="btn btn-small btn-secondary" onclick="document.getElementById(\\'keyTooltip\\').style.display=\\'none\\'">取消</button>' +
      '<button class="btn btn-small btn-primary" onclick="updateKeyLabel()">确定</button>' +
    '</div>';
  setTimeout(function() { var inp = document.getElementById('keyLabelInput'); if (inp) inp.focus(); }, 50);
}

function updateKeyLabel() {
  var inp = document.getElementById('keyLabelInput');
  var tooltip = document.getElementById('keyTooltip');
  if (!inp || !tooltip) return;
  var label = inp.value.trim();
  var keyEl = document.getElementById('detectKey');
  var val = keyEl ? keyEl.value.trim() : '';
  if (!val || !label) { tooltip.style.display = 'none'; return; }
  var keys = getSavedKeys();
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].key_value === val) { keys[i].label = label; keys[i].updated_at = new Date().toISOString(); break; }
  }
  putSavedKeys(keys);
  tooltip.style.display = 'none';
}

/* Pending models */
var LS_PENDING_MODELS = 'tokenhub_pending_models';

function getPendingModels(url) {
  try { var raw = localStorage.getItem(LS_PENDING_MODELS); var map = raw ? JSON.parse(raw) : {}; return map[url] || []; } catch (e) { return []; }
}

function addPendingModel(url, model) {
  try {
    var raw = localStorage.getItem(LS_PENDING_MODELS);
    var map = raw ? JSON.parse(raw) : {};
    if (!map[url]) map[url] = [];
    if (!map[url].includes(model)) map[url].push(model);
    localStorage.setItem(LS_PENDING_MODELS, JSON.stringify(map));
  } catch (e) {}
}

function clearPendingModels(url) {
  try {
    var raw = localStorage.getItem(LS_PENDING_MODELS);
    var map = raw ? JSON.parse(raw) : {};
    delete map[url];
    localStorage.setItem(LS_PENDING_MODELS, JSON.stringify(map));
  } catch (e) {}
}

function showModelAddPrompt(baseUrl, model, anchorEl) {
  var existing = document.getElementById('modelAddPrompt');
  if (existing) existing.remove();
  var rect = anchorEl.getBoundingClientRect();
  var el = document.createElement('div');
  el.id = 'modelAddPrompt';
  el.className = 'key-tooltip';
  el.style.top = (rect.bottom + 4) + 'px';
  el.style.left = rect.left + 'px';
  el.style.display = 'block';
  el.innerHTML = '<div style="margin-bottom:6px;color:var(--body);font-size:12px">✓ 模型可用，添加到接口？</div>' +
    '<div class="btn-row">' +
      '<button class="btn btn-small btn-secondary" onclick="document.getElementById(\\'modelAddPrompt\\').remove()">忽略</button>' +
      '<button class="btn btn-small btn-primary" onclick="confirmAddModel(\\'' + escapeHtml(baseUrl) + '\\',\\'' + escapeHtml(model) + '\\')">添加</button>' +
    '</div>';
  document.body.appendChild(el);
  setTimeout(function() {
    document.addEventListener('click', function _close(e) {
      if (!el.contains(e.target)) { el.remove(); document.removeEventListener('click', _close); }
    });
  }, 10);
}

function confirmAddModel(baseUrl, model) {
  addPendingModel(baseUrl, model);
  document.getElementById('modelAddPrompt')?.remove();
  showToast('模型 ' + model + ' 已加入待保存列表');
}

function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

/* Quick add */
async function quickAddEndpoint() {
  var urlEl = document.getElementById('detectUrl');
  var keyEl = document.getElementById('detectKey');
  var pathEl = document.getElementById('detectPath');
  if (!urlEl || !urlEl.value.trim()) return showToast('请输入 API URL', 'info');
  if (!isLoggedIn()) { showToast('请先登录后再保存', 'info'); doLogin(); return; }
  var baseUrl = urlEl.value.trim().replace(/\\/+$/, '');
  var path = pathEl ? pathEl.value.trim() : '';
  var fullUrl = path ? (baseUrl + (path.startsWith('/') ? path : '/' + path)) : baseUrl;
  var key = keyEl ? keyEl.value.trim() : '';
  var model = document.getElementById('detectModel')?.value.trim() || '';
  var pending = getPendingModels(baseUrl);
  var allModels = model ? [...new Set([model, ...pending])] : pending;
  try {
    var data = await API.post('/api/endpoints', { url: fullUrl, name: fullUrl, protocols: {}, models: allModels });
    var epId = data.endpoint?.id;
    var existed = data.endpoint?._existed;
    if (key && epId) {
      var keyData = await API.post('/api/endpoints/' + epId + '/keys', { key_value: key, alias: '' });
      if (keyData.key?._existed) showToast('接口已存在，Key 已关联');
      else if (existed) showToast('接口已存在，新 Key 已添加');
      else showToast('已保存到仪表盘');
    } else {
      showToast(existed ? '接口已存在，已更新' : '已保存到仪表盘');
    }
    clearPendingModels(baseUrl);
    navigate('/app');
  } catch (e) {
    showToast('保存失败: ' + e.message, 'error');
  }
}

async function quickAddProtocolCard(baseUrl, protocol, apiKey) {
  if (!isLoggedIn()) { showToast('请先登录后再保存', 'info'); doLogin(); return; }
  var protos = {};
  protos[protocol] = true;
  var model = document.getElementById('detectModel')?.value.trim() || '';
  var pending = getPendingModels(baseUrl);
  var allModels = model ? [...new Set([model, ...pending])] : pending;
  try {
    var data = await API.post('/api/endpoints', { url: baseUrl, name: baseUrl, protocols: protos, models: allModels });
    var epId = data.endpoint?.id;
    var existed = data.endpoint?._existed;
    if (apiKey && epId) {
      var keyData = await API.post('/api/endpoints/' + epId + '/keys', { key_value: apiKey, alias: '' });
      if (keyData.key?._existed) showToast('接口已存在，Key 已关联');
      else if (existed) showToast('接口已存在，新 Key 已添加');
      else showToast('已保存到仪表盘');
    } else {
      showToast(existed ? '接口已存在，已更新' : '已保存到仪表盘');
    }
  } catch (e) {
    showToast('保存失败: ' + e.message, 'error');
  }
}
const API_BASE = '';

const API = {
  async call(method, path, body) {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const resp = await fetch(API_BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (resp.status === 204) return null;
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ error: resp.statusText }));
      throw new Error(err.error || 'Request failed');
    }
    return resp.json();
  },
  get(path) { return this.call('GET', path); },
  post(path, body) { return this.call('POST', path, body); },
  put(path, body) { return this.call('PUT', path, body); },
  del(path) { return this.call('DELETE', path); },
  upload: async function(url, formData) {
    var headers = {};
    var token = localStorage.getItem(TOKEN_KEY);
    if (token) headers['Authorization'] = 'Bearer ' + token;
    var res = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData,
      credentials: 'same-origin',
    });
    if (!res.ok) {
      var err = await res.json().catch(function() { return { error: res.statusText }; });
      throw new Error(err.error || 'Upload failed');
    }
    return res.json();
  },
};

function navigate(path) {
  history.pushState(null, '', path);
  renderPage();
  return false;
}

window.addEventListener('popstate', renderPage);

async function renderPage() {
  const path = location.pathname;
  const app = document.getElementById('app');
  if (!app) return;

  const isPublicPage = path === '/' || path === '';
  if (!isPublicPage && !isLoggedIn()) {
    doLogin();
    return;
  }

  try {
    if (path === '/' || path === '') {
      app.innerHTML = renderDetectPage();
      restoreDetectForm();
    } else if (path === '/app') {
      app.innerHTML = renderDashboard();
      restoreDashState();
      await loadDashboard();
    } else if (path.startsWith('/app/endpoint/')) {
      const id = path.split('/')[3];
      app.innerHTML = renderEndpointDetail(id);
      await loadEndpointDetail(id);
    } else if (path === '/app/health') {
      app.innerHTML = renderHealthPage();
      await loadHealthPage();
    } else if (path === '/app/admin') {
      app.innerHTML = renderAdminPage();
      await loadAdminPage();
    } else {
      app.innerHTML = '<div class="container" style="padding:48px;text-align:center;color:var(--muted)">页面未找到</div>';
    }
  } catch (e) {
    app.innerHTML = '<div class="container" style="padding:48px"><div class="error-panel">' + escapeHtml(e.message) + '</div></div>';
  }
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function initApp() {
  try {
    const data = await API.get('/api/auth/me');
    const user = data.user;
    const navUser = document.getElementById('navUser');
    if (user) {
      const avatarUrl = user.avatar_url || '';
      const avatarHtml = avatarUrl ? '<img class="nav-avatar" src="' + escapeHtml(avatarUrl) + '" alt="" />' : '';
      navUser.innerHTML = avatarHtml + '<span class="nav-user-name">' + escapeHtml(user.username || user.email) + '</span>' +
        (user.role === 'admin' ? '<span class="badge-admin">admin</span>' : '') +
        '<a href="#" onclick="handleLogout();return false" class="nav-logout">退出</a>';
      const adminLink = document.getElementById('adminLink');
      if (adminLink) adminLink.style.display = user.role === 'admin' ? '' : 'none';
    }
  } catch (e) {
    const ssoUrl = 'https://auth.it0731.cn';
    const redirect = encodeURIComponent(location.origin + '/sso/callback');
    location.href = ssoUrl + '/login?redirect=' + redirect;
  }
}

async function handleLogout() {
  localStorage.removeItem(TOKEN_KEY);
  location.href = '/';
}

var PATH_SUGGESTIONS = [
  { path: '/chat/completions', label: '聊天补全 (OpenAI Chat)', protocol: 'openai_chat' },
  { path: '/responses', label: 'Responses (OpenAI Responses)', protocol: 'openai_responses' },
  { path: '/messages', label: '消息 (Anthropic)', protocol: 'anthropic' },
  { path: '/v1/chat/completions', label: 'v1 聊天补全', protocol: 'openai_chat' },
  { path: '/v1/models', label: '模型列表', protocol: '' },
  { path: '/embeddings', label: '向量嵌入', protocol: 'openai_chat' },
  { path: '/completions', label: '传统补全', protocol: 'openai_chat' },
  { path: '/v1/completions', label: 'v1 传统补全', protocol: 'openai_chat' },
];

function showPathDropdown() {
  var dd = document.getElementById('pathDropdown');
  if (!dd) return;
  renderPathDropdown(PATH_SUGGESTIONS);
  dd.style.display = 'block';
  setTimeout(function() {
    document.addEventListener('click', function _close(e) {
      if (!dd.contains(e.target) && e.target.id !== 'detectPath') {
        dd.style.display = 'none';
        document.removeEventListener('click', _close);
      }
    });
  }, 10);
}

function hidePathDropdown() {
  var dd = document.getElementById('pathDropdown');
  if (dd) dd.style.display = 'none';
}

function filterPathDropdown() {
  var inp = document.getElementById('detectPath');
  var dd = document.getElementById('pathDropdown');
  if (!inp || !dd) return;
  var q = inp.value.trim().toLowerCase();
  var filtered = q ? PATH_SUGGESTIONS.filter(function(s) {
    return s.path.toLowerCase().includes(q) || s.label.toLowerCase().includes(q);
  }) : PATH_SUGGESTIONS;
  renderPathDropdown(filtered);
  dd.style.display = 'block';
}

function renderPathDropdown(items) {
  var dd = document.getElementById('pathDropdown');
  if (!dd) return;
  if (items.length === 0) {
    dd.innerHTML = '<div style="padding:8px 12px;font-size:13px;color:var(--muted)">无匹配路径</div>';
    return;
  }
  var html = '';
  for (var i = 0; i < items.length; i++) {
    var s = items[i];
    html += '<div class="key-dropdown-item" style="cursor:pointer" onclick="selectPath(\\'' + escapeHtml(s.path) + '\\')">' +
      '<div style="font-family:var(--font-mono);font-size:13px">' + escapeHtml(s.path) + '</div>' +
      '<div style="font-size:11px;color:var(--muted)">' + escapeHtml(s.label) + '</div>' +
    '</div>';
  }
  dd.innerHTML = html;
}

function selectPath(path) {
  var inp = document.getElementById('detectPath');
  if (inp) inp.value = path;
  hidePathDropdown();
  saveDetectForm();
}

function renderDetectPage() {
  return '<div class="container">' +
    '<div class="hero-band">' +
      '<h1 class="display-lg">API 接口检测</h1>' +
      '<p class="body-md" style="margin-top:8px">输入 URL 自动检测，填写更多字段可定向测试</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="input-row">' +
        '<input type="text" id="detectUrl" class="text-input" placeholder="API URL，如 https://api.cline.bot" oninput="saveDetectForm()" />' +
      '</div>' +
      '<div class="input-row" style="margin-top:8px">' +
        '<div style="position:relative;flex:1">' +
          '<input type="password" id="detectKey" class="text-input" placeholder="API Key（可选）" oninput="saveDetectForm();clearKeyEditIcon()" onfocus="handleKeyFocus()" onblur="handleKeyBlur()" style="width:100%" />' +
        '</div>' +
        '<div style="position:relative;flex:1">' +
          '<input type="text" id="detectPath" class="text-input" placeholder="自定义路径（可选）如 /v1/chat/completions" oninput="saveDetectForm();filterPathDropdown()" onfocus="showPathDropdown()" onkeydown="if(event.key===\\'Escape\\')hidePathDropdown()" style="width:100%" />' +
          '<div id="pathDropdown" style="display:none;position:absolute;left:0;right:0;top:100%;margin-top:4px;max-height:200px;overflow-y:auto;background:var(--surface-card);border:1px solid var(--hairline-strong);border-radius:var(--radius-md);box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:200"></div>' +
        '</div>' +
      '</div>' +
      '<div class="input-row" style="margin-top:8px">' +
        '<input type="text" id="detectModel" class="text-input" placeholder="模型 ID（可选）如 gpt-4o" oninput="saveDetectForm()" />' +
        '<input type="text" id="detectMessage" class="text-input" placeholder="聊天内容（可选，填写后直接发送）" oninput="saveDetectForm()" />' +
        '<button class="btn btn-primary" id="detectBtn" onclick="startDetection()">⚡ 检测</button>' +
        '<button class="btn btn-secondary" onclick="quickAddEndpoint()">+ 添加</button>' +
        '<button class="btn btn-secondary" id="resetBtn" onclick="handleReset()" style="display:none">↺ 重置</button>' +
      '</div>' +
      '<div id="keyTooltip" class="key-tooltip" style="display:none"></div>' +
      '<div id="detectProgress" style="display:none;margin-top:12px">' +
        '<div style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px">' +
          '<span class="spinner"></span> 正在探测多个路径...' +
        '</div>' +
        '<div style="margin-top:8px;background:var(--hairline);border-radius:4px;height:4px;overflow:hidden">' +
          '<div id="progressBar" style="height:100%;background:var(--primary);border-radius:4px;width:0%;transition:width 0.3s"></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div id="detectResults"></div>' +
  '</div>';
}

async function startDetection() {
  const url = document.getElementById('detectUrl').value.trim();
  const key = document.getElementById('detectKey').value.trim();
  const path = document.getElementById('detectPath').value.trim();
  const model = document.getElementById('detectModel').value.trim();
  const message = document.getElementById('detectMessage').value.trim();
  if (!url) return showToast('请输入 API URL', 'info');

  const btn = document.getElementById('detectBtn');
  const progress = document.getElementById('detectProgress');
  const progressBar = document.getElementById('progressBar');
  const results = document.getElementById('detectResults');
  btn.disabled = true;
  progress.style.display = '';
  results.innerHTML = '';

  var progressVal = 0;
  var progressTimer = setInterval(function() {
    progressVal = Math.min(progressVal + Math.random() * 15, 90);
    if (progressBar) progressBar.style.width = progressVal + '%';
  }, 500);

  try {
    if (message && model) {
      const baseUrl = url.replace(/\\/+$/, '');
      const targetUrl = path ? (baseUrl + (path.startsWith('/') ? path : '/' + path)) : (baseUrl + '/chat/completions');
      const data = await API.post('/api/test/send', { url: targetUrl, apiKey: key, model, message });
      results.innerHTML = renderSendResult(data, url, key, path, model, message);
    } else {
      const data = await API.post('/api/detect', { url, apiKey: key, path: path || undefined, model: model || undefined });
      detectedBaseUrl = data.recommendedBase || url;
      detectedData = data;
      results.innerHTML = renderDetectResults(data, url, key, path);
    }
    if (progressBar) progressBar.style.width = '100%';
  } catch (e) {
    results.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  } finally {
    clearInterval(progressTimer);
    setTimeout(function() { progress.style.display = 'none'; if (progressBar) progressBar.style.width = '0%'; }, 300);
    btn.disabled = false;
  }
}

function renderDetectResults(data, url, apiKey, customPath) {
  if (!data.success) {
    return '<div class="card"><div class="error-panel"><strong>检测失败</strong><br>' + escapeHtml(data.error || '无法发现有效端点') + '</div></div>';
  }

  const isProbe = data.mode === 'probe';
  let html = '';

  // Collect detected protocols and models
  var detectedProtos = {};
  var detectedModels = [];
  for (const b of (data.allBases || [])) {
    for (const [pk, info] of Object.entries(b.protocols)) {
      if (info.supported) detectedProtos[pk] = true;
    }
    if (b.models && b.models.models) {
      for (const m of b.models.models) {
        var mid = typeof m === 'string' ? m : (m.id || '');
        if (mid && !detectedModels.includes(mid)) detectedModels.push(mid);
      }
    }
  }

  // Save section at top
  html += '<div class="card" style="background:var(--canvas-soft)">' +
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">' +
      '<span style="font-weight:600;font-size:15px">保存到我的接口</span>' +
      '<input type="text" id="saveEpName" class="text-input" placeholder="接口名称" style="max-width:300px;flex:1" value="' + escapeHtml(url) + '" />' +
      '<button class="btn btn-primary" onclick="saveEndpoint()">保存</button>' +
    '</div>' +
    '<div style="margin-top:8px;font-size:12px;color:var(--muted)">' +
      (Object.keys(detectedProtos).length > 0 ? '协议: ' + Object.keys(detectedProtos).map(function(k) { return { openai_chat: 'Chat', openai_responses: 'Responses', anthropic: 'Anthropic' }[k] || k; }).join(', ') : '') +
      (detectedModels.length > 0 ? ' · 模型: ' + detectedModels.slice(0, 3).join(', ') + (detectedModels.length > 3 ? ' +' + (detectedModels.length - 3) : '') : '') +
    '</div>' +
  '</div>';

  if (data.recommendedBase) {
    html += '<div class="best-base"><div class="caption-uppercase">' + (isProbe ? '探测 URL' : '推荐 Base URL') + '</div>' +
      '<div class="best-base-url">' + escapeHtml(data.recommendedBase) + '</div></div>';
  }

  var allBases = (data.allBases || []).slice().sort(function(a, b) {
    var aSupport = Object.values(a.protocols || {}).some(function(p) { return p.supported; });
    var bSupport = Object.values(b.protocols || {}).some(function(p) { return p.supported; });
    if (aSupport && !bSupport) return -1;
    if (!aSupport && bSupport) return 1;
    return 0;
  });

  for (var bi = 0; bi < allBases.length; bi++) {
    var b = allBases[bi];
    html += '<div class="card">';
    if (isProbe && b.modelVerified) {
      html += '<div style="margin-bottom:12px;font-size:13px;color:' + (b.modelVerified.ok ? 'var(--success)' : 'var(--error)') + '">模型验证: HTTP ' + b.modelVerified.status + (b.modelVerified.ok ? ' ✓' : ' ✗') + '</div>';
    }

    // Protocol badges
    var allProtoKeys = Object.keys(b.protocols);
    var supportedKeys = allProtoKeys.filter(function(k) { return b.protocols[k].supported; });
    html += '<div class="caption-uppercase" style="margin-bottom:12px">协议</div>' +
      '<div class="protocol-grid">';

    var protoLabels = { openai_chat: 'OpenAI Chat', openai_responses: 'OpenAI Responses', anthropic: 'Anthropic' };

    for (const [pk, info] of Object.entries(b.protocols)) {
      var label = protoLabels[pk] || pk;
      var supported = info.supported;
      var statusText = info.status ? 'HTTP ' + info.status : '';
      var timeText = info.responseTime ? info.responseTime + 'ms' : '';

      html += '<div class="proto-card ' + (supported ? 'ok' : 'no') + '">' +
        '<div class="proto-name">' + label +
          ' <span class="badge ' + (supported ? 'badge-green' : 'badge-red') + '">' + (supported ? '✓' : '✗') + '</span>' +
        '</div>' +
        '<div class="proto-status">' + statusText + (timeText ? ' · ' + timeText : '') + '</div>' +
        (info.url ? '<div class="proto-url">' + escapeHtml(info.url) + '</div>' : '') +
        '<button class="btn btn-small" style="margin-top:6px" onclick="quickTestProtocol(\\'' + escapeHtml(b.base) + '\\',\\'' + pk + '\\',\\'' + escapeHtml(apiKey) + '\\')">测试</button>' +
        '<button class="btn btn-small btn-primary" style="margin-top:6px;margin-left:4px" onclick="quickAddProtocolCard(\\'' + escapeHtml(b.base) + '\\',\\'' + pk + '\\',\\'' + escapeHtml(apiKey) + '\\')">+ 添加</button>' +
      '</div>';
    }
    html += '</div>';

    // Quick send row — always show all 3 protocol options
    html += '<div class="quick-test" style="margin-top:16px;padding-top:12px;border-top:1px solid var(--hairline)">' +
      '<div class="input-row" style="gap:6px">' +
        '<select class="text-input" style="max-width:160px" id="quickProto-' + bi + '">' +
          '<option value="openai_chat">OpenAI Chat</option>' +
          '<option value="anthropic">Anthropic</option>' +
          '<option value="openai_responses">OpenAI Responses</option>' +
        '</select>' +
        '<input type="text" class="text-input" placeholder="模型 ID" style="max-width:180px" id="quickModel-' + bi + '" />' +
        '<input type="text" class="text-input" placeholder="输入消息" id="quickMsg-' + bi + '" />' +
        '<button class="btn btn-primary btn-small" onclick="quickSend(\\'' + escapeHtml(b.base) + '\\',\\'' + escapeHtml(apiKey) + '\\',' + bi + ')">发送</button>' +
      '</div>' +
      '<div id="quickResult-' + bi + '" class="test-result"></div>' +
    '</div>';

    // Models
    html += '<div class="models-wrap" style="margin-top:16px;padding-top:12px;border-top:1px solid var(--hairline)" id="models-section-' + bi + '">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<span class="caption-uppercase">模型' + (b.models && b.models.models ? ' (' + b.models.models.length + ')' : '') + '</span>' +
        '<button class="btn btn-small" onclick="fetchModelsForBase(\\'' + escapeHtml(b.base) + '\\',\\'' + escapeHtml(apiKey) + '\\',\\'models-section-' + bi + '\\')">获取模型</button>' +
      '</div>';
    if (b.models && b.models.models && b.models.models.length > 0) {
      html += '<div class="models-grid">';
      for (const m of b.models.models) {
        const mid = typeof m === 'string' ? m : (m.id || '');
        html += '<div class="model-chip ' + (m.supported !== false ? 'available' : '') + '" onclick="fillQuickModel(\\'' + escapeHtml(mid) + '\\',' + bi + ')" style="cursor:pointer">' +
          escapeHtml(mid) +
          ' <button class="btn-small-ghost" onclick="event.stopPropagation();quickVerifyModel(\\'' + escapeHtml(b.base) + '\\',\\'' + escapeHtml(mid) + '\\',\\'' + escapeHtml(apiKey) + '\\')">验证</button>' +
        '</div>';
      }
      html += '</div>';
    } else {
      html += '<div style="color:var(--muted);font-size:13px">点击「获取模型」自动检测可用模型</div>';
    }
    html += '</div>';

    html += '</div>';
  }

  return html;
}

function renderSendResult(data, url, apiKey, path, model, message) {
  const baseUrl = url.replace(/\\/+$/, '');
  const fullUrl = path ? (baseUrl + (path.startsWith('/') ? path : '/' + path)) : (baseUrl + '/chat/completions');
  let html = '<div class="card">' +
    '<div class="caption-uppercase" style="margin-bottom:12px">发送结果</div>' +
    '<div class="result-item">' +
      '<div class="result-status ' + (data.ok ? 'ok' : 'err') + '">HTTP ' + (data.status || '-') + '</div>' +
      '<div class="result-time">' + (data.responseTime > 0 ? data.responseTime + 'ms' : '') + '</div>' +
    '</div>' +
    '<div style="font-size:12px;color:var(--muted);margin-bottom:12px">' + escapeHtml(fullUrl) + ' | 模型: ' + escapeHtml(model) + '</div>';

  if (data.reply) {
    html += '<div class="result-chat">' + escapeHtml(data.reply) + '</div>';
  }
  if (data.error) {
    html += '<div class="result-error">' + escapeHtml(data.error) + '</div>';
  }
  if (data.raw) {
    html += '<details style="margin-top:8px"><summary style="font-size:12px;color:var(--muted);cursor:pointer">原始响应</summary>' +
      '<pre class="result-body">' + escapeHtml(data.raw) + '</pre></details>';
  }
  html += '</div>';

  // Retry card
  html += '<div class="card">' +
    '<div class="input-row" style="gap:6px">' +
      '<input type="text" id="retryModel" class="text-input" placeholder="模型 ID" style="max-width:200px" value="' + escapeHtml(model) + '" />' +
      '<input type="text" id="retryMsg" class="text-input" placeholder="输入消息" value="' + escapeHtml(message) + '" />' +
      '<button class="btn btn-primary btn-small" onclick="retrySend(\\'' + escapeHtml(fullUrl) + '\\',\\'' + escapeHtml(apiKey) + '\\')">重发</button>' +
    '</div>' +
    '<div id="retryResult" class="test-result"></div>' +
  '</div>';

  return html;
}

async function saveEndpoint() {
  if (!isLoggedIn()) { showToast('请先登录后再保存', 'info'); doLogin(); return; }
  const url = document.getElementById('detectUrl').value.trim();
  if (!url) return showToast('缺少 URL', 'info');
  const name = document.getElementById('saveEpName')?.value.trim() || url;
  const saveUrl = detectedBaseUrl || url;
  const model = document.getElementById('detectModel')?.value.trim() || '';
  const pending = getPendingModels(url);

  // Collect from detection results
  var detProtos = {};
  var detModels = [];
  if (detectedData && detectedData.allBases) {
    for (const b of detectedData.allBases) {
      for (const [pk, info] of Object.entries(b.protocols || {})) {
        if (info.supported) detProtos[pk] = true;
      }
      if (b.models && b.models.models) {
        for (const m of b.models.models) {
          var mid = typeof m === 'string' ? m : (m.id || '');
          if (mid && !detModels.includes(mid)) detModels.push(mid);
        }
      }
    }
  }

  var allModels = model ? [model, ...detModels, ...pending] : [...detModels, ...pending];
  allModels = [...new Set(allModels)];

  await API.post('/api/endpoints', { url: saveUrl, name, protocols: detProtos, models: allModels });
  clearPendingModels(url);
  detectedData = null;
  showToast('保存成功！');
  navigate('/app');
}

/* Inline test helpers */
async function quickTestProtocol(baseUrl, protocol, apiKey) {
  const el = document.getElementById('quickResult');
  el.innerHTML = '<span class="spinner"></span> 测试中...';
  try {
    const data = await API.post('/api/test/endpoint', { url: baseUrl, protocol, apiKey });
    el.innerHTML = '<div class="test-result-item">' +
      '<div class="result-status ' + (data.ok ? 'ok' : 'err') + '">HTTP ' + data.status + '</div>' +
      '<div class="result-time">' + data.responseTime + 'ms</div>' +
      (data.error ? '<div class="result-error">' + escapeHtml(data.error) + '</div>' : '') +
      (data.body ? '<pre class="result-body">' + escapeHtml(data.body.substring(0, 300)) + '</pre>' : '') +
    '</div>';
  } catch (e) {
    el.innerHTML = '<div class="result-error">' + escapeHtml(e.message) + '</div>';
  }
}

function fillQuickModel(model, bi) {
  var el = document.getElementById('quickModel-' + bi);
  if (el) el.value = model;
}

async function quickSend(baseUrl, apiKey, bi) {
  bi = bi || 0;
  var model = document.getElementById('quickModel-' + bi)?.value.trim();
  var msg = document.getElementById('quickMsg-' + bi)?.value.trim();
  var protocol = document.getElementById('quickProto-' + bi)?.value || 'openai_chat';
  if (!model || !msg) return showToast('请输入模型 ID 和消息', 'info');
  var pathMap = { openai_chat: '/chat/completions', openai_responses: '/responses', anthropic: '/messages' };
  var fullUrl = baseUrl.replace(/\\/+$/, '') + (pathMap[protocol] || '/chat/completions');
  var el = document.getElementById('quickResult-' + bi);
  el.innerHTML = '<span class="spinner"></span> 发送中...';
  try {
    const data = await API.post('/api/test/send', { url: fullUrl, apiKey, model, message: msg });
    el.innerHTML = '<div class="test-result-item">' +
      '<div class="result-status ' + (data.ok ? 'ok' : 'err') + '">HTTP ' + (data.status || '-') + '</div>' +
      '<div class="result-time">' + (data.responseTime > 0 ? data.responseTime + 'ms' : '') + '</div>' +
      (data.reply ? '<div class="result-chat">' + escapeHtml(data.reply) + '</div>' : '') +
      (data.error ? '<div class="result-error">' + escapeHtml(data.error) + '</div>' : '') +
    '</div>';
  } catch (e) {
    el.innerHTML = '<div class="result-error">' + escapeHtml(e.message) + '</div>';
  }
}

async function fetchModelsForBase(baseUrl, apiKey, sectionId) {
  var section = document.getElementById(sectionId);
  if (!section) return;
  var btn = section.querySelector('.btn-small');
  if (btn) { btn.disabled = true; btn.textContent = '获取中...'; }

  try {
    var data = await API.get('/api/models?url=' + encodeURIComponent(baseUrl) + '&apiKey=' + encodeURIComponent(apiKey));
    var models = data.models || [];
    if (models.length === 0) {
      showToast('未获取到模型列表', 'info');
      if (btn) { btn.disabled = false; btn.textContent = '获取模型'; }
      return;
    }

    var grid = section.querySelector('.models-grid');
    if (!grid) {
      var existing = section.querySelector('[style*="color:var(--muted)"]');
      if (existing) existing.remove();
      grid = document.createElement('div');
      grid.className = 'models-grid';
      section.appendChild(grid);
    }

    var html = '';
    var bi = parseInt(sectionId.replace('models-section-', '')) || 0;
    for (var i = 0; i < models.length; i++) {
      html += '<div class="model-chip available" onclick="fillQuickModel(\\'' + escapeHtml(models[i]) + '\\',' + bi + ')" style="cursor:pointer">' +
        escapeHtml(models[i]) +
        ' <button class="btn-small-ghost" onclick="event.stopPropagation();quickVerifyModel(\\'' + escapeHtml(baseUrl) + '\\',\\'' + escapeHtml(models[i]) + '\\',\\'' + escapeHtml(apiKey) + '\\')">验证</button>' +
      '</div>';
    }
    grid.innerHTML = html;

    var title = section.querySelector('.caption-uppercase');
    if (title) title.textContent = '模型 (' + models.length + ')';

    showToast('获取到 ' + models.length + ' 个模型');
    if (btn) { btn.disabled = false; btn.textContent = '刷新模型'; }
  } catch (e) {
    showToast('获取失败: ' + e.message, 'error');
    if (btn) { btn.disabled = false; btn.textContent = '获取模型'; }
  }
}

async function quickVerifyModel(baseUrl, model, apiKey) {
  try {
    const data = await API.post('/api/test/model', { url: baseUrl, apiKey, model, protocol: 'openai_chat' });
    if (data.ok) {
      showToast('模型 ' + model + ': HTTP ' + data.status + ' ✓');
      var btn = event?.target;
      if (btn) showModelAddPrompt(baseUrl, model, btn);
    } else {
      showToast('模型 ' + model + ': HTTP ' + data.status + ' ✗', 'error');
    }
  } catch (e) {
    showToast('验证失败: ' + e.message, 'error');
  }
}

async function retrySend(url, apiKey) {
  const model = document.getElementById('retryModel').value.trim();
  const msg = document.getElementById('retryMsg').value.trim();
  if (!model || !msg) return showToast('请输入模型 ID 和消息', 'info');
  const el = document.getElementById('retryResult');
  el.innerHTML = '<span class="spinner"></span> 发送中...';
  try {
    const data = await API.post('/api/test/send', { url, apiKey, model, message: msg });
    el.innerHTML = '<div class="test-result-item">' +
      '<div class="result-status ' + (data.ok ? 'ok' : 'err') + '">HTTP ' + (data.status || '-') + '</div>' +
      '<div class="result-time">' + (data.responseTime > 0 ? data.responseTime + 'ms' : '') + '</div>' +
      (data.reply ? '<div class="result-chat">' + escapeHtml(data.reply) + '</div>' : '') +
      (data.error ? '<div class="result-error">' + escapeHtml(data.error) + '</div>' : '') +
    '</div>';
  } catch (e) {
    el.innerHTML = '<div class="result-error">' + escapeHtml(e.message) + '</div>';
  }
}

function renderDashboard() {
  return '<div class="container">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">' +
      '<h2 class="display-sm">我的接口</h2>' +
      '<div style="display:flex;gap:8px">' +
        '<button class="btn btn-secondary" onclick="showImportDialog()">导入</button>' +
        '<a href="/" onclick="return navigate(\\'/\\')" class="btn btn-primary">+ 新增检测</a>' +
      '</div>' +
    '</div>' +
    '<div id="importArea" style="display:none;margin-bottom:16px"></div>' +
    '<div class="search-bar">' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
        '<div style="position:relative;flex:1;min-width:200px">' +
          '<input type="text" id="searchInput" class="text-input" placeholder="搜索接口名称或 URL..." style="padding-right:32px" oninput="toggleSearchClear()" onkeydown="if(event.key===\\'Enter\\'){dashPage=1;loadDashboard()}" />' +
          '<span id="searchClear" style="display:none;position:absolute;right:10px;top:50%;transform:translateY(-50%);cursor:pointer;color:var(--muted);font-size:16px;line-height:1" onclick="clearDashSearch()">×</span>' +
        '</div>' +
        '<select id="filterProtocol" class="text-input" style="max-width:160px" onchange="dashPage=1;loadDashboard()">' +
          '<option value="">全部协议</option>' +
          '<option value="openai_chat">OpenAI Chat</option>' +
          '<option value="openai_responses">OpenAI Responses</option>' +
          '<option value="anthropic">Anthropic</option>' +
        '</select>' +
        '<div style="position:relative;max-width:180px;flex:1">' +
          '<input type="text" id="filterModel" class="text-input" placeholder="模型 ID 筛选" style="width:100%" onfocus="showModelDropdown()" oninput="filterModelDropdown()" onkeydown="if(event.key===\\'Enter\\'){dashPage=1;loadDashboard()}" />' +
          '<div id="modelDropdown" style="display:none;position:absolute;left:0;right:0;top:100%;margin-top:4px;max-height:240px;overflow-y:auto;background:var(--surface-card);border:1px solid var(--hairline-strong);border-radius:var(--radius-md);box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:200"></div>' +
        '</div>' +
        '<button class="btn btn-primary" onclick="dashPage=1;loadDashboard()">搜索</button>' +
        '<button class="btn btn-secondary" onclick="resetDashFilters()">重置</button>' +
        '<span style="flex:1"></span>' +
        '<button class="btn btn-small-ghost" style="color:var(--error)" onclick="batchDeleteEndpoints()">删除选中</button>' +
      '</div>' +
    '</div>' +
    '<div id="endpointTable"></div>' +
    '<div id="endpointPagination"></div>' +
  '</div>';
}

var dashPage = 1;
var dashLimit = 20;
var dashSort = 'created_at';
var dashOrder = 'desc';

function toggleSearchClear() {
  var el = document.getElementById('searchClear');
  var inp = document.getElementById('searchInput');
  if (el && inp) el.style.display = inp.value ? '' : 'none';
}

function clearDashSearch() {
  var inp = document.getElementById('searchInput');
  if (inp) inp.value = '';
  toggleSearchClear();
  dashPage = 1;
  loadDashboard();
}

function resetDashFilters() {
  var s = document.getElementById('searchInput');
  var p = document.getElementById('filterProtocol');
  var m = document.getElementById('filterModel');
  if (s) s.value = '';
  if (p) p.value = '';
  if (m) m.value = '';
  toggleSearchClear();
  dashPage = 1;
  loadDashboard();
}

var allDashModels = [];

function showModelDropdown() {
  var dd = document.getElementById('modelDropdown');
  if (!dd) return;
  renderModelDropdownItems(allDashModels);
  dd.style.display = 'block';
  setTimeout(function() {
    document.addEventListener('click', function _close(e) {
      if (!dd.contains(e.target) && e.target.id !== 'filterModel') {
        dd.style.display = 'none';
        document.removeEventListener('click', _close);
      }
    });
  }, 10);
}

function filterModelDropdown() {
  var inp = document.getElementById('filterModel');
  var dd = document.getElementById('modelDropdown');
  if (!inp || !dd) return;
  var q = inp.value.trim().toLowerCase();
  var filtered = q ? allDashModels.filter(function(m) { return m.toLowerCase().includes(q); }) : allDashModels;
  renderModelDropdownItems(filtered);
  dd.style.display = 'block';
}

function renderModelDropdownItems(models) {
  var dd = document.getElementById('modelDropdown');
  if (!dd) return;
  if (models.length === 0) {
    dd.innerHTML = '<div style="padding:8px 12px;font-size:13px;color:var(--muted)">无匹配模型</div>';
    return;
  }
  var html = '';
  for (var i = 0; i < models.length; i++) {
    (function(m) {
      html += '<div class="key-dropdown-item" style="cursor:pointer;font-family:var(--font-mono);font-size:12px" onclick="selectDashModel(\\'' + escapeHtml(m) + '\\')">' + escapeHtml(m) + '</div>';
    })(models[i]);
  }
  dd.innerHTML = html;
}

function selectDashModel(model) {
  var inp = document.getElementById('filterModel');
  var dd = document.getElementById('modelDropdown');
  if (inp) inp.value = model;
  if (dd) dd.style.display = 'none';
  dashPage = 1;
  loadDashboard();
}

function saveDashState() {
  try {
    sessionStorage.setItem('tokenhub_dash', JSON.stringify({
      search: document.getElementById('searchInput')?.value || '',
      protocol: document.getElementById('filterProtocol')?.value || '',
      model: document.getElementById('filterModel')?.value || '',
      page: dashPage,
      sort: dashSort,
      order: dashOrder,
    }));
  } catch (e) {}
}

function restoreDashState() {
  try {
    var raw = sessionStorage.getItem('tokenhub_dash');
    if (!raw) return false;
    var s = JSON.parse(raw);
    var si = document.getElementById('searchInput');
    var pi = document.getElementById('filterProtocol');
    var mi = document.getElementById('filterModel');
    if (si) si.value = s.search || '';
    if (pi) pi.value = s.protocol || '';
    if (mi) mi.value = s.model || '';
    dashPage = s.page || 1;
    dashSort = s.sort || 'created_at';
    dashOrder = s.order || 'desc';
    toggleSearchClear();
    return !!(s.search || s.protocol || s.model || s.page > 1);
  } catch (e) { return false; }
}

async function loadDashboard() {
  var search = document.getElementById('searchInput')?.value || '';
  var filterProto = document.getElementById('filterProtocol')?.value || '';
  var filterModel = document.getElementById('filterModel')?.value.trim() || '';
  var el = document.getElementById('endpointTable');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)">加载中...</div>';

  try {
    var data = await API.get('/api/endpoints?search=' + encodeURIComponent(search) + '&page=' + dashPage + '&limit=' + dashLimit + '&sort=' + dashSort + '&order=' + dashOrder);
    var endpoints = data.endpoints || [];
    var total = data.total || 0;

    var modelSet = {};
    for (var ei = 0; ei < endpoints.length; ei++) {
      try {
        var ms = JSON.parse(endpoints[ei].models || '[]');
        for (var mi = 0; mi < ms.length; mi++) {
          var mid = typeof ms[mi] === 'string' ? ms[mi] : (ms[mi].id || '');
          if (mid) modelSet[mid] = true;
        }
      } catch {}
    }
    allDashModels = Object.keys(modelSet).sort();
    saveDashState();

    if (filterProto) {
      endpoints = endpoints.filter(function(ep) {
        try { var p = JSON.parse(ep.protocols); return p && p[filterProto]; } catch { return false; }
      });
    }
    if (filterModel) {
      var fm = filterModel.toLowerCase();
      endpoints = endpoints.filter(function(ep) {
        try {
          var models = JSON.parse(ep.models || '[]');
          return models.some(function(m) { return (typeof m === 'string' ? m : m.id || '').toLowerCase().includes(fm); });
        } catch { return false; }
      });
    }

    var totalPages = Math.ceil(total / dashLimit);

    if (endpoints.length === 0) {
      el.innerHTML = '<div class="empty-state">没有匹配的接口</div>';
      document.getElementById('endpointPagination').innerHTML = '';
      return;
    }

    var sortIcon = function(col) {
      if (dashSort !== col) return '';
      return dashOrder === 'asc' ? ' ↑' : ' ↓';
    };

    var html = '<table class="health-table">' +
      '<tr>' +
        '<th style="width:30px"><input type="checkbox" id="selectAllCb" onchange="toggleSelectAll()" /></th>' +
        '<th style="cursor:pointer" onclick="dashSortBy(\\'name\\')">名称' + sortIcon('name') + '</th>' +
        '<th style="cursor:pointer" onclick="dashSortBy(\\'url\\')">URL' + sortIcon('url') + '</th>' +
        '<th>协议</th>' +
        '<th>模型</th>' +
        '<th style="cursor:pointer;white-space:nowrap" onclick="dashSortBy(\\'created_at\\')">创建时间' + sortIcon('created_at') + '</th>' +
        '<th style="width:60px">Key</th>' +
        '<th style="width:60px">操作</th>' +
      '</tr>';

    for (var i = 0; i < endpoints.length; i++) {
      var ep = endpoints[i];
      var protos = (function() { try { var p = JSON.parse(ep.protocols); return p && typeof p === 'object' && !Array.isArray(p) ? p : {}; } catch { return {}; } })();
      var protoKeys = Object.keys(protos).filter(function(k) { return protos[k]; });
      var protoHtml = protoKeys.map(function(k) {
        var labels = { openai_chat: 'Chat', openai_responses: 'Resp', anthropic: 'Anth' };
        var colors = { openai_chat: 'badge-green', openai_responses: 'badge-blue', anthropic: 'badge-purple' };
        return '<span class="badge ' + (colors[k] || 'badge-green') + '">' + (labels[k] || k) + '</span>';
      }).join(' ');

      var models = (function() { try { var m = JSON.parse(ep.models || '[]'); return Array.isArray(m) ? m : []; } catch { return []; } })();
      var modelHtml = models.length > 0
        ? '<span style="font-size:12px;color:var(--muted)" title="' + escapeHtml(models.join(', ')) + '">' + models.length + ' 个</span>'
        : '<span style="color:var(--muted)">-</span>';

      var link = '/app/endpoint/' + ep.id;
      var linkOnclick = 'event.preventDefault();navigate(\\'/app/endpoint/' + ep.id + '\\')';

      html += '<tr id="ep-row-' + ep.id + '">' +
        '<td><input type="checkbox" class="ep-cb" data-id="' + ep.id + '" /></td>' +
        '<td><a href="' + link + '" onclick="' + linkOnclick + '" style="font-weight:500">' + escapeHtml(ep.name || ep.url) + '</a></td>' +
        '<td class="cell-url" style="max-width:300px"><a href="' + link + '" onclick="' + linkOnclick + '" style="color:var(--text-link)">' + escapeHtml(ep.url) + '</a></td>' +
        '<td>' + (protoHtml || '<span style="color:var(--muted)">-</span>') + '</td>' +
        '<td>' + modelHtml + '</td>' +
        '<td class="cell-time">' + formatTime(ep.created_at) + '</td>' +
        '<td style="text-align:center">' + (ep.key_count || 0) + '</td>' +
        '<td><button class="btn-small-ghost" style="color:var(--error)" onclick="deleteEndpointRow(\\'' + ep.id + '\\')">删除</button></td>' +
      '</tr>';
    }
    html += '</table>';
    el.innerHTML = html;

    var pagEl = document.getElementById('endpointPagination');
    if (totalPages <= 1) {
      pagEl.innerHTML = '<div style="text-align:center;padding:12px;font-size:13px;color:var(--muted)">共 ' + total + ' 个接口</div>';
    } else {
      var pagHtml = '<div style="display:flex;justify-content:center;align-items:center;gap:8px;padding:16px">' +
        '<button class="btn btn-small" onclick="dashGoPage(1)"' + (dashPage <= 1 ? ' disabled' : '') + '>首页</button>' +
        '<button class="btn btn-small" onclick="dashGoPage(' + (dashPage - 1) + ')"' + (dashPage <= 1 ? ' disabled' : '') + '>上一页</button>';
      var startPage = Math.max(1, dashPage - 2);
      var endPage = Math.min(totalPages, dashPage + 2);
      for (var p = startPage; p <= endPage; p++) {
        pagHtml += '<button class="btn btn-small' + (p === dashPage ? ' btn-primary' : '') + '" onclick="dashGoPage(' + p + ')">' + p + '</button>';
      }
      pagHtml += '<button class="btn btn-small" onclick="dashGoPage(' + (dashPage + 1) + ')"' + (dashPage >= totalPages ? ' disabled' : '') + '>下一页</button>' +
        '<button class="btn btn-small" onclick="dashGoPage(' + totalPages + ')"' + (dashPage >= totalPages ? ' disabled' : '') + '>末页</button>' +
        '<span style="font-size:13px;color:var(--muted)">共 ' + total + ' 个接口</span>' +
      '</div>';
      pagEl.innerHTML = pagHtml;
    }
  } catch (e) {
    el.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  }
}

function dashGoPage(page) {
  dashPage = page;
  loadDashboard();
}

function dashSortBy(col) {
  if (dashSort === col) {
    dashOrder = dashOrder === 'asc' ? 'desc' : 'asc';
  } else {
    dashSort = col;
    dashOrder = 'asc';
  }
  dashPage = 1;
  loadDashboard();
}

function toggleSelectAll() {
  var checked = document.getElementById('selectAllCb')?.checked;
  document.querySelectorAll('.ep-cb').forEach(function(el) { el.checked = checked; });
}

async function deleteEndpointRow(id) {
  if (!confirm('确定删除此接口及所有 Key？')) return;
  await API.del('/api/endpoints/' + id);
  var row = document.getElementById('ep-row-' + id);
  if (row) row.remove();
  showToast('已删除');
}

async function batchDeleteEndpoints() {
  var cbs = document.querySelectorAll('.ep-cb:checked');
  if (cbs.length === 0) return showToast('请先选择接口', 'info');
  if (!confirm('确定删除选中的 ' + cbs.length + ' 个接口？')) return;
  var btn = document.querySelector('button[onclick="batchDeleteEndpoints()"]');
  if (btn) { btn.disabled = true; btn.textContent = '删除中 (' + cbs.length + ')...'; }
  var ids = Array.from(cbs).map(function(cb) { return cb.dataset.id; });
  try {
    await API.post('/api/endpoints/batch-delete', { ids: ids });
    showToast('已删除 ' + ids.length + ' 个接口', 'success');
    if (btn) { btn.disabled = false; btn.textContent = '删除选中'; }
    await loadDashboard();
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = '删除选中'; }
    showToast('删除失败: ' + e.message, 'error');
  }
}

var importParsedItems = [];

function buildImportDialog() {
  var area = document.getElementById('importArea');
  if (!area) return;
  area.style.display = '';
  window._importSource = window._importSource || '';
  area.innerHTML = '<div class="card">' +
    '<div class="caption-uppercase" style="margin-bottom:12px">导入接口</div>' +
    '<div style="display:flex;gap:8px;margin-bottom:12px">' +
      '<button class="btn btn-small ' + (window._importSource !== 'cc' ? 'btn-primary' : '') + '" onclick="switchImportSource()">9router JSON</button>' +
      '<button class="btn btn-small ' + (window._importSource === 'cc' ? 'btn-primary' : '') + '" onclick="switchImportSource(true)">CC-Switch 数据库</button>' +
    '</div>' +
    '<div id="importSourceDesc" style="font-size:13px;color:var(--muted);margin-bottom:12px"></div>' +
    '<div class="input-row">' +
      '<input type="file" id="importFile" accept="' + (window._importSource === 'cc' ? '.db' : '.json') + '" onchange="handleImportFileFinal(this)" style="font-size:13px" />' +
    '</div>' +
    '<div id="importPreview"></div>' +
  '</div>';
  updateImportSourceDesc();
}

function showImportDialog() {
  var area = document.getElementById('importArea');
  if (!area) return;
  if (area.style.display === 'none') {
    buildImportDialog();
  } else {
    area.style.display = 'none';
  }
}

function switchImportSource(isCc) {
  window._importSource = isCc ? 'cc' : '';
  buildImportDialog();
}

function updateImportSourceDesc() {
  var desc = document.getElementById('importSourceDesc');
  if (!desc) return;
  if (window._importSource === 'cc') {
    desc.textContent = '解析 CC-Switch SQLite 数据库中的 provider（支持 codex/claude/openclaw），自动提取接口、Key 和模型。';
  } else {
    desc.textContent = '上传 9router 备份 JSON 文件，自动解析 providerConnections 中的接口和 Key。';
  }
}

function handleImportFileFinal(input) {
  var file = input.files[0];
  if (!file) return;
  if (window._importSource === 'cc') {
    handleCCSwitchFile(file);
  } else {
    handleImportFileJSON(file);
  }
}

function handleImportFileJSON(file) {
  var reader = new FileReader();
  reader.onload = async function(e) {
    try {
      var json = JSON.parse(e.target.result);
      var connections = json.providerConnections || [];
      var modelAliases = json.modelAliases || {};
      if (connections.length === 0) {
        showToast('未找到 providerConnections 数据', 'error');
        return;
      }
      var data = await API.post('/api/import/parse', { connections: connections, modelAliases: modelAliases });
      importParsedItems = data.items || [];
      renderImportPreview(importParsedItems);
    } catch (err) {
      showToast('解析失败: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

var SQL_CDNS = [
  'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js',
  'https://unpkg.com/sql.js@1.10.3/dist/sql-wasm.js',
];

function loadSqlJs() {
  return new Promise(function(resolve, reject) {
    if (window.SQL) return resolve(window.SQL);
    var idx = -1;
    function tryNext() {
      idx++;
      if (idx >= SQL_CDNS.length) { reject(new Error('所有 CDN 均失败')); return; }
      var script = document.createElement('script');
      script.src = SQL_CDNS[idx];
      script.onload = function() {
        initSqlJs({
          locateFile: function(file) {
            var base = SQL_CDNS[idx].substring(0, SQL_CDNS[idx].lastIndexOf('/'));
            return base + '/' + file;
          }
        }).then(function(SQL) { resolve(SQL); }).catch(tryNext);
      };
      script.onerror = tryNext;
      document.head.appendChild(script);
    }
    tryNext();
  });
}

function parseCCSwitchToml(configText) {
  var result = { baseUrl: '', wireApi: '', model: '' };
  if (!configText) return result;
  var m;
  m = configText.match(/base_url\s*=\s*"([^"]+)"/);
  if (m) result.baseUrl = m[1];
  m = configText.match(/wire_api\s*=\s*"([^"]+)"/);
  if (m) result.wireApi = m[1];
  m = configText.match(/^model\s*=\s*"([^"]+)"\s*$/m);
  if (m) result.model = m[1];
  return result;
}

function parseCCSwitchData(db) {
  var items = [];
  var stmt = db.prepare("SELECT p.id, p.app_type, p.name, p.settings_config, p.website_url, ep.url AS endpoint_url FROM providers p LEFT JOIN provider_endpoints ep ON ep.provider_id = p.id AND ep.app_type = p.app_type ORDER BY p.app_type, p.name");

  while (stmt.step()) {
    var row = stmt.getAsObject();
    var name = row.name || '';
    var appType = row.app_type || '';
    if (appType === 'gemini') continue;
    if (name.toLowerCase().indexOf('official') !== -1) continue;

    var sc;
    try { sc = JSON.parse(row.settings_config || '{}'); } catch(e) { sc = {}; }

    var url = row.endpoint_url || '';
    var keyValue = '';
    var protocol = '';
    var toml = {};
    var models = [];

    if (appType === 'codex') {
      toml = parseCCSwitchToml(sc.config || '');
      if (!url) url = toml.baseUrl;
      if (sc.auth && sc.auth.OPENAI_API_KEY) keyValue = sc.auth.OPENAI_API_KEY;
      protocol = toml.wireApi === 'responses' ? 'openai_responses' : 'openai_chat';
      if (toml.model) models.push(toml.model);
    } else if (appType === 'claude') {
      var env = sc.env || {};
      if (!url) url = env.ANTHROPIC_BASE_URL || '';
      keyValue = env.ANTHROPIC_AUTH_TOKEN || '';
      protocol = 'anthropic';
      ['ANTHROPIC_MODEL','ANTHROPIC_DEFAULT_HAIKU_MODEL','ANTHROPIC_DEFAULT_SONNET_MODEL','ANTHROPIC_DEFAULT_OPUS_MODEL','ANTHROPIC_REASONING_MODEL'].forEach(function(k) {
        if (env[k] && models.indexOf(env[k]) === -1) models.push(env[k]);
      });
    } else if (appType === 'openclaw') {
      url = sc.baseUrl || url;
      keyValue = sc.apiKey || '';
      var apiType = sc.api || 'openai-completions';
      if (apiType.indexOf('anthropic') !== -1) {
        protocol = 'anthropic';
      } else if (apiType.indexOf('gemini') !== -1) {
        protocol = 'openai_chat';
      } else {
        protocol = 'openai_chat';
      }
      if (sc.models && Array.isArray(sc.models)) {
        models = sc.models.map(function(m) { return m.id || m; }).filter(Boolean);
      }
    }

    if (!url || !keyValue) continue;
    if (!protocol) protocol = 'openai_chat';
    models = models.filter(function(m) { return m && m !== 'undefined'; });
    var uniqueModels = [];
    models.forEach(function(m) { if (uniqueModels.indexOf(m) === -1) uniqueModels.push(m); });

    items.push({
      name: name,
      url: url.replace(/[/]+$/, ''),
      protocol: protocol,
      keyValue: keyValue,
      defaultModel: uniqueModels.length > 0 ? uniqueModels[0] : '',
      models: uniqueModels,
    });
  }
  stmt.free();
  return items;
}

async function handleCCSwitchFile(file) {
  try {
    var SQL = await loadSqlJs();
    var buffer = await file.arrayBuffer();
    var db = new SQL.Database(new Uint8Array(buffer));

    var tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='providers'");
    if (!tables || tables.length === 0 || tables[0].values.length === 0) {
      db.close();
      showToast('不是有效的 CC-Switch 数据库文件', 'error');
      return;
    }

    var items = parseCCSwitchData(db);
    db.close();

    if (items.length === 0) {
      showToast('未找到可导入的接口数据', 'error');
      return;
    }

    importParsedItems = items;
    renderImportPreview(items);
  } catch (err) {
    showToast('解析 CC-Switch 数据库失败: ' + err.message, 'error');
  }
}

function renderImportPreview(items) {
  var el = document.getElementById('importPreview');
  if (!el) return;
  if (items.length === 0) {
    el.innerHTML = '<div style="color:var(--muted);font-size:13px;margin-top:12px">没有可导入的接口</div>';
    return;
  }
  var protoLabels = { openai_chat: 'Chat', openai_responses: 'Responses', anthropic: 'Anthropic' };
  var html = '<div style="margin-top:12px">' +
    '<div id="importProgress" style="display:none;margin-bottom:12px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:13px;color:var(--muted)">' +
        '<span id="importProgressText">导入中...</span>' +
        '<span id="importProgressCount">0/0</span>' +
      '</div>' +
      '<div style="background:var(--hairline);border-radius:4px;height:6px;overflow:hidden">' +
        '<div id="importProgressBar" style="height:100%;background:var(--primary);border-radius:4px;width:0%;transition:width 0.2s"></div>' +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
      '<label class="toggle"><input type="checkbox" id="importSelectAll" onchange="toggleImportSelectAll()" checked /> <span>全选 (' + items.length + ')</span></label>' +
      '<button class="btn btn-primary btn-small" onclick="executeImport()">导入选中</button>' +
    '</div>' +
    '<div style="max-height:400px;overflow-y:auto">' +
    '<table class="health-table"><tr><th style="width:30px">选</th><th>名称</th><th>URL</th><th>协议</th><th>Key</th><th>模型</th><th>状态</th></tr>';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var modelCount = (it.models && it.models.length > 0) ? it.models.length : (it.defaultModel ? 1 : 0);
    html += '<tr>' +
      '<td><input type="checkbox" class="import-cb" data-index="' + i + '" checked /></td>' +
      '<td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(it.name) + '</td>' +
      '<td class="cell-url" style="max-width:250px">' + escapeHtml(it.url) + '</td>' +
      '<td><span class="badge badge-green">' + (protoLabels[it.protocol] || it.protocol) + '</span></td>' +
      '<td style="font-family:var(--font-mono);font-size:12px">' + escapeHtml(it.keyValue.substring(0, 8)) + '...</td>' +
      '<td>' + modelCount + '</td>' +
      '<td><span class="dot ' + (it.testStatus === 'active' ? 'dot-green' : 'dot-gray') + '"></span></td>' +
    '</tr>';
  }
  html += '</table></div></div>';
  el.innerHTML = html;
}

function toggleImportSelectAll() {
  var checked = document.getElementById('importSelectAll')?.checked;
  document.querySelectorAll('.import-cb').forEach(function(cb) { cb.checked = checked; });
}

async function executeImport() {
  var cbs = document.querySelectorAll('.import-cb:checked');
  if (cbs.length === 0) return showToast('请先选择要导入的接口', 'info');
  var items = [];
  cbs.forEach(function(cb) {
    var idx = parseInt(cb.dataset.index);
    if (importParsedItems[idx]) items.push(importParsedItems[idx]);
  });

  var total = items.length;
  var imported = 0;
  var skipped = 0;

  var btn = document.querySelector('#importPreview .btn-primary');
  var progressArea = document.getElementById('importProgress');
  var progressText = document.getElementById('importProgressText');
  var progressCount = document.getElementById('importProgressCount');
  var progressBar = document.getElementById('importProgressBar');

  if (btn) { btn.disabled = true; btn.textContent = '导入中...'; }
  if (progressArea) progressArea.style.display = '';

  if (progressText) progressText.textContent = '正在批量导入 ' + total + ' 条数据...';
  if (progressCount) progressCount.textContent = '~/' + total;
  if (progressBar) { progressBar.style.width = '60%'; progressBar.style.animation = 'pulse 1s infinite'; }

  try {
    var result = await API.post('/api/import', { items: items });
    imported = result.imported || 0;
    skipped = result.skipped || 0;
  } catch (e) {
    skipped = items.length;
  }

  if (progressBar) { progressBar.style.width = '100%'; progressBar.style.animation = ''; }
  if (progressText) progressText.textContent = '导入完成';
  if (progressCount) progressCount.textContent = imported + '/' + total;

  // Save file to R2 if storage enabled
  try {
    await saveImportFile(items, imported);
  } catch (e) {
    showToast('导入文件保存到云存储失败: ' + e.message, 'error');
  }

  showToast('导入完成: ' + imported + ' 个接口' + (skipped > 0 ? '，跳过 ' + skipped : ''));
  importParsedItems = [];
  var area = document.getElementById('importArea');
  if (area) area.style.display = 'none';
  await loadDashboard();
}

async function saveImportFile(items, importedRows) {
  var fileInput = document.getElementById('importFile');
  var file = fileInput?.files?.[0];
  if (!file) return;
  var fd = new FormData();
  fd.append('file', file);
  fd.append('imported_rows', String(importedRows));
  fd.append('file_type', window._importSource === 'cc' ? 'ccswitch' : '9router');
  await API.upload('/api/import/save-file', fd);
}

async function deleteEndpointCard(id) {
  if (!confirm('确定删除此接口及所有 Key？')) return;
  await API.del('/api/endpoints/' + id);
  var card = document.getElementById('ep-card-' + id);
  if (card) card.remove();
  showToast('已删除');
}

function toggleCardCollapse(bodyId, arrowId) {
  var body = document.getElementById(bodyId);
  var arrow = document.getElementById(arrowId);
  if (!body) return;
  var collapsed = body.style.display === 'none';
  body.style.display = collapsed ? '' : 'none';
  if (arrow) arrow.style.transform = collapsed ? 'rotate(180deg)' : '';
}

function toggleAddForm(formId) {
  var form = document.getElementById(formId);
  if (!form) return;
  form.style.display = form.style.display === 'none' ? '' : 'none';
  if (form.style.display !== 'none') {
    var inp = form.querySelector('input[type="text"], input[type="password"]');
    if (inp) inp.focus();
  }
}

function renderEndpointDetail(id) {
  return '<div class="container">' +
    '<a href="/app" onclick="return navigate(\\'/app\\')" class="back-link">← 返回列表</a>' +
    '<div id="endpointDetail"></div>' +
  '</div>';
}

async function loadEndpointDetail(id) {
  const el = document.getElementById('endpointDetail');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)">加载中...</div>';

  try {
    const data = await API.get('/api/endpoints/' + id);
    const ep = data.endpoint;
    const keys = data.keys || [];
    const protos = (function() { try { var p = JSON.parse(ep.protocols || '{}'); return p && typeof p === 'object' && !Array.isArray(p) ? p : {}; } catch { return {}; } })();
    const models = (function() { try { var m = JSON.parse(ep.models || '[]'); return Array.isArray(m) ? m : []; } catch { return []; } })();

    const protoKeys = Object.keys(protos).filter(function(k) { return protos[k]; });
    const protoLabels = { openai_chat: 'OpenAI Chat', openai_responses: 'OpenAI Responses', anthropic: 'Anthropic' };
    const protoBadges = protoKeys.map(function(k) { return '<span class="badge badge-green">' + (protoLabels[k] || k) + '</span>'; }).join(' ') || '<span style="color:var(--muted)">无</span>';

    let html = '<div class="card" id="epSettingsCard">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="toggleCardCollapse(\\'epSettingsBody\\',\\'epSettingsArrow\\')">' +
        '<div style="display:flex;gap:8px;align-items:center;flex:1;min-width:0">' +
          '<span style="font-size:14px;font-weight:600;color:var(--ink)">' + escapeHtml(ep.name || ep.url) + '</span>' +
          '<span style="font-size:12px;color:var(--muted);font-family:var(--font-mono)">' + escapeHtml(ep.url) + '</span>' +
          protoBadges +
          '<span class="badge badge-muted">' + keys.length + ' Key</span>' +
        '</div>' +
        '<span id="epSettingsArrow" style="font-size:12px;color:var(--muted);transition:transform 0.2s">▼</span>' +
      '</div>' +
      '<div id="epSettingsBody" style="display:none;margin-top:16px;padding-top:16px;border-top:1px solid var(--hairline)">' +
        '<div class="card-section">' +
          '<label class="label">名称</label>' +
          '<input type="text" id="epName" class="text-input" value="' + escapeHtml(ep.name) + '" />' +
        '</div>' +
        '<div class="card-section">' +
          '<label class="label">URL</label>' +
          '<div class="code-block">' + escapeHtml(ep.url) + '</div>' +
        '</div>' +
        '<div class="card-section">' +
          '<label class="label">备注</label>' +
          '<textarea id="epNotes" class="text-input" rows="2">' + escapeHtml(ep.notes || '') + '</textarea>' +
        '</div>' +
        '<div class="card-section">' +
          '<label class="label">自动检测</label>' +
          '<label class="toggle">' +
            '<input type="checkbox" id="epAutoHealth" ' + (ep.auto_health ? 'checked' : '') + ' />' +
            '<span>每 ' + (ep.health_interval || 30) + ' 分钟自动检测</span>' +
          '</label>' +
        '</div>' +
        '<div style="display:flex;gap:8px;margin-top:12px">' +
          '<button class="btn btn-primary" onclick="updateEndpoint(\\'' + ep.id + '\\')">保存</button>' +
          '<button class="btn btn-secondary" onclick="redetectEndpoint(\\'' + ep.id + '\\')">重新检测</button>' +
          '<button class="btn btn-secondary" style="color:var(--error);border-color:var(--error)" onclick="deleteEndpoint(\\'' + ep.id + '\\')">删除</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    var modelChips = models.map(function(m) {
      var mid = typeof m === 'string' ? m : (m.id || '');
      return '<span class="model-chip available">' + escapeHtml(mid) + ' <span style="cursor:pointer;color:var(--error);margin-left:2px" onclick="removeModelFromEndpoint(\\'' + ep.id + '\\',\\'' + escapeHtml(mid) + '\\')">&times;</span></span>';
    }).join('');
    html += '<div class="card">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<span class="caption-uppercase">模型 (' + models.length + ')</span>' +
        '<div style="display:flex;gap:8px;align-items:center">' +
          '<button class="btn btn-small" onclick="fetchModelsForEndpoint(\\'' + ep.id + '\\',\\'' + escapeHtml(ep.url) + '\\')">自动获取</button>' +
          '<span style="cursor:pointer;font-size:18px;color:var(--muted);line-height:1" onclick="toggleAddForm(\\'addModelForm\\')" title="手动添加模型">+</span>' +
        '</div>' +
      '</div>' +
      '<div id="epModelsGrid">' + (models.length > 0 ? '<div class="models-grid">' + modelChips + '</div>' : '<div style="color:var(--muted);font-size:13px">暂无模型</div>') + '</div>' +
      '<div id="addModelForm" style="display:none;margin-top:10px">' +
        '<div class="input-row">' +
          '<input type="text" id="newModelInput" class="text-input" placeholder="模型 ID" style="max-width:300px" />' +
          '<button class="btn btn-small" onclick="addModelToEndpoint(\\'' + ep.id + '\\')">添加</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    html += '<div class="card"><div class="card-header">' +
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<span class="caption-uppercase">API Keys (' + keys.length + ')</span>' +
        '<span style="cursor:pointer;font-size:18px;color:var(--muted);line-height:1" onclick="toggleAddForm(\\'addKeyForm\\')" title="添加 Key">+</span>' +
      '</div></div>' +
      '<div class="key-list">';
    for (const k of keys) {
      html += '<div class="key-row" id="key-row-' + k.id + '">' +
        '<div class="key-info">' +
          '<span class="key-alias">' + escapeHtml(k.alias || '未命名') + '</span>' +
          '<span class="key-masked" style="font-family:var(--font-mono);color:var(--muted);font-size:13px">' + escapeHtml(k.key_masked) + '</span>' +
          '<button class="btn-small-ghost" style="font-size:11px" onclick="copyKeyValue(\\'' + k.id + '\\')" title="复制完整 Key">复制</button>' +
          '<span class="key-status dot ' + (k.last_status ? 'dot-green' : 'dot-gray') + '" id="key-status-' + k.id + '"></span>' +
          '<span style="font-size:12px;color:var(--muted)" id="key-time-' + k.id + '">' + (k.last_checked_at ? formatTime(k.last_checked_at) : '未检测') + '</span>' +
        '</div>' +
        '<div class="key-actions">' +
          '<button class="btn btn-small" id="key-check-btn-' + k.id + '" onclick="checkKey(\\'' + k.id + '\\')">检测</button>' +
          '<button class="btn btn-small" onclick="deleteKeyRow(\\'' + k.id + '\\')">删除</button>' +
        '</div>' +
      '</div>';
    }
    html += '</div>' +
      '<div id="addKeyForm" class="add-key-form" style="display:none">' +
        '<input type="password" id="newKeyValue" class="text-input" placeholder="新的 API Key" />' +
        '<input type="text" id="newKeyAlias" class="text-input" placeholder="别名（可选）" style="width:150px" />' +
        '<button class="btn btn-primary" onclick="addKey(\\'' + ep.id + '\\')">添加</button>' +
      '</div>' +
    '</div>';

    const defaultProto = protoKeys.length > 0 ? protoKeys[0] : 'openai_chat';
    const keyOptions = keys.map(function(k) {
      return '<option value="' + k.id + '">' + escapeHtml(k.alias || '未命名') + ' (' + escapeHtml(k.key_masked) + ')</option>';
    }).join('');
    const modelOptions = models.map(function(m) {
      var mid = typeof m === 'string' ? m : (m.id || '');
      return '<option value="' + escapeHtml(mid) + '">' + escapeHtml(mid) + '</option>';
    }).join('');
    const protoOptions = [
      { value: 'openai_chat', label: 'OpenAI Chat' },
      { value: 'openai_responses', label: 'OpenAI Responses' },
      { value: 'anthropic', label: 'Anthropic' }
    ].map(function(p) {
      return '<option value="' + p.value + '"' + (p.value === defaultProto ? ' selected' : '') + '>' + p.label + '</option>';
    }).join('');
    html += '<div class="chat-section">' +
      '<hr class="section-divider" />' +
      '<h3 class="display-sm" style="margin-bottom:16px">聊天测试</h3>' +
      '<div class="chat-model-bar">' +
        '<span class="label-sm">协议:</span>' +
        '<select id="chatProtocol" class="text-input" style="max-width:180px">' + protoOptions + '</select>' +
        '<span class="label-sm" style="margin-left:8px">模型:</span>' +
        (models.length > 0
          ? '<select id="chatModel" class="text-input" style="max-width:250px">' + modelOptions + '</select>'
          : '<input type="text" id="chatModel" class="text-input" placeholder="输入模型 ID" style="max-width:250px" />') +
        '<span class="label-sm" style="margin-left:8px">Key:</span>' +
        '<select id="chatKeyId" class="text-input" style="max-width:220px">' + (keyOptions || '<option value="">无可用 Key</option>') + '</select>' +
        '<button class="btn btn-small btn-secondary" onclick="clearChat()">清空</button>' +
      '</div>' +
      '<div class="chat-messages" id="chatMessages">' +
        '<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px">输入消息开始对话测试</div>' +
      '</div>' +
      '<div class="chat-input-row">' +
        '<textarea id="chatInput" class="text-input" placeholder="输入消息...（Enter 发送，Shift+Enter 换行）" onkeydown="if(event.key===\\'Enter\\'&&!event.shiftKey){event.preventDefault();sendChatMessage(\\'' + ep.id + '\\')}"></textarea>' +
        '<button class="btn btn-primary" onclick="sendChatMessage(\\'' + ep.id + '\\')" id="chatSendBtn">发送</button>' +
      '</div>' +
    '</div>';

    el.innerHTML = html;
    loadChatHistory(id);
    renderChatMessages();
  } catch (e) {
    el.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  }
}

async function updateEndpoint(id) {
  const name = document.getElementById('epName')?.value;
  const notes = document.getElementById('epNotes')?.value;
  const autoHealth = document.getElementById('epAutoHealth')?.checked ? 1 : 0;
  await API.put('/api/endpoints/' + id, { name: name, notes: notes, auto_health: autoHealth });
  showToast('已保存');
}

async function redetectEndpoint(id) {
  await API.post('/api/endpoints/' + id + '/redetect');
  showToast('重新检测完成');
  navigate('/app/endpoint/' + id);
}

async function deleteEndpoint(id) {
  if (!confirm('确定删除此接口及所有 Key？')) return;
  await API.del('/api/endpoints/' + id);
  navigate('/app');
}

async function fetchModelsForEndpoint(endpointId, url) {
  var grid = document.getElementById('epModelsGrid');
  if (!grid) return;
  var originalHtml = grid.innerHTML;
  grid.innerHTML = '<div style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:13px"><span class="spinner"></span> 获取中...</div>';

  try {
    var data = await API.get('/api/models?url=' + encodeURIComponent(url));
    var models = data.models || [];
    if (models.length === 0) {
      grid.innerHTML = originalHtml;
      showToast('未获取到模型列表，已保留现有模型', 'info');
      return;
    }

    var epData = await API.get('/api/endpoints/' + endpointId);
    var existing = (function() { try { var m = JSON.parse(epData.endpoint.models || '[]'); return Array.isArray(m) ? m : []; } catch { return []; } })();
    var merged = [...new Set([...existing, ...models])];
    await API.put('/api/endpoints/' + endpointId, { models: merged });

    var html = '<div class="models-grid">';
    for (var i = 0; i < merged.length; i++) {
      html += '<span class="model-chip available">' + escapeHtml(merged[i]) + ' <span style="cursor:pointer;color:var(--error);margin-left:2px" onclick="removeModelFromEndpoint(\\'' + endpointId + '\\',\\'' + escapeHtml(merged[i]) + '\\')">&times;</span></span>';
    }
    html += '</div>';
    grid.innerHTML = html;

    var title = grid.closest('.card')?.querySelector('.caption-uppercase');
    if (title) title.textContent = '模型 (' + merged.length + ')';

    showToast('获取到 ' + models.length + ' 个模型，已合并');
  } catch (e) {
    grid.innerHTML = originalHtml;
    showToast('获取失败: ' + e.message, 'error');
  }
}

async function addModelToEndpoint(endpointId) {
  const input = document.getElementById('newModelInput');
  const model = input?.value.trim();
  if (!model) return showToast('请输入模型 ID', 'info');
  try {
    const data = await API.get('/api/endpoints/' + endpointId);
    const existing = (function() { try { var m = JSON.parse(data.endpoint.models || '[]'); return Array.isArray(m) ? m : []; } catch { return []; } })();
    if (existing.includes(model)) return showToast('模型已存在', 'info');
    existing.push(model);
    await API.put('/api/endpoints/' + endpointId, { models: existing });
    input.value = '';
    showToast('已添加');
    await loadEndpointDetail(endpointId);
  } catch (e) {
    showToast('添加失败: ' + e.message, 'error');
  }
}

async function removeModelFromEndpoint(endpointId, model) {
  try {
    const data = await API.get('/api/endpoints/' + endpointId);
    const existing = (function() { try { var m = JSON.parse(data.endpoint.models || '[]'); return Array.isArray(m) ? m : []; } catch { return []; } })();
    const filtered = existing.filter(function(m) { return m !== model; });
    await API.put('/api/endpoints/' + endpointId, { models: filtered });
    showToast('已移除');
    await loadEndpointDetail(endpointId);
  } catch (e) {
    showToast('移除失败: ' + e.message, 'error');
  }
}

async function addKey(endpointId) {
  const keyValue = document.getElementById('newKeyValue')?.value;
  const alias = document.getElementById('newKeyAlias')?.value;
  if (!keyValue) return showToast('请输入 Key', 'info');
  await API.post('/api/endpoints/' + endpointId + '/keys', { key_value: keyValue, alias: alias });
  document.getElementById('newKeyValue').value = '';
  document.getElementById('newKeyAlias').value = '';
  await loadEndpointDetail(endpointId);
}

async function copyKeyValue(keyId) {
  try {
    var data = await API.get('/api/keys/' + keyId);
    if (data.key_value) {
      navigator.clipboard.writeText(data.key_value).then(function() {
        showToast('已复制');
      });
    }
  } catch (e) {
    showToast('复制失败: ' + e.message, 'error');
  }
}

async function checkKey(keyId) {
  const btn = document.getElementById('key-check-btn-' + keyId);
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    const data = await API.post('/api/keys/' + keyId + '/check');
    const statusEl = document.getElementById('key-status-' + keyId);
    const timeEl = document.getElementById('key-time-' + keyId);
    if (statusEl) { statusEl.className = 'key-status dot ' + (data.is_alive ? 'dot-green' : 'dot-red'); }
    if (timeEl) { timeEl.textContent = formatTime(new Date().toISOString()); }
    showToast(data.is_alive ? '存活 (HTTP ' + data.status_code + ')' : '不可达 (HTTP ' + data.status_code + ')', data.is_alive ? 'success' : 'error');
  } catch (e) {
    showToast('检测失败: ' + e.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '检测'; }
  }
}

async function deleteKeyRow(keyId) {
  if (!confirm('确定删除此 Key？')) return;
  await API.del('/api/keys/' + keyId);
  var row = document.getElementById('key-row-' + keyId);
  if (row) row.remove();
  showToast('已删除');
}

/* Chat */
var LS_CHAT = 'tokenhub_chat_history';
var chatState = { messages: [], endpointId: '' };

function loadChatHistory(endpointId) {
  try {
    var raw = localStorage.getItem(LS_CHAT);
    var map = raw ? JSON.parse(raw) : {};
    chatState.messages = map[endpointId] || [];
    chatState.endpointId = endpointId;
  } catch (e) { chatState.messages = []; chatState.endpointId = endpointId; }
}

function saveChatHistory() {
  try {
    var raw = localStorage.getItem(LS_CHAT);
    var map = raw ? JSON.parse(raw) : {};
    map[chatState.endpointId] = chatState.messages;
    localStorage.setItem(LS_CHAT, JSON.stringify(map));
  } catch (e) {}
}

function clearChat() {
  chatState.messages = [];
  saveChatHistory();
  const el = document.getElementById('chatMessages');
  if (el) el.innerHTML = '<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px">对话已清空</div>';
}

function renderChatMessages() {
  const el = document.getElementById('chatMessages');
  if (!el) return;
  let html = '';
  for (var i = 0; i < chatState.messages.length; i++) {
    var m = chatState.messages[i];
    if (m.role === 'error') {
      html += '<div class="chat-msg error">' +
        '<div class="role" style="color:var(--error)">错误</div>' +
        '<div class="content">' +
          '<div style="color:var(--error);margin-bottom:6px">' + escapeHtml(m.content) + '</div>' +
          (m.retryIndex !== undefined ? '<button class="btn btn-small" onclick="retryChatMessage(' + m.retryIndex + ')">重发</button>' : '') +
        '</div>' +
      '</div>';
    } else if (m.role === 'assistant') {
      var usageHtml = m.usage ? '<div style="font-size:11px;color:var(--muted);margin-top:6px;padding-top:6px;border-top:1px solid var(--hairline)">tokens: ' + escapeHtml(JSON.stringify(m.usage)) + '</div>' : '';
      var timeHtml = m.responseTime ? '<span style="font-size:11px;color:var(--muted);margin-left:8px">' + m.responseTime + 'ms</span>' : '';
      html += '<div class="chat-msg assistant">' +
        '<div class="role">AI' + timeHtml + '</div>' +
        '<div class="content">' +
          '<div style="position:relative">' +
            '<div>' + renderMarkdown(m.content) + '</div>' +
            '<button class="btn-small-ghost" style="position:absolute;top:0;right:0;font-size:11px" onclick="copyChatContent(' + i + ')">复制</button>' +
          '</div>' +
          usageHtml +
        '</div>' +
      '</div>';
    } else {
      html += '<div class="chat-msg user">' +
        '<div class="role">你</div>' +
        '<div class="content">' + escapeHtml(m.content) + '</div>' +
      '</div>';
    }
  }
  el.innerHTML = html || '<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px">输入消息开始对话测试</div>';
  el.scrollTop = el.scrollHeight;
}

function renderMarkdown(text) {
  if (!text) return '';
  try {
    if (typeof marked !== 'undefined' && marked.parse) {
      return marked.parse(text, { breaks: true });
    }
  } catch (e) {}
  return escapeHtml(text);
}

function copyChatContent(msgIndex) {
  var content = chatState.messages[msgIndex]?.content || '';
  navigator.clipboard.writeText(content).then(function() {
    showToast('已复制');
  });
}

async function retryChatMessage(msgIndex) {
  var failedMsg = chatState.messages[msgIndex];
  if (!failedMsg || failedMsg.role !== 'error') return;
  var userMsg = chatState.messages[msgIndex - 1];
  if (!userMsg || userMsg.role !== 'user') return;
  chatState.messages.splice(msgIndex, 1);
  saveChatHistory();
  renderChatMessages();
  await sendChatMessage(chatState.endpointId, userMsg.content);
}

async function sendChatMessage(endpointId, retryContent) {
  const input = document.getElementById('chatInput');
  const msg = retryContent || (input ? input.value.trim() : '');
  if (!msg) return;

  const model = document.getElementById('chatModel')?.value.trim();
  if (!model) return showToast('请输入或选择模型 ID', 'info');
  const protocol = document.getElementById('chatProtocol')?.value || 'openai_chat';
  const keyId = document.getElementById('chatKeyId')?.value || '';

  if (!retryContent && input) input.value = '';
  if (!retryContent) {
    chatState.messages.push({ role: 'user', content: msg });
    saveChatHistory();
  }
  renderChatMessages();

  const sendBtn = document.getElementById('chatSendBtn');
  if (sendBtn) sendBtn.disabled = true;

  try {
    const data = await API.post('/api/chat', {
      endpointId,
      model,
      messages: chatState.messages.filter(function(m) { return m.role !== 'error'; }),
      protocol,
      keyId,
    });

    if (data.ok && data.reply) {
      chatState.messages.push({ role: 'assistant', content: data.reply, usage: data.usage, responseTime: data.responseTime });
    } else {
      var errMsg = 'HTTP ' + data.status + (data.error ? ': ' + data.error : '');
      chatState.messages.push({ role: 'error', content: errMsg, retryIndex: chatState.messages.length - 1 });
    }
    saveChatHistory();
    renderChatMessages();
  } catch (e) {
    chatState.messages.push({ role: 'error', content: e.message, retryIndex: chatState.messages.length - 1 });
    saveChatHistory();
    renderChatMessages();
  }
  if (sendBtn) sendBtn.disabled = false;
}

function renderHealthPage() {
  return '<div class="container">' +
    '<h2 class="display-sm" style="margin-bottom:24px">健康检测</h2>' +
    '<div id="healthSummary"></div>' +
    '<div class="card">' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
        '<select id="healthEndpointFilter" class="text-input" style="max-width:350px" onchange="loadHealthHistory()"><option value="">全部接口</option></select>' +
        '<input type="number" id="healthDays" class="text-input" value="7" style="width:80px" placeholder="天数" onchange="loadHealthHistory()" />' +
        '<span style="font-size:13px;color:var(--muted)">天</span>' +
        '<button class="btn btn-primary" onclick="loadHealthPage()">刷新</button>' +
        '<button class="btn btn-secondary" id="checkAllBtn" onclick="checkAllEndpoints()">立即检测</button>' +
      '</div>' +
    '</div>' +
    '<div id="healthList"></div>' +
  '</div>';
}

async function loadHealthPage() {
  await loadHealthSummary();
  await loadEndpointFilter();
  await loadHealthHistory();
}

async function loadHealthSummary() {
  var el = document.getElementById('healthSummary');
  if (!el) return;
  try {
    var data = await API.get('/api/health/summary');
    el.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:16px">' +
      '<div class="card" style="text-align:center;padding:16px"><div style="font-size:28px;font-weight:600;color:' + (data.alive_keys > 0 ? 'var(--success)' : 'var(--muted)') + '">' + data.alive_keys + '/' + data.total_endpoints + '</div><div style="font-size:12px;color:var(--muted)">接口存活</div></div>' +
      '<div class="card" style="text-align:center;padding:16px"><div style="font-size:28px;font-weight:600;color:var(--ink)">' + (data.avg_response_time_ms > 0 ? data.avg_response_time_ms + 'ms' : '-') + '</div><div style="font-size:12px;color:var(--muted)">平均响应</div></div>' +
      '<div class="card" style="text-align:center;padding:16px"><div style="font-size:14px;font-weight:500;color:var(--ink)">' + (data.last_checked_at ? formatTime(data.last_checked_at) : '从未') + '</div><div style="font-size:12px;color:var(--muted)">最近检测</div></div>' +
    '</div>';
  } catch (e) {
    el.innerHTML = '';
  }
}

async function loadEndpointFilter() {
  var sel = document.getElementById('healthEndpointFilter');
  if (!sel) return;
  try {
    var data = await API.get('/api/endpoints?limit=100');
    var endpoints = data.endpoints || [];
    var html = '<option value="">全部接口</option>';
    for (var i = 0; i < endpoints.length; i++) {
      html += '<option value="' + endpoints[i].id + '">' + escapeHtml(endpoints[i].name || endpoints[i].url) + '</option>';
    }
    sel.innerHTML = html;
  } catch (e) {}
}

async function loadHealthHistory() {
  var el = document.getElementById('healthList');
  if (!el) return;
  var days = document.getElementById('healthDays')?.value || 7;
  var endpointId = document.getElementById('healthEndpointFilter')?.value || '';
  el.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)">加载中...</div>';

  try {
    var url = '/api/health/history?days=' + days;
    if (endpointId) url += '&endpoint_id=' + endpointId;
    var data = await API.get(url);
    var checks = data.checks || [];
    if (checks.length === 0) {
      el.innerHTML = '<div class="empty-state">暂无检测记录</div>';
      return;
    }
    var html = '<div class="card"><table class="health-table"><tr><th>时间</th><th>状态</th><th>URL</th><th>状态码</th><th>响应时间</th></tr>';
    for (var i = 0; i < checks.length; i++) {
      var c = checks[i];
      html += '<tr>' +
        '<td class="cell-time">' + formatTime(c.checked_at) + '</td>' +
        '<td><span class="dot ' + (c.is_alive ? 'dot-green' : 'dot-red') + '"></span> ' + (c.is_alive ? '存活' : '失败') + '</td>' +
        '<td class="cell-url">' + escapeHtml(c.target_url) + '</td>' +
        '<td>' + (c.status_code || '-') + '</td>' +
        '<td>' + (c.response_time_ms ? c.response_time_ms + 'ms' : '-') + '</td>' +
      '</tr>';
    }
    html += '</table></div>';
    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  }
}

function renderAdminPage() {
  return '<div class="container">' +
    '<h2 class="display-sm" style="margin-bottom:24px">管理后台</h2>' +
    '<div class="card">' +
      '<div class="caption-uppercase" style="margin-bottom:12px">站点设置</div>' +
      '<div id="siteSettingsForm" style="display:grid;gap:12px">' +
        '<div><label class="label">站点名称</label><input type="text" id="setSiteName" class="text-input" placeholder="TokenHub" /></div>' +
        '<div><label class="label">站点标题（SEO Title）</label><input type="text" id="setSiteTitle" class="text-input" placeholder="TokenHub - AI API 接口管理平台" /></div>' +
        '<div><label class="label">站点描述（SEO Description）</label><textarea id="setSiteDesc" class="text-input" rows="2" placeholder="一站式 AI API 接口检测、Key 管理、健康监控平台"></textarea></div>' +
        '<div><label class="label">关键词（SEO Keywords）</label><input type="text" id="setSiteKeywords" class="text-input" placeholder="AI, API, 接口检测, Key管理" /></div>' +
        '<div><label class="label">Logo URL</label><input type="text" id="setSiteLogo" class="text-input" placeholder="https://example.com/logo.png" /></div>' +
        '<div><label class="label">Favicon URL</label><input type="text" id="setSiteFavicon" class="text-input" placeholder="https://example.com/favicon.ico" /></div>' +
        '<div><label class="label">页脚文字</label><input type="text" id="setSiteFooter" class="text-input" placeholder="© 2026 TokenHub" /></div>' +
        '<div><label class="label">OG 图片（社交分享）</label><input type="text" id="setSiteOgImage" class="text-input" placeholder="https://example.com/og.png" /></div>' +
        '<div><label class="label">导入文件云存储</label>' +
          '<div id="importStorageToggle" style="display:flex;align-items:center;gap:8px;margin-top:4px">' +
            '<label class="toggle"><input type="checkbox" id="setEnableImportStorage" onchange="toggleImportStorage()" /> <span>开启</span></label>' +
            '<span id="importStorageStatus" style="font-size:12px;color:var(--muted)"></span>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:4px"><button class="btn btn-primary" onclick="saveSiteSettings()">保存设置</button>' + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="card" style="margin-top:16px">' +
      '<div class="caption-uppercase" style="margin-bottom:12px">用户管理</div>' +
      '<input type="text" id="adminSearch" class="text-input" placeholder="搜索用户..." oninput="loadAdminPage()" />' +
    '</div>' +
    '<div id="adminUserList"></div>' +
    '<div class="card" style="margin-top:16px">' +
      '<div class="caption-uppercase" style="margin-bottom:12px">数据导出</div>' +
      '<p style="font-size:13px;color:var(--muted);margin-bottom:12px">导出当前数据，可在 9router 或其他兼容工具中导入使用。导出的文件包含 API Key，请注意保管。</p>' +
      '<button class="btn btn-primary btn-small" onclick="export9router()">导出 9router JSON</button>' +
      '<button class="btn btn-small" onclick="exportCCSwitch()" style="margin-left:8px">导出 CC-Switch .db</button>' +
    '</div>' +
    '<div class="card" style="margin-top:16px">' +
      '<div class="caption-uppercase" style="margin-bottom:12px">导入文件</div>' +
      '<div id="importedFilesList"></div>' +
    '</div>' +
  '</div>';
}

async function loadSiteSettings() {
  try {
    const data = await API.get('/api/admin/settings');
    const s = data.settings || {};
    var fields = { site_name: 'setSiteName', site_title: 'setSiteTitle', site_desc: 'setSiteDesc', site_keywords: 'setSiteKeywords', site_logo: 'setSiteLogo', site_favicon: 'setSiteFavicon', site_footer: 'setSiteFooter', site_og_image: 'setSiteOgImage' };
    for (const [key, id] of Object.entries(fields)) {
      var el = document.getElementById(id);
      if (el) el.value = s[key] || '';
    }
    // Handle checkbox setting
    var storageCb = document.getElementById('setEnableImportStorage');
    if (storageCb) storageCb.checked = s.enable_import_storage === '1';
    // Handle meta
    if (data._meta) {
      if (storageCb) storageCb.dataset.hasBucket = data._meta.hasImportBucket ? 'true' : 'false';
      handleImportStorageToggle();
    }
  } catch (e) {}
}

async function saveSiteSettings() {
  var body = {
    site_name: document.getElementById('setSiteName')?.value || '',
    site_title: document.getElementById('setSiteTitle')?.value || '',
    site_desc: document.getElementById('setSiteDesc')?.value || '',
    site_keywords: document.getElementById('setSiteKeywords')?.value || '',
    site_logo: document.getElementById('setSiteLogo')?.value || '',
    site_favicon: document.getElementById('setSiteFavicon')?.value || '',
    site_footer: document.getElementById('setSiteFooter')?.value || '',
    site_og_image: document.getElementById('setSiteOgImage')?.value || '',
  };
  body.enable_import_storage = document.getElementById('setEnableImportStorage')?.checked ? '1' : '0';
  await API.put('/api/admin/settings', body);
  showToast('站点设置已保存');
}

async function loadAdminPage() {
  await loadSiteSettings();
  loadImportedFiles();
  handleImportStorageToggle();
  const el = document.getElementById('adminUserList');
  if (!el) return;
  const search = document.getElementById('adminSearch')?.value || '';
  el.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)">加载中...</div>';

  try {
    const data = await API.get('/api/admin/users?search=' + encodeURIComponent(search));
    const users = data.users || [];
    if (users.length === 0) {
      el.innerHTML = '<div class="empty-state">暂无用户</div>';
      return;
    }
    let html = '<div class="card"><table class="health-table"><tr><th>Email</th><th>角色</th><th>注册时间</th><th>操作</th></tr>';
    for (const u of users) {
      html += '<tr>' +
        '<td>' + escapeHtml(u.email) + '</td>' +
        '<td><span class="badge ' + (u.role === 'admin' ? 'badge-purple' : 'badge-muted') + '">' + u.role + '</span></td>' +
        '<td>' + formatTime(u.created_at) + '</td>' +
        '<td><button class="btn btn-small" onclick="if(confirm(\\'确定删除此用户？\\')) deleteUser(\\'' + u.id + '\\')">删除</button></td>' +
      '</tr>';
    }
    html += '</table></div>';
    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  }
}

async function export9router() {
  try {
    var data = await API.get('/api/export/9router');
    if (!data.providerConnections || data.providerConnections.length === 0) {
      showToast('没有可导出的数据', 'info');
      return;
    }
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '9router-export-' + new Date().toISOString().slice(0,19).replace(/[:-]/g, '') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('导出成功: ' + data.providerConnections.length + ' 个连接', 'success');
  } catch (err) {
    showToast('导出失败: ' + err.message, 'error');
  }
}

function ccProtocolToAppType(proto) {
  if (proto === 'anthropic') return 'claude';
  if (proto === 'openai_chat' || proto === 'openai_responses') return 'codex';
  return 'openclaw';
}

function ccBuildSettings(ep) {
  var protos = ep.protocols || {};
  var firstProto = Object.keys(protos).find(function(k) { return protos[k]; }) || 'openai_chat';
  var appType = ccProtocolToAppType(firstProto);
  var wireApi = firstProto === 'openai_responses' ? 'responses' : 'chat';
  var model = (ep.models && ep.models.length > 0) ? ep.models[0] : '';
  var keyValue = (ep.keys && ep.keys.length > 0) ? ep.keys[0].key_value : '';
  var keyAlias = (ep.keys && ep.keys.length > 0 && ep.keys[0].alias) || '';

  if (appType === 'claude') {
    var env = { ANTHROPIC_BASE_URL: ep.url, ANTHROPIC_AUTH_TOKEN: keyValue };
    if (model) env.ANTHROPIC_MODEL = model;
    return JSON.stringify({ env: env });
  }

  if (appType === 'codex') {
    var config = 'model_provider = "custom"\\n';
    if (model) config += 'model = "' + model + '"\\n';
    config += '\\n[model_providers.custom]\\nname = "custom"\\nwire_api = "' + wireApi + '"\\nbase_url = "' + ep.url + '"\\n';
    var auth = { OPENAI_API_KEY: keyValue, auth_mode: 'apikey' };
    return JSON.stringify({ auth: auth, config: config });
  }

  var obj = { baseUrl: ep.url, apiKey: keyValue, api: 'openai-completions' };
  if (model) obj.models = [{ id: model }];
  return JSON.stringify(obj);
}

function ccSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'provider';
}

async function exportCCSwitch() {
  if (!confirm('导出的文件包含所有 API Key，请确认环境安全后再下载。是否继续？')) return;

  var btn = document.querySelector('button[onclick="exportCCSwitch()"]');
  if (btn) { btn.disabled = true; btn.textContent = '生成中...'; }

  try {
    var SQL = null;
    try {
      SQL = await loadSqlJs();
    } catch (e) {
      showToast('sql.js 加载失败，降级为 JSON 格式下载', 'info');
      var fallbackData = await API.get('/api/export/ccswitch-data');
      if (!fallbackData.endpoints || fallbackData.endpoints.length === 0) { showToast('没有可导出的数据', 'info'); return; }
      var blob = new Blob([JSON.stringify(fallbackData, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'ccswitch-export-' + new Date().toISOString().slice(0,19).replace(/[:-]/g, '') + '.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('已降级导出为 JSON 格式', 'info');
      return;
    }

    var data = await API.get('/api/export/ccswitch-data');
    if (!data.endpoints || data.endpoints.length === 0) { showToast('没有可导出的数据', 'info'); return; }

    var db = new SQL.Database();

    // Create all tables matching CC-Switch schema
    db.run("CREATE TABLE providers (id TEXT NOT NULL, app_type TEXT NOT NULL, name TEXT NOT NULL, settings_config TEXT NOT NULL, website_url TEXT, category TEXT, created_at INTEGER, sort_index INTEGER, notes TEXT, icon TEXT, icon_color TEXT, meta TEXT NOT NULL DEFAULT '{}', is_current INTEGER NOT NULL DEFAULT 0, in_failover_queue INTEGER NOT NULL DEFAULT 0, cost_multiplier TEXT NOT NULL DEFAULT '1.0', limit_daily_usd TEXT, limit_monthly_usd TEXT, provider_type TEXT, PRIMARY KEY (id, app_type))");

    db.run("CREATE TABLE provider_endpoints (id INTEGER PRIMARY KEY AUTOINCREMENT, provider_id TEXT NOT NULL, app_type TEXT NOT NULL, url TEXT NOT NULL, added_at INTEGER, FOREIGN KEY (provider_id, app_type) REFERENCES providers(id, app_type) ON DELETE CASCADE)");

    db.run("CREATE TABLE provider_health (provider_id TEXT NOT NULL, app_type TEXT NOT NULL, is_healthy INTEGER NOT NULL DEFAULT 1, consecutive_failures INTEGER NOT NULL DEFAULT 0, last_success_at TEXT, last_failure_at TEXT, last_error TEXT, updated_at TEXT NOT NULL, PRIMARY KEY (provider_id, app_type), FOREIGN KEY (provider_id, app_type) REFERENCES providers(id, app_type) ON DELETE CASCADE)");

    db.run("CREATE TABLE mcp_servers (id TEXT PRIMARY KEY, name TEXT NOT NULL, server_config TEXT NOT NULL, description TEXT, homepage TEXT, docs TEXT, tags TEXT NOT NULL DEFAULT '[]', enabled_claude INTEGER NOT NULL DEFAULT 0, enabled_codex INTEGER NOT NULL DEFAULT 0, enabled_gemini INTEGER NOT NULL DEFAULT 0, enabled_opencode INTEGER NOT NULL DEFAULT 0, enabled_hermes INTEGER NOT NULL DEFAULT 0)");

    db.run("CREATE TABLE model_pricing (model_id TEXT PRIMARY KEY, display_name TEXT NOT NULL, input_cost_per_million TEXT NOT NULL, output_cost_per_million TEXT NOT NULL, cache_read_cost_per_million TEXT NOT NULL DEFAULT '0', cache_creation_cost_per_million TEXT NOT NULL DEFAULT '0')");

    db.run("CREATE TABLE prompts (id TEXT NOT NULL, app_type TEXT NOT NULL, name TEXT NOT NULL, content TEXT NOT NULL, description TEXT, enabled INTEGER NOT NULL DEFAULT 1, created_at INTEGER, updated_at INTEGER, PRIMARY KEY (id, app_type))");

    db.run("CREATE TABLE proxy_config (app_type TEXT PRIMARY KEY, proxy_enabled INTEGER NOT NULL DEFAULT 0, listen_address TEXT NOT NULL DEFAULT '127.0.0.1', listen_port INTEGER NOT NULL DEFAULT 15721, enable_logging INTEGER NOT NULL DEFAULT 1, enabled INTEGER NOT NULL DEFAULT 0, auto_failover_enabled INTEGER NOT NULL DEFAULT 0, max_retries INTEGER NOT NULL DEFAULT 3, streaming_first_byte_timeout INTEGER NOT NULL DEFAULT 60, streaming_idle_timeout INTEGER NOT NULL DEFAULT 120, non_streaming_timeout INTEGER NOT NULL DEFAULT 600, circuit_failure_threshold INTEGER NOT NULL DEFAULT 4, circuit_success_threshold INTEGER NOT NULL DEFAULT 2, circuit_timeout_seconds INTEGER NOT NULL DEFAULT 60, circuit_error_rate_threshold REAL NOT NULL DEFAULT 0.6, circuit_min_requests INTEGER NOT NULL DEFAULT 10, default_cost_multiplier TEXT NOT NULL DEFAULT '1', pricing_model_source TEXT NOT NULL DEFAULT 'response', created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now')), live_takeover_active INTEGER NOT NULL DEFAULT 0)");

    db.run("CREATE TABLE proxy_live_backup (app_type TEXT PRIMARY KEY, original_config TEXT NOT NULL, backed_up_at TEXT NOT NULL)");

    db.run("CREATE TABLE proxy_request_logs (request_id TEXT PRIMARY KEY, provider_id TEXT NOT NULL, app_type TEXT NOT NULL, model TEXT NOT NULL, request_model TEXT, input_tokens INTEGER NOT NULL DEFAULT 0, output_tokens INTEGER NOT NULL DEFAULT 0, cache_read_tokens INTEGER NOT NULL DEFAULT 0, cache_creation_tokens INTEGER NOT NULL DEFAULT 0, input_cost_usd TEXT NOT NULL DEFAULT '0', output_cost_usd TEXT NOT NULL DEFAULT '0', cache_read_cost_usd TEXT NOT NULL DEFAULT '0', cache_creation_cost_usd TEXT NOT NULL DEFAULT '0', total_cost_usd TEXT NOT NULL DEFAULT '0', latency_ms INTEGER NOT NULL, first_token_ms INTEGER, duration_ms INTEGER, status_code INTEGER NOT NULL, error_message TEXT, session_id TEXT, provider_type TEXT, is_streaming INTEGER NOT NULL DEFAULT 0, cost_multiplier TEXT NOT NULL DEFAULT '1.0', created_at INTEGER NOT NULL, data_source TEXT NOT NULL DEFAULT 'proxy')");

    db.run("CREATE TABLE session_log_sync (file_path TEXT PRIMARY KEY, last_modified INTEGER NOT NULL, last_line_offset INTEGER NOT NULL DEFAULT 0, last_synced_at INTEGER NOT NULL)");

    db.run("CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT)");

    db.run("CREATE TABLE skill_repos (owner TEXT NOT NULL, name TEXT NOT NULL, branch TEXT NOT NULL DEFAULT 'main', enabled INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (owner, name))");

    db.run("CREATE TABLE skills (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT, directory TEXT NOT NULL, repo_owner TEXT, repo_name TEXT, repo_branch TEXT DEFAULT 'main', readme_url TEXT, enabled_claude INTEGER NOT NULL DEFAULT 0, enabled_codex INTEGER NOT NULL DEFAULT 0, enabled_gemini INTEGER NOT NULL DEFAULT 0, enabled_opencode INTEGER NOT NULL DEFAULT 0, installed_at INTEGER NOT NULL DEFAULT 0, content_hash TEXT, updated_at INTEGER NOT NULL DEFAULT 0, enabled_hermes INTEGER NOT NULL DEFAULT 0)");

    db.run("CREATE TABLE stream_check_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, provider_id TEXT NOT NULL, provider_name TEXT NOT NULL, app_type TEXT NOT NULL, status TEXT NOT NULL, success INTEGER NOT NULL, message TEXT NOT NULL, response_time_ms INTEGER, http_status INTEGER, model_used TEXT, retry_count INTEGER DEFAULT 0, tested_at INTEGER NOT NULL)");

    db.run("CREATE TABLE usage_daily_rollups (date TEXT NOT NULL, app_type TEXT NOT NULL, provider_id TEXT NOT NULL, model TEXT NOT NULL, request_count INTEGER NOT NULL DEFAULT 0, success_count INTEGER NOT NULL DEFAULT 0, input_tokens INTEGER NOT NULL DEFAULT 0, output_tokens INTEGER NOT NULL DEFAULT 0, cache_read_tokens INTEGER NOT NULL DEFAULT 0, cache_creation_tokens INTEGER NOT NULL DEFAULT 0, total_cost_usd TEXT NOT NULL DEFAULT '0', avg_latency_ms INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (date, app_type, provider_id, model))");

    // Insert providers and endpoints
    var insertProvider = db.prepare("INSERT INTO providers (id, app_type, name, settings_config, website_url, category, created_at, sort_index, notes, icon, icon_color, meta, is_current, in_failover_queue, cost_multiplier, limit_daily_usd, limit_monthly_usd, provider_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    var insertEndpoint = db.prepare("INSERT INTO provider_endpoints (provider_id, app_type, url, added_at) VALUES (?, ?, ?, ?)");

    var now = Date.now();
    var totalProviders = 0;

    for (var ei = 0; ei < data.endpoints.length; ei++) {
      var ep = data.endpoints[ei];
      var protos = ep.protocols || {};
      var firstProto = Object.keys(protos).find(function(k) { return protos[k]; }) || 'openai_chat';
      var appType = ccProtocolToAppType(firstProto);
      var slug = ccSlug(ep.name);

      for (var ki = 0; ki < ep.keys.length; ki++) {
        totalProviders++;
        var pid = slug + '-' + now + '-' + ei + '-' + ki;
        var pname = ep.name + (ep.keys.length > 1 ? ' #' + (ki + 1) : '');

        var singleEp = { url: ep.url, protocols: protos, models: ep.models, keys: [ep.keys[ki]] };
        var sc = ccBuildSettings(singleEp);

        insertProvider.run([pid, appType, pname, sc, '', '', now, ki, '', '', '', '{}', 1, 0, '1.0', '', '', '']);
        insertEndpoint.run([pid, appType, ep.url, now]);
      }
    }
    insertProvider.free();
    insertEndpoint.free();

    // Insert provider_health for each provider
    var insertHealth = db.prepare("INSERT OR IGNORE INTO provider_health (provider_id, app_type, is_healthy, consecutive_failures, last_success_at, last_failure_at, last_error, updated_at) VALUES (?, ?, 1, 0, NULL, NULL, NULL, ?)");
    for (var hi = 0; hi < data.endpoints.length; hi++) {
      var hep = data.endpoints[hi];
      var hprotos = hep.protocols || {};
      var hfirstProto = Object.keys(hprotos).find(function(k) { return hprotos[k]; }) || 'openai_chat';
      var happType = ccProtocolToAppType(hfirstProto);
      var hslug = ccSlug(hep.name);
      for (var hki = 0; hki < hep.keys.length; hki++) {
        var hpid = hslug + '-' + now + '-' + hi + '-' + hki;
        try { insertHealth.run([hpid, happType, new Date().toISOString()]); } catch(e) {}
      }
    }
    insertHealth.free();

    // Default proxy_config rows for all app types
    var insertProxy = db.prepare("INSERT OR IGNORE INTO proxy_config (app_type) VALUES (?)");
    var proxyTypes = ['claude', 'codex', 'gemini', 'opencode', 'hermes'];
    for (var pi = 0; pi < proxyTypes.length; pi++) {
      try { insertProxy.run([proxyTypes[pi]]); } catch(e) {}
    }
    insertProxy.free();

    // Default settings matching CC-Switch native backup
    var insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
    insertSetting.run(['common_config_codex', 'model_reasoning_effort = \"high\"\\n']);
    insertSetting.run(['common_config_claude', '{\\n  \"includeCoAuthoredBy\": false\\n}']);
    insertSetting.run(['common_config_opencode', '{}']);
    insertSetting.run(['common_config_gemini', '{}']);
    insertSetting.run(['common_config_hermes', '{}']);
    insertSetting.run(['universal_providers', '{}']);
    insertSetting.run(['official_providers_seeded', 'true']);
    insertSetting.run(['common_config_legacy_migrated_v1', 'true']);
    insertSetting.run(['proxy_enabled_codex', 'false']);
    insertSetting.run(['proxy_enabled_claude', 'false']);
    insertSetting.run(['proxy_enabled_opencode', 'false']);
    insertSetting.run(['proxy_enabled_gemini', 'false']);
    insertSetting.run(['proxy_enabled_hermes', 'false']);
    insertSetting.run(['auto_failover_enabled', 'false']);
    insertSetting.run(['cost_multiplier', '1.0']);
    insertSetting.free();

    var binaryArray = db.export();
    db.close();

    var blob = new Blob([binaryArray], { type: 'application/x-sqlite3' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'ccswitch-export-' + new Date().toISOString().slice(0,19).replace(/[:-]/g, '') + '.db';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('导出成功: ' + totalProviders + ' 个提供者', 'success');
  } catch (err) {
    showToast('导出失败: ' + err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '导出 CC-Switch .db'; }
  }
}

function toggleImportStorage() {
  var cb = document.getElementById('setEnableImportStorage');
  if (!cb) return;
  if (!cb.dataset.hasBucket) {
    showToast('未配置 R2 Bucket，无法开启', 'error');
    cb.checked = false;
    return;
  }
}

async function loadImportedFiles() {
  var el = document.getElementById('importedFilesList');
  if (!el) return;
  try {
    var data = await API.get('/api/import/files?page=1&limit=20');
    if (!data.files || data.files.length === 0) {
      el.innerHTML = '<div style="font-size:13px;color:var(--muted);padding:8px 0">暂无导入文件</div>';
      return;
    }
    var html = '<table class="health-table"><tr><th>文件名</th><th>类型</th><th>大小</th><th>导入行数</th><th>时间</th><th>操作</th></tr>';
    for (var i = 0; i < data.files.length; i++) {
      var f = data.files[i];
      var sizeStr = f.file_size > 1048576
        ? (f.file_size / 1048576).toFixed(1) + ' MB'
        : f.file_size > 1024
          ? (f.file_size / 1024).toFixed(0) + ' KB'
          : f.file_size + ' B';
      var typeLabel = f.file_type === '9router' ? '9router' : 'CC-Switch';
      html += '<tr>' +
        '<td>' + escapeHtml(f.filename) + '</td>' +
        '<td><span class="badge badge-green">' + typeLabel + '</span></td>' +
        '<td>' + sizeStr + '</td>' +
        '<td>' + f.imported_rows + '</td>' +
        '<td style="font-size:12px;color:var(--muted)">' + escapeHtml(f.created_at || '') + '</td>' +
        '<td>' +
          '<button class="btn btn-small" onclick="downloadImportedFile(\\'' + f.id + '\\',\\'' + escapeHtml(f.filename) + '\\')">下载</button> ' +
          '<button class="btn btn-small btn-danger" onclick="deleteImportedFile(\\'' + f.id + '\\')">删除</button>' +
        '</td>' +
      '</tr>';
    }
    html += '</table>';
    el.innerHTML = html;
  } catch (err) {
    el.innerHTML = '<div style="color:var(--danger);font-size:13px">加载失败: ' + escapeHtml(err.message) + '</div>';
  }
}

async function downloadImportedFile(fileId, filename) {
  try {
    var token = localStorage.getItem(TOKEN_KEY);
    var res = await fetch('/api/import/files/' + fileId + '/download', {
      headers: token ? { 'Authorization': 'Bearer ' + token } : {},
    });
    if (!res.ok) { var err = await res.json().catch(function(){return{}}); throw new Error(err.error || '下载失败'); }
    var blob = await res.blob();
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    showToast('下载失败: ' + e.message, 'error');
  }
}

async function deleteImportedFile(fileId) {
  if (!confirm('确定删除此文件？')) return;
  try {
    await API.del('/api/import/files/' + fileId);
    showToast('已删除', 'success');
    loadImportedFiles();
  } catch (err) {
    showToast('删除失败: ' + err.message, 'error');
  }
}

function handleImportStorageToggle() {
  var cb = document.getElementById('setEnableImportStorage');
  var status = document.getElementById('importStorageStatus');
  if (!cb || !status) return;
  if (cb.dataset.hasBucket !== 'true') {
    cb.disabled = true;
    status.textContent = '未配置 R2 Bucket';
  } else {
    cb.disabled = false;
    status.textContent = '';
  }
}

async function deleteUser(userId) {
  await API.del('/api/admin/users/' + userId);
  await loadAdminPage();
}

async function checkAllEndpoints() {
  var btn = document.getElementById('checkAllBtn');
  if (btn) { btn.disabled = true; btn.textContent = '检测中...'; }
  try {
    var data = await API.post('/api/health/check-all');
    showToast('检测完成，共 ' + (data.total || 0) + ' 个 Key');
    await loadHealthPage();
  } catch (e) {
    showToast('检测失败: ' + e.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '立即检测'; }
  }
}

function formatTime(t) {
  if (!t) return '-';
  try {
    const d = new Date(t + (t.includes('Z') ? '' : 'Z'));
    return d.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch (e) { return t; }
}

document.addEventListener('DOMContentLoaded', async function() {
  const params = new URLSearchParams(location.search);
  const ssoToken = params.get('token');
  if (ssoToken) {
    localStorage.setItem(TOKEN_KEY, ssoToken);
    params.delete('token');
    const newUrl = location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newUrl);
  }

  const token = localStorage.getItem(TOKEN_KEY);
  const isPublicPage = location.pathname === '/' || location.pathname === '';
  if (token) {
    await initApp();
    renderPage();
  } else if (isPublicPage) {
    var navUser = document.getElementById('navUser');
    if (navUser) navUser.innerHTML = '<a href="#" onclick="doLogin();return false" class="btn btn-small btn-primary" style="height:32px;padding:4px 14px">登录</a>';
    document.querySelectorAll('.auth-only').forEach(function(el) { el.style.display = 'none'; });
    renderPage();
  } else if (location.pathname !== '/sso/callback') {
    doLogin();
  }
});

function doLogin() {
  var ssoUrl = 'https://auth.it0731.cn';
  var redirect = encodeURIComponent(location.origin + '/sso/callback');
  location.href = ssoUrl + '/login?redirect=' + redirect;
}`;

export function renderApp(user, siteSettings) {
  var s = siteSettings || {};
  var siteName = s.site_name || 'TokenHub';
  var siteTitle = s.site_title || 'TokenHub - AI API 接口管理平台';
  var siteDesc = s.site_desc || '一站式 AI API 接口检测、Key 管理、健康监控平台';
  var siteKeywords = s.site_keywords || 'AI, API, 接口检测, Key管理, 健康监控';
  var siteLogo = s.site_logo || '';
  var siteFavicon = s.site_favicon || '';
  var siteFooter = s.site_footer || '';
  var siteOgImage = s.site_og_image || '';
  var siteUrl = s._url || '';

  var faviconTag = siteFavicon ? '<link rel="icon" href="' + siteFavicon + '">' : '';
  var logoHtml = siteLogo ? '<img src="' + siteLogo + '" alt="' + siteName + '" style="height:28px;margin-right:4px">' : '';
  var footerHtml = siteFooter ? '<footer style="text-align:center;padding:24px;color:var(--muted);font-size:13px;border-top:1px solid var(--hairline);margin-top:48px">' + siteFooter + '</footer>' : '';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteTitle}</title>
  <meta name="description" content="${siteDesc}">
  <meta name="keywords" content="${siteKeywords}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${siteTitle}">
  <meta property="og:description" content="${siteDesc}">
  ${siteOgImage ? '<meta property="og:image" content="' + siteOgImage + '">' : ''}
  <meta property="og:site_name" content="${siteName}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${siteTitle}">
  <meta name="twitter:description" content="${siteDesc}">
  ${siteOgImage ? '<meta name="twitter:image" content="' + siteOgImage + '">' : ''}
  ${faviconTag}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${siteName}",
    "description": "${siteDesc}",
    "url": "${siteUrl}",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web"
  }
  </script>
  <style>${CSS}</style>
</head>
<body>
  <nav class="top-nav">
    <div class="nav-inner">
      <a href="/" onclick="return navigate('/')" class="logo">${logoHtml}${siteName}</a>
      <div class="nav-links" id="navLinks">
        <a href="/" onclick="return navigate('/')" data-nav>检测</a>
        <a href="/app" onclick="return navigate('/app')" data-nav id="navDashboard" class="auth-only">仪表盘</a>
        <a href="/app/health" onclick="return navigate('/app/health')" data-nav id="navHealth" class="auth-only">健康</a>
        <a href="/app/admin" onclick="return navigate('/app/admin')" data-nav id="adminLink" class="auth-only" style="display:none">管理</a>
      </div>
      <div class="nav-user" id="navUser">
      </div>
    </div>
  </nav>
  <main id="app"></main>
  ${footerHtml}
  <script>${APP_JS}</script>
</body>
</html>`;
}

export function renderSSOCallback() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><title>SSO 登录中...</title></head>
<body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:Inter,sans-serif;background:#fff;color:#171717">
  <p>登录成功，正在跳转...</p>
  <script>
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('tokenhub_token', token);
      window.location.href = '/';
    } else {
      window.location.href = '/';
    }
  </script>
</body>
</html>`;
}

