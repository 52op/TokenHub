import { getCookieValue, jsonResponse, errorResponse, md5 } from "./utils.js";

export async function verifyRS256JWT(token, publicKeyPem, issuer) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, sigB64] = parts;

    const pemBody = publicKeyPem
      .replace(/-----BEGIN PUBLIC KEY-----/g, "")
      .replace(/-----END PUBLIC KEY-----/g, "")
      .replace(/\s/g, "");
    const keyData = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      "spki", keyData,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false, ["verify"]
    );

    const sigBytes = Uint8Array.from(
      atob(sigB64.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );
    const encoder = new TextEncoder();
    const data = encoder.encode([headerB64, payloadB64].join("."));

    const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, sigBytes, data);
    if (!valid) return null;

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (issuer && payload.iss !== issuer) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function extractAndVerify(request, env) {
  if (env.AUTH_MODE !== "sso") return null;
  const publicKey = env.SSO_PUBLIC_KEY;
  if (!publicKey) return null;

  const auth = request.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) {
    return verifyRS256JWT(auth.slice(7), publicKey, env.SSO_ISSUER);
  }
  const cookieName = env.SSO_COOKIE || "_goauth_token";
  const cookieToken = getCookieValue(request, cookieName);
  if (cookieToken) {
    return verifyRS256JWT(cookieToken, publicKey, env.SSO_ISSUER);
  }
  return null;
}

export async function findOrCreateSSOUser(env, payload) {
  const email = payload.email;
  if (!email) return null;

  let user = await env.DB.prepare(
    "SELECT id, email, username, role, avatar_url FROM users WHERE email = ?"
  ).bind(email).first();
  if (user) {
    if (payload.role && user.role !== payload.role) {
      await env.DB.prepare("UPDATE users SET role = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(payload.role, user.id).run();
      user.role = payload.role;
    }
    if (payload.username && user.username !== payload.username) {
      await env.DB.prepare("UPDATE users SET username = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(payload.username, user.id).run();
    }
    if (!user.avatar_url && payload.email) {
      const fallback = `https://cn.cravatar.com/avatar/${md5(payload.email.trim().toLowerCase())}?s=80&d=monsterid`;
      await env.DB.prepare("UPDATE users SET avatar_url = ?, updated_at = datetime('now') WHERE id = ?")
        .bind(fallback, user.id).run();
      user.avatar_url = fallback;
    }
    return user;
  }

  const name = payload.username || email.split("@")[0];
  const userRole = payload.role === "admin" ? "admin" : "user";
  const avatar = payload.avatar_url || `https://cn.cravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=80&d=monsterid`;

  await env.DB.prepare(
    "INSERT INTO users (email, username, role, avatar_url) VALUES (?, ?, ?, ?)"
  ).bind(email, name, userRole, avatar).run();

  user = await env.DB.prepare(
    "SELECT id, email, username, role, avatar_url FROM users WHERE email = ?"
  ).bind(email).first();
  return user;
}

export async function requireUser(request, env) {
  const payload = await extractAndVerify(request, env);
  if (!payload) return null;
  return findOrCreateSSOUser(env, payload);
}

export async function requireAdmin(request, env) {
  const user = await requireUser(request, env);
  if (!user || user.role !== "admin") return null;
  return user;
}
