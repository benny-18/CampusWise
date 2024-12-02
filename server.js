import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { vectorStore } from "./embeddings.js"; // Assuming you have a module for embeddings
import { ollamaLlm } from "./llms.js"; // Assuming you have a module for LLMs
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize RAG chain components
const prompt = PromptTemplate.fromTemplate(
  "You are CampusWise, an advanced AI assistant knowledgeable about the Leyte Normal University's Undergraduate Student Handbook. Answer based on their questions.: {question}\nContext: {context}\nAnswer:"
);

const chain = await createStuffDocumentsChain({
  llm: ollamaLlm,
  outputParser: new StringOutputParser(),
  prompt,
});

// Endpoint for Chat API
app.post("/chat", async (req, res) => {
  try {
    const userQuery = req.body.query;

    // Validate request body
    if (!userQuery) {
      return res.status(400).json({ error: "Query is required." });
    }

    // Get similar documents for the query
    const docs = await vectorStore.similaritySearch(userQuery);

    // Generate AI response using RAG chain
    const answer = await chain.invoke({
      question: userQuery,
      context: docs,
    });

    // Send response back to frontend
    res.json({ response: answer });
  } catch (error) {
    console.error("Error processing the query:", error.message);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
