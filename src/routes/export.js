import { jsonResponse, errorResponse } from "../utils.js";
import { requireUser } from "../auth.js";

function generateUUID() {
  const hex = '0123456789abcdef';
  let uuid = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) { uuid += '-'; }
    else if (i === 14) { uuid += '4'; }
    else if (i === 19) { uuid += hex[(Math.random() * 4 | 0) + 8]; }
    else { uuid += hex[Math.random() * 16 | 0]; }
  }
  return uuid;
}

function protocolToProviderType(protocol) {
  if (protocol === 'anthropic') return 'anthropic-compatible';
  return 'openai-compatible';
}

function protocolToProviderId(protocol) {
  if (protocol === 'anthropic') return 'anthropic-compatible';
  if (protocol === 'openai_responses') return 'openai-compatible-responses';
  return 'openai-compatible-chat';
}

function protocolToApiType(protocol) {
  return protocol === 'openai_responses' ? 'responses' : 'chat';
}

function safeJsonParse(str, fallback) {
  try { const v = JSON.parse(str); return v; } catch { return fallback; }
}

function groupKeysByEndpoint(endpoints, keys) {
  const keyMap = {};
  for (const k of keys.results || []) {
    if (!k.key_value) continue;
    if (!keyMap[k.endpoint_id]) keyMap[k.endpoint_id] = [];
    keyMap[k.endpoint_id].push(k);
  }
  return keyMap;
}

function generatePrefix(name, usedPrefixes) {
  let base = '';
  const clean = (name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (/^[a-z]/.test(clean)) base = clean.slice(0, 3);
  if (!base || base.length < 2) base = 'ep' + (clean.slice(0, 1) || 'x');
  let prefix = base;
  let counter = 1;
  while (usedPrefixes.has(prefix)) {
    prefix = base + counter;
    counter++;
  }
  usedPrefixes.add(prefix);
  return prefix;
}

export async function handleExport9router(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const eps = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? ORDER BY name"
  ).bind(user.id).all();

  const allEps = eps.results || [];
  const ids = allEps.map(e => e.id);
  if (ids.length === 0) {
    return jsonResponse({
      settings: { fallbackStrategy: "round-robin", comboStrategy: "round-robin", requireApiKey: true, stickyRoundRobinLimit: 5 },
      providerConnections: [], providerNodes: [], proxyPools: [], apiKeys: [], combos: [],
      modelAliases: {}, customModels: [], mitmAlias: {}, pricing: {}
    });
  }

  const placeholders = ids.map(() => "?").join(",");
  const keys = await env.DB.prepare(
    `SELECT * FROM api_keys WHERE endpoint_id IN (${placeholders}) ORDER BY created_at`
  ).bind(...ids).all();

  const keyMap = groupKeysByEndpoint(eps, keys);
  const connections = [];
  const providerNodes = [];
  const modelAliasesMap = {};
  const providerStrategies = {};
  const usedPrefixes = new Set();
  const now = new Date().toISOString();

  // Group endpoints by URL+protocol to create providerNodes
  const nodeMap = {};

  for (const ep of allEps) {
    const keyList = keyMap[ep.id] || [];
    if (keyList.length === 0) continue;

    const protos = safeJsonParse(ep.protocols, {});
    const firstProto = Object.keys(protos).find(k => protos[k]) || 'openai_chat';
    const providerIdBase = protocolToProviderId(firstProto);
    const providerType = protocolToProviderType(firstProto);
    const apiType = protocolToApiType(firstProto);
    const models = safeJsonParse(ep.models, []);

    // Create or reuse providerNode per unique URL+protocol combination
    const nodeKey = providerIdBase + '|' + ep.url;
    if (!nodeMap[nodeKey]) {
      const nodeId = providerIdBase + '-' + generateUUID();
      const prefix = generatePrefix(ep.name, usedPrefixes);
      providerNodes.push({
        prefix: prefix,
        apiType: apiType,
        baseUrl: ep.url,
        id: nodeId,
        type: providerType,
        name: ep.name || ep.url,
        createdAt: ep.created_at ? new Date(ep.created_at + (ep.created_at.endsWith('Z') || ep.created_at.includes('T') ? '' : 'Z')).toISOString() : now,
        updatedAt: ep.updated_at ? new Date(ep.updated_at + (ep.updated_at.endsWith('Z') || ep.updated_at.includes('T') ? '' : 'Z')).toISOString() : now,
      });
      nodeMap[nodeKey] = { nodeId, prefix };
      providerStrategies[nodeId] = { fallbackStrategy: "round-robin", stickyRoundRobinLimit: 3 };
    }
    const { nodeId, prefix } = nodeMap[nodeKey];

    // Build modelAliases as Map: alias -> "providerNodeId/model"
    for (const m of models) {
      if (m && !modelAliasesMap[m]) {
        modelAliasesMap[m] = nodeId + '/' + m;
      }
    }

    // Build connections with full field set matching 9router native backup format
    for (let ki = 0; ki < keyList.length; ki++) {
      const k = keyList[ki];
      const suffix = keyList.length > 1 ? (' #' + (ki + 1)) : '';
      const conn = {
        defaultModel: models.length > 0 ? models[0] : '',
        apiKey: k.key_value,
        testStatus: k.is_active === 1 ? 'active' : '',
        providerSpecificData: {
          prefix: prefix,
          apiType: apiType,
          baseUrl: ep.url,
          nodeName: ep.name || ep.url,
          connectionProxyEnabled: false,
          connectionProxyUrl: '',
          connectionNoProxy: '',
        },
        id: generateUUID(),
        provider: nodeId,
        authType: 'apikey',
        name: (ep.name || ep.url) + suffix,
        email: null,
        priority: ki + 1,
        isActive: k.is_active === 1,
        createdAt: k.created_at ? new Date(k.created_at + (k.created_at.endsWith('Z') || k.created_at.includes('T') ? '' : 'Z')).toISOString() : now,
        updatedAt: now,
      };
      connections.push(conn);
    }
  }

  const settings = {
    providerStrategies,
    fallbackStrategy: 'round-robin',
    comboStrategy: 'round-robin',
    comboStrategies: {},
    requireApiKey: true,
    comboStickyRoundRobinLimit: 5,
    rtkEnabled: true,
    stickyRoundRobinLimit: 5,
    requireLogin: true,
  };

  return jsonResponse({
    settings,
    providerConnections: connections,
    providerNodes,
    proxyPools: [],
    apiKeys: [],
    combos: [],
    modelAliases: modelAliasesMap,
    customModels: [],
    mitmAlias: {},
    pricing: {},
  });
}

export async function handleExportCCSwitchData(request, env) {
  const user = await requireUser(request, env);
  if (!user) return errorResponse("未登录", 401);

  const eps = await env.DB.prepare(
    "SELECT * FROM endpoints WHERE user_id = ? ORDER BY name"
  ).bind(user.id).all();

  const ids = (eps.results || []).map(e => e.id);
  if (ids.length === 0) return jsonResponse({ endpoints: [] });

  const placeholders = ids.map(() => "?").join(",");
  const keys = await env.DB.prepare(
    `SELECT * FROM api_keys WHERE endpoint_id IN (${placeholders}) ORDER BY created_at`
  ).bind(...ids).all();

  const keyMap = groupKeysByEndpoint(eps, keys);
  const result = [];

  for (const ep of (eps.results || [])) {
    const keyList = keyMap[ep.id] || [];
    if (keyList.length === 0) continue;

    result.push({
      name: ep.name || ep.url,
      url: ep.url,
      protocols: safeJsonParse(ep.protocols, {}),
      models: safeJsonParse(ep.models, []),
      keys: keyList.map(k => ({ key_value: k.key_value, is_active: k.is_active, alias: k.alias || '' })),
      created_at: ep.created_at,
    });
  }

  return jsonResponse({ endpoints: result });
}
