
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

function getChatInstance(): Chat {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are Polyglot Pal, a friendly and helpful language-agnostic assistant. You can converse in any language the user chooses. Your responses should be helpful and accurate.',
      },
    });
  }
  return chat;
}

export async function getChatResponseStream(message: string): Promise<AsyncIterable<string>> {
  const chatInstance = getChatInstance();
  const result = await chatInstance.sendMessageStream({ message });

  const stream = (async function* () {
    for await (const chunk of result) {
      yield chunk.text;
    }
  })();

  return stream;
}
