import { CORS_HEADERS } from "./config.js";

export function normalizeUrl(url) {
  return url.replace(/\/+$/, "");
}

export function buildHeaders(apiKey, protocol) {
  const headers = { "Content-Type": "application/json" };
  if (!apiKey) return headers;
  if (protocol === "anthropic") {
    headers["x-api-key"] = apiKey;
    headers["anthropic-version"] = "2023-06-01";
  } else {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  return headers;
}

export async function fetchWithTimeout(url, options, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return resp;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

export function isEndpointAlive(status) {
  if (status >= 200 && status < 300) return true;
  if ([400, 401, 403, 405, 422, 429].includes(status)) return true;
  return false;
}

export function isApiResponse(status, bodyText, contentType) {
  if (contentType && !contentType.includes("application/json") && !contentType.includes("text/plain")) {
    if (contentType.includes("text/html") && status === 200) return false;
  }
  if (bodyText.trimStart().startsWith("{") || bodyText.trimStart().startsWith("[")) return true;
  if ([401, 403, 429].includes(status)) return true;
  return false;
}

export function getCookieValue(request, name) {
  const cookie = request.headers.get("Cookie");
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function maskKey(key) {
  if (!key || key.length < 8) return "***";
  return key.slice(0, 3) + "..." + key.slice(-4);
}

export function corsResponse() {
  return new Response(null, { headers: CORS_HEADERS });
}

export function jsonResponse(data, status = 200) {
  return Response.json(data, { status, headers: CORS_HEADERS });
}

export function errorResponse(message, status = 400) {
  return Response.json({ error: message }, { status, headers: CORS_HEADERS });
}
