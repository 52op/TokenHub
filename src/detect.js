import { PROBE_TABLE, PROBE_PAYLOADS, COMMON_MODELS } from "./config.js";
import { normalizeUrl, buildHeaders, fetchWithTimeout, isEndpointAlive, isApiResponse } from "./utils.js";

export async function discoverBaseUrls(inputUrl, apiKey) {
  const base = normalizeUrl(inputUrl);
  const resultsMap = new Map();

  const probes = PROBE_TABLE.map(function(probe) {
    const testUrl = base + probe.test;
    const inferredBase = base + probe.base;

    return (async function() {
      try {
        let headers = { "Content-Type": "application/json" };
        let body = null;

        if (probe.protocol) {
          const payload = PROBE_PAYLOADS[probe.protocol];
          if (payload) {
            body = JSON.stringify(payload);
            headers = buildHeaders(apiKey, probe.protocol === "anthropic" ? "anthropic" : "openai");
          }
        }

        const resp = await fetchWithTimeout(testUrl, { method: probe.method, headers, body }, 5000);

        if (isEndpointAlive(resp.status)) {
          resultsMap.set(inferredBase, {
            base: inferredBase,
            status: resp.status,
            probeUrl: testUrl,
          });
        }
      } catch {
        // skip failed probes
      }
    })();
  });

  await Promise.allSettled(probes);
  return [...resultsMap.values()];
}

export async function detectProtocols(base, apiKey) {
  const probes = {
    openai_chat: {
      url: base + "/chat/completions",
      payload: PROBE_PAYLOADS.openai_chat,
      headers: buildHeaders(apiKey, "openai"),
    },
    openai_responses: {
      url: base + "/responses",
      payload: PROBE_PAYLOADS.openai_responses,
      headers: buildHeaders(apiKey, "openai"),
    },
    anthropic: {
      url: base + "/messages",
      payload: PROBE_PAYLOADS.anthropic,
      headers: buildHeaders(apiKey, "anthropic"),
    },
  };

  const protocols = {};
  const tasks = Object.entries(probes).map(async function([name, cfg]) {
    const entry = { supported: false, url: cfg.url, status: 0, responseTime: 0, error: null };
    const start = Date.now();
    try {
      const resp = await fetchWithTimeout(cfg.url, {
        method: "POST",
        headers: cfg.headers,
        body: JSON.stringify(cfg.payload),
      }, 8000);
      entry.status = resp.status;
      entry.responseTime = Date.now() - start;
      const bodyText = await resp.text();
      const ct = resp.headers.get("content-type") || "";

      if (resp.status === 405) {
        entry.supported = true;
      } else if (isEndpointAlive(resp.status) && isApiResponse(resp.status, bodyText, ct)) {
        if (name === "openai_chat") {
          entry.supported = bodyText.includes('"object"') || resp.status === 400;
        } else if (name === "openai_responses") {
          entry.supported = bodyText.includes('"object"') || resp.status === 400;
        } else if (name === "anthropic") {
          entry.supported = resp.status === 400 || resp.status === 401 || resp.status === 403 || bodyText.includes('"type"');
        }
      }
    } catch (e) {
      entry.error = e.message || "timeout";
      entry.responseTime = Date.now() - start;
    }
    protocols[name] = entry;
  });

  await Promise.allSettled(tasks);
  return protocols;
}

export async function detectModels(base, apiKey, protocols) {
  const result = { fromApi: false, models: [] };

  const modelsUrl = base + "/models";
  const headers = buildHeaders(apiKey, "openai");

  try {
    const resp = await fetchWithTimeout(modelsUrl, { method: "GET", headers }, 5000);
    if (resp.ok) {
      const data = await resp.json();
      const list = data.data || data.models || [];
      if (list.length > 0) {
        result.fromApi = true;
        result.models = list.map((m) => (typeof m === "string" ? { id: m } : m));
        return result;
      }
    }
  } catch {
  }

  for (const [proto, info] of Object.entries(protocols)) {
    if (!info.supported) continue;
    const probeUrl = base + "/chat/completions";
    const probeHeaders = buildHeaders(apiKey, proto === "anthropic" ? "anthropic" : "openai");
    const batchSize = 4;
    let batchCount = 0;
    for (let i = 0; i < COMMON_MODELS.length && batchCount < 1; i += batchSize) {
      batchCount++;
      const batch = COMMON_MODELS.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(
        batch.map(async (model) => {
          const payload = proto === "anthropic"
            ? { model, max_tokens: 1, messages: [{ role: "user", content: "hi" }] }
            : { model, messages: [{ role: "user", content: "hi" }], max_tokens: 1, stream: false };
          try {
            const resp = await fetchWithTimeout(probeUrl, {
              method: "POST",
              headers: probeHeaders,
              body: JSON.stringify(payload),
            });
            if (resp.ok || resp.status === 400 || resp.status === 401 || resp.status === 429) {
              return { id: model, supported: true };
            }
            return { id: model, supported: false };
          } catch {
            return { id: model, supported: false };
          }
        })
      );
      for (const r of batchResults) {
        if (r.status === "fulfilled") {
          result.models.push(r.value);
        }
      }
    }
    break;
  }

  return result;
}

export async function probeSinglePath(inputUrl, apiKey, customPath, modelId) {
  const base = normalizeUrl(inputUrl);
  const path = customPath.startsWith("/") ? customPath : "/" + customPath;
  const fullUrl = base.replace(/\/+$/, "") + path;

  let protocol = "openai_chat";
  if (path.includes("/messages")) protocol = "anthropic";
  else if (path.includes("/responses")) protocol = "openai_responses";

  const headers = buildHeaders(apiKey || "", protocol === "anthropic" ? "anthropic" : "openai");

  const start = Date.now();
  try {
    const probePayload = PROBE_PAYLOADS[protocol] || { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }], max_tokens: 1 };
    const resp = await fetchWithTimeout(fullUrl, { method: "POST", headers, body: JSON.stringify(probePayload) }, 10000);
    const bodyText = await resp.text();
    const responseTime = Date.now() - start;
    const ok = resp.ok || resp.status === 405 || resp.status === 400;

    const protocolInfo = {};
    protocolInfo[protocol] = { supported: ok, url: fullUrl, status: resp.status, responseTime, error: null };

    let models = null;
    if (ok) models = await detectModels(base, apiKey || "", protocolInfo);

    let modelVerified = null;
    if (modelId && ok) {
      const verifyPayload = protocol === "anthropic"
        ? { model: modelId, max_tokens: 1, messages: [{ role: "user", content: "hi" }] }
        : { model: modelId, messages: [{ role: "user", content: "hi" }], max_tokens: 1, stream: false };
      try {
        const vresp = await fetchWithTimeout(fullUrl, { method: "POST", headers, body: JSON.stringify(verifyPayload) }, 10000);
        modelVerified = { status: vresp.status, ok: vresp.ok || vresp.status === 400 };
      } catch {}
    }

    return {
      success: ok,
      mode: "probe",
      recommendedBase: base,
      allBases: [{ base, status: resp.status, protocols: protocolInfo, models, modelVerified }],
    };
  } catch (e) {
    return { success: false, mode: "probe", error: e.message || "连接失败", allBases: [] };
  }
}

export async function runDetection(inputUrl, apiKey) {
  const discovered = await discoverBaseUrls(inputUrl, apiKey);

  if (discovered.length === 0) {
    return { success: false, error: "未发现有效 API 端点", allBases: [] };
  }

  // Sort by path priority: longer+common paths first
  const PATH_PRIORITY = { "/api/v1": 100, "/v1": 80, "": 60, "/openai/v1": 50, "/api": 40, "/anthropic/v1": 30, "/proxy/v1": 20 };
  discovered.sort(function(a, b) {
    const pa = PATH_PRIORITY[a.base.replace(/^https?:\/\/[^\/]+/, "")] || 0;
    const pb = PATH_PRIORITY[b.base.replace(/^https?:\/\/[^\/]+/, "")] || 0;
    return pb - pa || a.status - b.status;
  });

  const allBases = [];
  let recommendedBase = discovered[0].base;
  let foundSupported = false;

  for (let idx = 0; idx < discovered.length; idx++) {
    const d = discovered[idx];
    let protocols = null;
    let models = null;

    if (!foundSupported) {
      protocols = await detectProtocols(d.base, apiKey);
      const supported = Object.values(protocols).some((p) => p.supported);
      if (supported) {
        foundSupported = true;
        recommendedBase = d.base;
        models = await detectModels(d.base, apiKey, protocols);
      }
    }

    if (!protocols) {
      protocols = {
        openai_chat: { supported: false, url: d.base + "/chat/completions", status: d.status, responseTime: 0, error: null },
        openai_responses: { supported: false, url: d.base + "/responses", status: d.status, responseTime: 0, error: null },
        anthropic: { supported: false, url: d.base + "/messages", status: d.status, responseTime: 0, error: null },
      };
    }

    allBases.push({ base: d.base, status: d.status, protocols, models });
  }

  return {
    success: foundSupported,
    recommendedBase,
    warning: foundSupported ? undefined : "发现端点但未检测到支持的协议",
    allBases,
  };
}
