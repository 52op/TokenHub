import { CORS_HEADERS } from "./config.js";
import { corsResponse, jsonResponse, errorResponse } from "./utils.js";
import { requireUser, requireAdmin } from "./auth.js";
import { runDetection } from "./detect.js";
import * as detectRoute from "./routes/detect.js";
import * as endpointsRoute from "./routes/endpoints.js";
import * as keysRoute from "./routes/keys.js";
import * as healthRoute from "./routes/health.js";
import * as adminRoute from "./routes/admin.js";
import * as userRoute from "./routes/user.js";
import * as testRoute from "./routes/test.js";
import * as chatRoute from "./routes/chat.js";
import * as importRoute from "./routes/import.js";
import * as modelsRoute from "./routes/models.js";
import * as exportRoute from "./routes/export.js";
import { renderApp, renderSSOCallback } from "./frontend/html.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return corsResponse();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Frontend pages
    if (path === "/" || path.startsWith("/app")) {
      const user = await requireUser(request, env);
      const settingsRows = await env.DB.prepare("SELECT key, value FROM site_settings").all();
      const siteSettings = {};
      for (const row of settingsRows.results || []) siteSettings[row.key] = row.value;
      siteSettings._url = url.origin;
      return new Response(renderApp(user, siteSettings), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    // Sitemap
    if (path === "/sitemap.xml") {
      const host = url.origin;
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${host}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${host}/app</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
</urlset>`;
      return new Response(xml, { headers: { "Content-Type": "application/xml" } });
    }

    // Robots.txt
    if (path === "/robots.txt") {
      const txt = `User-agent: *\nAllow: /\nDisallow: /app\nDisallow: /api\nSitemap: ${url.origin}/sitemap.xml`;
      return new Response(txt, { headers: { "Content-Type": "text/plain" } });
    }

    // SSO callback
    if (path === "/sso/callback") {
      return new Response(renderSSOCallback(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    // API routes
    if (path === "/api/detect" && request.method === "POST") {
      return detectRoute.handle(request, env);
    }

    // Auth
    if (path === "/api/auth/me" && request.method === "GET") {
      return userRoute.handleMe(request, env);
    }
    if (path === "/api/auth/check" && request.method === "GET") {
      return userRoute.handleCheck(request, env);
    }
    if (path === "/api/auth/logout" && request.method === "GET") {
      return userRoute.handleLogout();
    }

    // Endpoints list/create
    if (path === "/api/endpoints" && request.method === "GET") {
      return endpointsRoute.handleList(request, env);
    }
    if (path === "/api/endpoints" && request.method === "POST") {
      return endpointsRoute.handleCreate(request, env);
    }

    // Single endpoint
    const endpointMatch = path.match(/^\/api\/endpoints\/([^/]+)$/);
    if (endpointMatch) {
      const id = endpointMatch[1];
      if (request.method === "GET") return endpointsRoute.handleGet(request, env, id);
      if (request.method === "PUT") return endpointsRoute.handleUpdate(request, env, id);
      if (request.method === "DELETE") return endpointsRoute.handleDelete(request, env, id);
    }

    // Redetect
    const redetectMatch = path.match(/^\/api\/endpoints\/([^/]+)\/redetect$/);
    if (redetectMatch && request.method === "POST") {
      return endpointsRoute.handleRedetect(request, env, redetectMatch[1]);
    }

    // Keys under endpoint
    const keysListMatch = path.match(/^\/api\/endpoints\/([^/]+)\/keys$/);
    if (keysListMatch) {
      const eid = keysListMatch[1];
      if (request.method === "GET") return keysRoute.handleList(request, env, eid);
      if (request.method === "POST") return keysRoute.handleCreate(request, env, eid);
    }

    // Single key
    const keyMatch = path.match(/^\/api\/keys\/([^/]+)$/);
    if (keyMatch) {
      const id = keyMatch[1];
      if (request.method === "GET") return keysRoute.handleGet(request, env, id);
      if (request.method === "PUT") return keysRoute.handleUpdate(request, env, id);
      if (request.method === "DELETE") return keysRoute.handleDelete(request, env, id);
    }

    // Key check
    const keyCheckMatch = path.match(/^\/api\/keys\/([^/]+)\/check$/);
    if (keyCheckMatch && request.method === "POST") {
      return keysRoute.handleCheck(request, env, keyCheckMatch[1]);
    }

    // Health
    if (path === "/api/health/check-all" && request.method === "POST") {
      return healthRoute.handleCheckAll(request, env);
    }
    if (path === "/api/health/history" && request.method === "GET") {
      return healthRoute.handleHistory(request, env);
    }

    // Admin
    if (path.startsWith("/api/admin/")) {
      return adminRoute.handle(request, env, path);
    }

    // Public site settings (for SEO/meta)
    if (path === "/api/settings" && request.method === "GET") {
      const settings = await env.DB.prepare("SELECT key, value FROM site_settings").all();
      const map = {};
      for (const row of settings.results || []) map[row.key] = row.value;
      return jsonResponse({ settings: map });
    }

    // Manual test
    if (path === "/api/test/endpoint" && request.method === "POST") {
      return testRoute.handleEndpointTest(request, env);
    }
    if (path === "/api/test/model" && request.method === "POST") {
      return testRoute.handleModelTest(request, env);
    }
    if (path === "/api/test/send" && request.method === "POST") {
      return testRoute.handleDirectSend(request, env);
    }

    // Chat
    if (path === "/api/chat" && request.method === "POST") {
      return chatRoute.handleChat(request, env);
    }

    // Import
    if (path === "/api/import/parse" && request.method === "POST") {
      return importRoute.handleParse(request, env);
    }
    if (path === "/api/import" && request.method === "POST") {
      return importRoute.handleImport(request, env);
    }

    // Models
    if (path === "/api/models" && request.method === "GET") {
      return modelsRoute.handleGetModels(request, env);
    }

    // Export
    if (path === "/api/export/9router" && request.method === "GET") {
      return exportRoute.handleExport9router(request, env);
    }

    return new Response("Not Found", { status: 404 });
  },

  async scheduled(event, env, ctx) {
    await healthRoute.handleCron(env);
  },
};
