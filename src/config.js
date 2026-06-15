export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const PROBE_TABLE = [
  // Standard paths
  { test: "/v1/chat/completions",   base: "/v1", method: "POST", protocol: "openai_chat" },
  { test: "/v1/messages",           base: "/v1", method: "POST", protocol: "anthropic" },
  { test: "/v1/models",            base: "/v1", method: "GET",  protocol: null },
  // Root-level (no version prefix)
  { test: "/chat/completions",      base: "",    method: "POST", protocol: "openai_chat" },
  { test: "/messages",              base: "",    method: "POST", protocol: "anthropic" },
  { test: "/models",               base: "",    method: "GET",  protocol: null },
  // Provider subdirectory: /anthropic/v1/...
  { test: "/anthropic/v1/messages",            base: "/anthropic/v1", method: "POST", protocol: "anthropic" },
  { test: "/anthropic/v1/chat/completions",    base: "/anthropic/v1", method: "POST", protocol: "openai_chat" },
  { test: "/anthropic/messages",               base: "/anthropic",   method: "POST", protocol: "anthropic" },
  // OpenAI subdirectory
  { test: "/openai/v1/chat/completions", base: "/openai/v1", method: "POST", protocol: "openai_chat" },
  { test: "/openai/v1/messages",         base: "/openai/v1", method: "POST", protocol: "anthropic" },
  { test: "/openai/v1/models",          base: "/openai/v1", method: "GET",  protocol: null },
  { test: "/openai/v1/responses",       base: "/openai/v1", method: "POST", protocol: "openai_responses" },
  // Claude / DeepSeek
  { test: "/claude/v1/messages",             base: "/claude/v1", method: "POST", protocol: "anthropic" },
  { test: "/deepseek/v1/chat/completions",   base: "/deepseek/v1", method: "POST", protocol: "openai_chat" },
  // Common API gateways
  { test: "/api/v1/chat/completions",  base: "/api/v1", method: "POST", protocol: "openai_chat" },
  { test: "/api/v1/messages",         base: "/api/v1", method: "POST", protocol: "anthropic" },
  { test: "/api/chat/completions",    base: "/api",    method: "POST", protocol: "openai_chat" },
  { test: "/api/messages",            base: "/api",    method: "POST", protocol: "anthropic" },
  // Proxy gateway
  { test: "/proxy/v1/chat/completions", base: "/proxy/v1", method: "POST", protocol: "openai_chat" },
  { test: "/proxy/v1/messages",         base: "/proxy/v1", method: "POST", protocol: "anthropic" },
  // Other version prefixes
  { test: "/v2/chat/completions",      base: "/v2",     method: "POST", protocol: "openai_chat" },
  { test: "/v1beta/chat/completions",  base: "/v1beta", method: "POST", protocol: "openai_chat" },
];

export const PROBE_PAYLOADS = {
  openai_chat: {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 1,
    stream: false,
  },
  openai_responses: {
    model: "gpt-4o-mini",
    input: "hi",
    max_output_tokens: 1,
  },
  anthropic: {
    model: "claude-3-haiku-20240307",
    max_tokens: 1,
    messages: [{ role: "user", content: "hi" }],
  },
};

export const COMMON_MODELS = [
  "gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo",
  "o1", "o1-mini", "o3-mini", "o3",
  "claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5",
  "claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022",
  "claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307",
  "gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-pro", "gemini-1.5-flash",
  "deepseek-chat", "deepseek-coder", "deepseek-reasoner",
  "qwen-turbo", "qwen-plus", "qwen-max", "qwen-long",
  "mistral-large-latest", "mistral-medium-latest", "mistral-small-latest",
  "llama-3.3-70b-instruct", "llama-3.1-70b-instruct", "llama-3.1-8b-instruct",
  "moonshot-v1-8k", "moonshot-v1-32k",
  "yi-large", "yi-medium",
  "glm-4", "glm-4-flash",
];

export const PROTOCOL_LABELS = {
  openai_chat: "OpenAI Chat Completions",
  openai_responses: "OpenAI Responses API",
  anthropic: "Anthropic Messages",
};

export const PROTOCOL_COLORS = {
  openai_chat: { badge: "green", dot: "green" },
  openai_responses: { badge: "blue", dot: "blue" },
  anthropic: { badge: "purple", dot: "purple" },
};
