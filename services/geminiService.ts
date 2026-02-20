import { editImage as editImageViaApi } from "./geminiApi";

export class GeminiService {
  async editImage(base64Image: string, prompt: string): Promise<string | null> {
    try {
      return await editImageViaApi(base64Image, prompt);
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
