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
`;

const APP_JS = `
const TOKEN_KEY = 'tokenhub_token';
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

  try {
    if (path === '/' || path === '') {
      app.innerHTML = renderDetectPage();
      initDetectPage();
    } else if (path === '/app') {
      app.innerHTML = renderDashboard();
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

function renderDetectPage() {
  return '<div class="container">' +
    '<div class="hero-band">' +
      '<h1 class="display-lg">API 接口检测</h1>' +
      '<p class="body-md" style="margin-top:8px">智能探测接口支持的协议和可用模型</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="input-row">' +
        '<input type="text" id="detectUrl" class="text-input" placeholder="API URL，如 https://api.cline.bot" />' +
        '<button class="btn btn-primary" id="detectBtn" onclick="startDetection()">检测</button>' +
      '</div>' +
      '<div class="input-row" style="margin-top:8px">' +
        '<input type="password" id="detectKey" class="text-input" placeholder="API Key（可选，有 Key 可验证协议并检测模型）" />' +
      '</div>' +
      '<div id="detectProgress" style="display:none;margin-top:12px;color:var(--muted);font-size:13px">' +
        '<span class="spinner"></span> 正在检测...' +
      '</div>' +
    '</div>' +
    '<div id="detectResults"></div>' +
  '</div>';
}

function initDetectPage() {
}

async function startDetection() {
  const url = document.getElementById('detectUrl').value.trim();
  const key = document.getElementById('detectKey').value.trim();
  if (!url) return alert('请输入 API URL');

  const btn = document.getElementById('detectBtn');
  const progress = document.getElementById('detectProgress');
  const results = document.getElementById('detectResults');
  btn.disabled = true;
  progress.style.display = 'flex';
  results.innerHTML = '';

  try {
    const data = await API.post('/api/detect', { url, apiKey: key });
    renderDetectResults(data, url, key);
  } catch (e) {
    results.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  } finally {
    btn.disabled = false;
    progress.style.display = 'none';
  }
}

function renderDetectResults(data, url, apiKey) {
  const el = document.getElementById('detectResults');
  if (!data.success) {
    el.innerHTML = '<div class="error-panel"><strong>检测失败</strong><br>' + escapeHtml(data.error || '无法发现有效端点') + '</div>';
    return;
  }

  let html = '';
  if (data.recommendedBase) {
    html += '<div class="best-base"><div class="caption-uppercase">推荐 Base URL</div><div class="best-base-url">' + escapeHtml(data.recommendedBase) + '</div></div>';
  }

  for (const b of (data.allBases || [])) {
    html += '<div class="card"><div class="proto-base-url" style="font-size:13px;color:var(--muted);margin-bottom:12px">' + escapeHtml(b.base) + '</div>' +
      '<div class="protocol-grid">';
    for (const [key, info] of Object.entries(b.protocols)) {
      const labels = { openai_chat: 'OpenAI Chat', openai_responses: 'OpenAI Responses', anthropic: 'Anthropic' };
      const label = labels[key] || key;
      const dotClass = info.supported ? 'dot-green' : 'dot-red';
      const badgeClass = info.supported ? 'badge-green' : 'badge-red';
      const badgeText = info.supported ? 'YES' : 'NO';
      html += '<div class="proto-card ' + (info.supported ? 'ok' : 'no') + '">' +
        '<div class="proto-name">' + label + ' <span class="badge ' + badgeClass + '">' + badgeText + '</span></div>' +
        '<div class="proto-status"><span class="dot ' + dotClass + '"></span>' + (info.status ? 'HTTP ' + info.status : '') + '</div>' +
      '</div>';
    }
    html += '</div>';

    if (b.models && b.models.models && b.models.models.length > 0) {
      html += '<div class="models-wrap">' +
        '<div class="caption-uppercase" style="margin-bottom:8px">模型 (' + b.models.models.length + ')</div>' +
        '<div class="models-grid">';
      for (const m of b.models.models) {
        html += '<span class="model-chip ' + (m.supported !== false ? 'available' : '') + '">' + escapeHtml(m.id || m) + '</span>';
      }
      html += '</div></div>';
    }
    html += '</div>';
  }

  html += '<div class="card" style="text-align:center">' +
    '<button class="btn btn-primary" onclick="saveEndpoint()">保存此接口</button>' +
  '</div>';

  el.innerHTML = html;
}

async function saveEndpoint() {
  const url = document.getElementById('detectUrl').value.trim();
  if (!url) return alert('缺少 URL');
  await API.post('/api/endpoints', { url: url, name: url, protocols: '{}', models: '[]' });
  alert('保存成功！');
  navigate('/app');
}

function renderDashboard() {
  return '<div class="container">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">' +
      '<h2 class="display-sm">我的接口</h2>' +
      '<a href="/" onclick="return navigate(\\'/\\')" class="btn btn-primary">+ 新增检测</a>' +
    '</div>' +
    '<div class="search-bar">' +
      '<input type="text" id="searchInput" class="text-input" placeholder="搜索接口名称或 URL..." oninput="loadDashboard()" />' +
    '</div>' +
    '<div id="endpointList"></div>' +
  '</div>';
}

async function loadDashboard() {
  const search = document.getElementById('searchInput')?.value || '';
  const el = document.getElementById('endpointList');
  if (!el) return;
  el.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)">加载中...</div>';

  try {
    const data = await API.get('/api/endpoints?search=' + encodeURIComponent(search));
    const endpoints = data.endpoints || [];
    if (endpoints.length === 0) {
      el.innerHTML = '<div class="empty-state">还没有保存的接口。<a href="/" onclick="return navigate(\\'/\\')">去检测一个</a></div>';
      return;
    }
    let html = '<div class="endpoint-grid">';
    for (const ep of endpoints) {
      const protos = (function() { try { return JSON.parse(ep.protocols); } catch { return {}; } })();
      const protoKeys = Object.keys(protos).filter(function(k) { return protos[k]; });
      const protoHtml = protoKeys.map(function(k) {
        const labels = { openai_chat: 'Chat', openai_responses: 'Responses', anthropic: 'Anthropic' };
        const colors = { openai_chat: 'badge-green', openai_responses: 'badge-blue', anthropic: 'badge-purple' };
        return '<span class="badge ' + (colors[k] || 'badge-green') + '">' + (labels[k] || k) + '</span>';
      }).join(' ');

      const keysResp = await API.get('/api/endpoints/' + ep.id + '/keys');
      const keyCount = (keysResp.keys || []).length;

      html += '<div class="endpoint-card" onclick="navigate(\\'/app/endpoint/' + ep.id + '\\')">' +
        '<div class="ep-name">' + escapeHtml(ep.name || ep.url) + '</div>' +
        '<div class="ep-url">' + escapeHtml(ep.url) + '</div>' +
        '<div style="display:flex;gap:4px;align-items:center;margin-top:8px">' +
          protoHtml +
          '<span class="badge badge-muted">' + keyCount + ' Key</span>' +
        '</div>' +
        '<div class="ep-meta">' + (ep.last_detected_at ? '检测: ' + ep.last_detected_at : '未检测') + '</div>' +
      '</div>';
    }
    html += '</div>';
    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
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
    const protos = (function() { try { return JSON.parse(ep.protocols || '{}'); } catch { return {}; } })();
    const models = (function() { try { return JSON.parse(ep.models || '[]'); } catch { return []; } })();

    let html = '<div class="card">' +
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
    '</div>';

    const protoKeys = Object.keys(protos).filter(function(k) { return protos[k]; });
    html += '<div class="card"><div class="caption-uppercase" style="margin-bottom:8px">已检测协议</div>' +
      '<div style="display:flex;gap:4px;flex-wrap:wrap">' +
      (protoKeys.map(function(k) {
        const labels = { openai_chat: 'OpenAI Chat', openai_responses: 'OpenAI Responses', anthropic: 'Anthropic' };
        return '<span class="badge badge-green">' + (labels[k] || k) + '</span>';
      }).join(' ') || '<span style="color:var(--muted);font-size:13px">暂无</span>') +
      '</div></div>';

    if (models.length > 0) {
      html += '<div class="card"><div class="caption-uppercase" style="margin-bottom:8px">模型 (' + models.length + ')</div>' +
        '<div class="models-grid">' + models.map(function(m) { return '<span class="model-chip available">' + escapeHtml(m) + '</span>'; }).join('') + '</div></div>';
    }

    html += '<div class="card"><div class="card-header"><span class="caption-uppercase">API Keys (' + keys.length + ')</span></div>' +
      '<div class="key-list">';
    for (const k of keys) {
      html += '<div class="key-row">' +
        '<div class="key-info">' +
          '<span class="key-alias">' + escapeHtml(k.alias || '未命名') + '</span>' +
          '<span class="key-masked" style="font-family:var(--font-mono);color:var(--muted);font-size:13px">' + escapeHtml(k.key_masked) + '</span>' +
          '<span class="key-status dot ' + (k.last_status ? 'dot-green' : 'dot-gray') + '"></span>' +
          '<span style="font-size:12px;color:var(--muted)">' + (k.last_checked_at ? formatTime(k.last_checked_at) : '未检测') + '</span>' +
        '</div>' +
        '<div class="key-actions">' +
          '<button class="btn btn-small" onclick="checkKey(\\'' + k.id + '\\')">检测</button>' +
          '<button class="btn btn-small" onclick="deleteKey(\\'' + k.id + '\\')">删除</button>' +
        '</div>' +
      '</div>';
    }
    html += '</div>' +
      '<div class="add-key-form">' +
        '<input type="password" id="newKeyValue" class="text-input" placeholder="新的 API Key" />' +
        '<input type="text" id="newKeyAlias" class="text-input" placeholder="别名（可选）" style="width:150px" />' +
        '<button class="btn btn-primary" onclick="addKey(\\'' + ep.id + '\\')">添加</button>' +
      '</div>' +
    '</div>';

    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = '<div class="error-panel">' + escapeHtml(e.message) + '</div>';
  }
}

async function updateEndpoint(id) {
  const name = document.getElementById('epName')?.value;
  const notes = document.getElementById('epNotes')?.value;
  const autoHealth = document.getElementById('epAutoHealth')?.checked ? 1 : 0;
  await API.put('/api/endpoints/' + id, { name: name, notes: notes, auto_health: autoHealth });
  alert('已保存');
}

async function redetectEndpoint(id) {
  await API.post('/api/endpoints/' + id + '/redetect');
  alert('重新检测完成');
  navigate('/app/endpoint/' + id);
}

async function deleteEndpoint(id) {
  if (!confirm('确定删除此接口及所有 Key？')) return;
  await API.del('/api/endpoints/' + id);
  navigate('/app');
}

async function addKey(endpointId) {
  const keyValue = document.getElementById('newKeyValue')?.value;
  const alias = document.getElementById('newKeyAlias')?.value;
  if (!keyValue) return alert('请输入 Key');
  await API.post('/api/endpoints/' + endpointId + '/keys', { key_value: keyValue, alias: alias });
  document.getElementById('newKeyValue').value = '';
  document.getElementById('newKeyAlias').value = '';
  await loadEndpointDetail(endpointId);
}

async function checkKey(keyId) {
  const data = await API.post('/api/keys/' + keyId + '/check');
  alert(data.is_alive ? '✅ 存活 (HTTP ' + data.status_code + ')' : '❌ 不可达');
  await loadEndpointDetail(location.pathname.split('/')[3]);
}

async function deleteKey(keyId) {
  if (!confirm('确定删除此 Key？')) return;
  await API.del('/api/keys/' + keyId);
  await loadEndpointDetail(location.pathname.split('/')[3]);
}

function renderHealthPage() {
  return '<div class="container">' +
    '<h2 class="display-sm" style="margin-bottom:24px">健康检测历史</h2>' +
    '<div class="card">' +
      '<div class="filters">' +
        '<input type="number" id="healthDays" class="text-input" value="7" style="width:100px" placeholder="天数" />' +
        '<button class="btn btn-primary" onclick="loadHealthPage()">刷新</button>' +
      '</div>' +
    '</div>' +
    '<div id="healthList"></div>' +
  '</div>';
}

async function loadHealthPage() {
  const el = document.getElementById('healthList');
  if (!el) return;
  const days = document.getElementById('healthDays')?.value || 7;
  el.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)">加载中...</div>';

  try {
    const data = await API.get('/api/health/history?days=' + days);
    const checks = data.checks || [];
    if (checks.length === 0) {
      el.innerHTML = '<div class="empty-state">暂无检测记录</div>';
      return;
    }
    let html = '<div class="card"><table class="health-table"><tr><th>时间</th><th>状态</th><th>URL</th><th>状态码</th><th>响应时间</th></tr>';
    for (const c of checks) {
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
      '<div class="caption-uppercase" style="margin-bottom:12px">用户管理</div>' +
      '<input type="text" id="adminSearch" class="text-input" placeholder="搜索用户..." oninput="loadAdminPage()" />' +
    '</div>' +
    '<div id="adminUserList"></div>' +
  '</div>';
}

async function loadAdminPage() {
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

async function deleteUser(userId) {
  await API.del('/api/admin/users/' + userId);
  await loadAdminPage();
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
  if (token) {
    await initApp();
    renderPage();
  } else if (location.pathname !== '/sso/callback') {
    const ssoUrl = 'https://auth.it0731.cn';
    const redirect = encodeURIComponent(location.origin + '/sso/callback');
    location.href = ssoUrl + '/login?redirect=' + redirect;
  }
});
`;

export function renderApp(user) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TokenHub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
  <nav class="top-nav">
    <div class="nav-inner">
      <a href="/" onclick="return navigate('/')" class="logo">TokenHub</a>
      <div class="nav-links" id="navLinks">
        <a href="/" onclick="return navigate('/')" data-nav>检测</a>
        <a href="/app" onclick="return navigate('/app')" data-nav>仪表盘</a>
        <a href="/app/health" onclick="return navigate('/app/health')" data-nav>健康</a>
        <a href="/app/admin" onclick="return navigate('/app/admin')" data-nav id="adminLink" style="display:none">管理</a>
      </div>
      <div class="nav-user" id="navUser">
      </div>
    </div>
  </nav>
  <main id="app"></main>
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
