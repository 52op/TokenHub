import CSS from './style.css';
import APP_JS from './app.txt';

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
      <button id="themeToggle" onclick="toggleTheme()" style="background:none;border:none;cursor:pointer;font-size:18px;padding:4px 8px;margin-right:8px" title="切换暗色模式">☀️</button>
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

