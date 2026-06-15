export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const BASE_SUFFIXES = [
  "/v1",
  "/api/v1",
  "/api",
  "/openai/v1",
  "/openai",
  "/v1beta",
  "/v2",
  "",
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
