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
  if ([400, 401, 403, 404, 405, 422, 429].includes(status)) return true;
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

function md5cycle(x, k) {
  let a = x[0], b = x[1], c = x[2], d = x[3];
  const cm = (n, m) => (n + m) | 0, rl = (n, s) => (n << s) | (n >>> (32 - s));
  const f = (x, y, z) => (x & y) | (~x & z);
  const g = (x, y, z) => (x & z) | (y & ~z);
  const h = (x, y, z) => x ^ y ^ z;
  const i = (x, y, z) => y ^ (x | ~z);
  const ff = (a, b, c, d, x, s, ac) => rl(cm(cm(cm(a, f(b, c, d)), x), ac), s) + b | 0;
  const gg = (a, b, c, d, x, s, ac) => rl(cm(cm(cm(a, g(b, c, d)), x), ac), s) + b | 0;
  const hh = (a, b, c, d, x, s, ac) => rl(cm(cm(cm(a, h(b, c, d)), x), ac), s) + b | 0;
  const ii = (a, b, c, d, x, s, ac) => rl(cm(cm(cm(a, i(b, c, d)), x), ac), s) + b | 0;
  a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
  a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
  a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
  a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
  x[0] = cm(a, x[0]); x[1] = cm(b, x[1]); x[2] = cm(c, x[2]); x[3] = cm(d, x[3]);
}

export function md5(s) {
  const n = s.length;
  const m = [];
  for (let i = 0; i < n; i++) m[i >> 2] |= (s.charCodeAt(i) & 0xff) << ((i % 4) * 8);
  const bits = n * 8;
  m[n >> 2] |= 0x80 << ((n % 4) * 8);
  m[(((n + 8) >> 6) << 4) + 14] = bits & 0xffffffff;
  m[(((n + 8) >> 6) << 4) + 15] = (bits >>> 32) & 0xffffffff;
  let h = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
  for (let i = 0; i < m.length; i += 16) {
    const w = m.slice(i, i + 16);
    const a = [h[0], h[1], h[2], h[3]];
    md5cycle(a, w);
    h[0] = (h[0] + a[0]) | 0; h[1] = (h[1] + a[1]) | 0; h[2] = (h[2] + a[2]) | 0; h[3] = (h[3] + a[3]) | 0;
  }
  let hex = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const byte = (h[i] >>> (j * 8)) & 0xff;
      hex += ('0' + byte.toString(16)).slice(-2);
    }
  }
  return hex;
}

var CF_URL_RE = /\/client\/v4\/accounts\/([^/]+)\/ai/;

export function isCloudflareUrl(url) {
  return CF_URL_RE.test(url);
}

export function extractAccountId(url) {
  var m = url.match(CF_URL_RE);
  return m ? m[1] : null;
}

export async function fetchCloudflareModels(baseUrl, apiKey) {
  var accountId = extractAccountId(baseUrl);
  if (!accountId) return null;
  var searchUrl = "https://api.cloudflare.com/client/v4/accounts/" + accountId + "/ai/models/search?per_page=100";
  var headers = { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" };
  try {
    var resp = await fetchWithTimeout(searchUrl, { method: "GET", headers }, 10000);
    if (!resp.ok) return null;
    var data = await resp.json();
    if (data.success && Array.isArray(data.result)) {
      var models = data.result.map(function(m) { return m.name || ""; }).filter(Boolean);
      return models.length > 0 ? models : null;
    }
    return null;
  } catch {
    return null;
  }
}
