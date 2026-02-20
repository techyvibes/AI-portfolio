/**
 * Client-side API for the Netlify Gemini proxy.
 * All Gemini calls go through /.netlify/functions/gemini so the API key stays server-side.
 */

const FUNCTIONS_BASE = "/.netlify/functions";

async function postGemini<T>(payload: object): Promise<T> {
  const res = await fetch(`${FUNCTIONS_BASE}/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { error?: string }).error ?? `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

export async function generateImage(prompt: string, aspectRatio = "16:9"): Promise<string> {
  const data = await postGemini<{ image?: string; error?: string }>({
    action: "generateImage",
    prompt,
    aspectRatio,
  });
  if (data.error) throw new Error(data.error);
  if (!data.image) throw new Error("No image in response");
  return data.image;
}

export async function searchInsights(query: string): Promise<{ text: string; sources: { title: string; uri: string }[] }> {
  const data = await postGemini<{ text?: string; sources?: { title: string; uri: string }[]; error?: string }>({
    action: "search",
    query,
  });
  if (data.error) throw new Error(data.error);
  return {
    text: data.text ?? "No insights found.",
    sources: data.sources ?? [],
  };
}

export async function editImage(base64Image: string, prompt: string): Promise<string | null> {
  const data = await postGemini<{ image?: string; error?: string }>({
    action: "editImage",
    base64Image,
    prompt,
  });
  if (data.error) throw new Error(data.error);
  return data.image ?? null;
}
