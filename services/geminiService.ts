import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is not set.");
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export function startChat(systemInstruction: string) {
  const model = genAI.chats;

  return model.create({
    model: "gemini-1.5-flash",
    config: {
      systemInstruction: systemInstruction,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    },
    history: [],
  });
}
