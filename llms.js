import { ChatOllama } from "@langchain/ollama";

export const ollamaLlm = new ChatOllama({
  baseUrl: "http://localhost:11273", // Default value
  model: "llama3.2", // Default value
});
