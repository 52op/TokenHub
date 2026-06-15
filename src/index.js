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
      return new Response(renderApp(user), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
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

    return new Response("Not Found", { status: 404 });
  },

  async scheduled(event, env, ctx) {
    await healthRoute.handleCron(env);
  },
};
