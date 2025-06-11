import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { allSplits } from "./loader.js";

console.log("    [?] Converting document chunks to embeddings...\n"); // not sure ha term ate HAHAHAHSHAHSAHA
const embeddings = new OllamaEmbeddings();
export const vectorStore = await MemoryVectorStore.fromDocuments(
  allSplits,
  embeddings
);
