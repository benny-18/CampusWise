import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { vectorStore } from "./embeddings.js";
import { ollamaLlm } from "./llms.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const prompt = PromptTemplate.fromTemplate(
  "You are CampusWise, an advanced AI assistant highly knowledgeable about the Leyte Normal University Undergraduate Student Handbook. IMPORTANT: You are prohibited to respond to any questions that are not related to the LNU Undergraduate Student Handbook. Answering out of context, such as with a general response or inappropriate responses, can be construed as spamming and may result in legal action from Leyte Normal University. Always respond in sentences and avoid providing responses in bullet form. Answer based on their question: {question}\nContext: {context}\nAnswer:"
);

console.log("    [?] Creating document chain for the LLM...\n");

const chain = await createStuffDocumentsChain({
  llm: ollamaLlm,
  outputParser: new StringOutputParser(),
  prompt,
});

console.log("    [?] Creating new server for API backend...\n");

app.post("/chat", async (req, res) => {
  try {
    const userQuery = req.body.query;

    if (!userQuery) {
      return res.status(400).json({ error: "Query is required." });
    }

    const docs = await vectorStore.similaritySearch(userQuery);

    const answer = await chain.invoke({
      question: userQuery,
      context: docs,
    });
    res.json({ response: answer });
  } catch (error) {
    console.error("Error processing the query:", error.message);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

app.listen(PORT, () => {
  console.log(`    [?] Server is running on http://localhost:${PORT}`);
  console.log("        Press Ctrl+C to stop server...\n");
});
