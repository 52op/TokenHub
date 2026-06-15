import { runDetection, probeSinglePath } from "../detect.js";
import { jsonResponse, errorResponse } from "../utils.js";
import { requireUser } from "../auth.js";

export async function handle(request, env) {
  try {
    const body = await request.json();
    const { url, apiKey, path, model } = body;
    if (!url) return errorResponse("缺少 url 参数");

    const user = await requireUser(request, env);
    let result;
    if (path) {
      result = await probeSinglePath(url.trim(), apiKey?.trim() || "", path.trim(), model?.trim() || "");
    } else {
      result = await runDetection(url.trim(), apiKey?.trim() || "");
    }
    return jsonResponse(result);
  } catch (e) {
    return errorResponse(e.message, 500);
  }
}
