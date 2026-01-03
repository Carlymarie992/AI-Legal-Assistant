
import { GoogleGenAI } from "@google/genai";

// We'll use 'any' for the chat session type for now as we don't have the exact type definition handy and it caused build errors.
// In a real scenario, we would inspect the library's d.ts file more closely.
let chatSession: any | null = null;

export const startChat = (systemInstruction: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set");
  }

  const genAI = new GoogleGenAI({ apiKey });
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction });

  chatSession = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  return chatSession;
};
