import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { allSplits } from "./loader.js";

const embeddings = new OllamaEmbeddings();
export const vectorStore = await MemoryVectorStore.fromDocuments(
  allSplits,
  embeddings
);
