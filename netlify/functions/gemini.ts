import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

const handler: Handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (!apiKey) {
    return jsonResponse({ error: "API key not configured. Set GEMINI_API_KEY or API_KEY in Netlify environment variables." }, 500);
  }

  let body: { action?: string; prompt?: string; query?: string; base64Image?: string; aspectRatio?: string };
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const { action } = body;
  if (!action) {
    return jsonResponse({ error: "Missing 'action' in body. Use: ping, generateImage, search, or editImage." }, 400);
  }

  // Diagnostic: no Gemini call, just confirm function + env
  if (action === "ping") {
    return jsonResponse({
      ok: true,
      keyConfigured: !!apiKey,
      message: apiKey ? "Function and API key are configured." : "Function works but GEMINI_API_KEY / API_KEY is missing in Netlify.",
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    if (action === "generateImage") {
      const { prompt, aspectRatio = "16:9" } = body;
      if (!prompt) return jsonResponse({ error: "Missing 'prompt' for generateImage" }, 400);
      const fullPrompt = `A vibrant, clean Google-style vector illustration or 3D render of a futuristic technology concept representing: ${prompt}. Professional, optimistic, bright colors, minimalist aesthetic.`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: [{ text: fullPrompt }] },
        config: { imageConfig: { aspectRatio } },
      });
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return jsonResponse({ image: `data:image/png;base64,${part.inlineData.data}` });
        }
      }
      return jsonResponse({ error: "No image in response" }, 502);
    }

    if (action === "search") {
      const { query } = body;
      if (!query) return jsonResponse({ error: "Missing 'query' for search" }, 400);
      // Plain generateContent only (no googleSearch tool) — free tier, no billable grounding.
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Provide a concise, professional summary answering the following question. Focus on technical accuracy suitable for a TPM audience. Query: ${query}`,
      });
      const text = response.text ?? "No insights found.";
      return jsonResponse({ text, sources: [] });
    }

    if (action === "editImage") {
      const { base64Image, prompt } = body;
      if (!base64Image || !prompt) return jsonResponse({ error: "Missing 'base64Image' or 'prompt' for editImage" }, 400);
      const cleanBase64 = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            { inlineData: { data: cleanBase64, mimeType: "image/png" } },
            { text: prompt },
          ],
        },
      });
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return jsonResponse({ image: `data:image/png;base64,${part.inlineData.data}` });
        }
      }
      return jsonResponse({ error: "No image in response" }, 502);
    }

    return jsonResponse({ error: `Unknown action: ${action}` }, 400);
  } catch (err: unknown) {
    let message = "Gemini request failed";
    if (err instanceof Error) {
      message = err.message;
      // Unwrap common Google API error shapes
      const anyErr = err as { status?: number; statusMessage?: string; code?: number; details?: string };
      if (anyErr.status) message = `${message} (HTTP ${anyErr.status})`;
      if (anyErr.statusMessage) message = `${message} - ${anyErr.statusMessage}`;
    }
    console.error("Gemini proxy error:", err);
    return jsonResponse({ error: message }, 502);
  }
};

export default handler;
