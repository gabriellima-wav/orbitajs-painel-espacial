import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function gerarConteudo(prompt: string) {
  const resposta = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return resposta.text;
}
