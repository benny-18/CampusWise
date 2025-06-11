import { ChatOllama } from "@langchain/ollama";

console.log("    [?] Establishing connection to Ollama local server...\n");
export const ollamaLlm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
});
