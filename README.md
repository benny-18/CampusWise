![CampusWise web](resources/images/campuswise-web.png)

# LNU CampusWise

![Status: Prototype](https://img.shields.io/badge/status-prototype-yellow)
![Version](https://img.shields.io/badge/version-v1.0-blue)
![License](https://img.shields.io/github/license/benny-18/CampusWise)

CampusWise is a lightweight web + Node.js prototype that provides a chatbot UI and a backend API designed to answer questions specifically from the Leyte Normal University (LNU) Undergraduate Student Handbook. It uses a vector-store + LLM chain pattern (via LangChain) to search handbook content and generate context-aware responses.

## 🔍 What this project does

- **Chat interface**: A responsive front-end UI for asking handbook-related questions ([web/html/chatbot.html](web/html/chatbot.html)).
- **Backend API**: An Express-based API that accepts queries and returns LLM responses built from retrieved handbook documents (`app/chatbot/server.js`).
- **Vector search + LLM**: Uses an embeddings-backed vector store and a LangChain-style document chain to provide context to the LLM.

## ✨ Why this is useful

- Focused answers from a single authoritative source (the LNU Undergraduate Student Handbook).
- Simple architecture that separates the UI and the API — easy to extend or replace components (LLM provider, vector store, frontend).

## 🔗 Quick links

- **Frontend**: [web/html/chatbot.html](web/html/chatbot.html)
- **Backend**: [app/chatbot/server.js](app/chatbot/server.js)

## 🧩 Project Structure

```
/
├── app/
│   └── chatbot/
│       ├── embeddings.js      ← embedding loader (OllamaEmbeddings + MemoryVectorStore)
│       ├── llms.js            ← ChatOllama model wrapper
│       ├── loader.js          ← document splitter loader
│       └── server.js          ← Express server with /chat endpoint
├── resources/                 ← images, icons
└── web/
    ├── html/                  ← chatbot.html, plus intro/login/register
    ├── css/                   ← chatbot.css and others
    └── js/                    ← chatbot.js (frontend logic)

```

## 🚀 Getting started

Notes: this repository contains a prototype implementation. The backend is a Node/Express app that expects a JavaScript runtime and certain dependencies (LangChain, an LLM connector like Ollama, and a vector store). The included `Dockerfile` and `docker-compose.yml`is present but may require edits before use (see note below) as they have not been finished yet, and was for experimentation purpose only.

Prerequisites

- Node.js 18+ and npm installed
- Ollama / any configured LLM service if you plan to run the LLM locally

## 🔧 Development Setup (Without Docker)

1. Install Node.js 22.x+
    
    ```bash
    npm install
    ```
    
2. Run Ollama and pull models:
    
    ```bash
    ollama pull llama3.2
    ollama pull mxbai-embed-large
    ollama serve
    ```
    
3. Launch the backend server:
    
    ```bash
    node app/chatbot/server.js
    ```
    
4. Serve frontend files:
    
    Use VSCode Live Server or serve via Express
    
5. Visit:
    
    ```
    http://localhost:3000 => backend API
    http://localhost:3001/web/html/chatbot.html => frontend chat
    ```

## 🧭 Usage examples

Call the API directly (example using `curl`):

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"query":"What are the undergraduate grading policies?"}'
```

The endpoint returns JSON in the form:

```json
{ "response": "...LLM answer based on handbook context..." }
```

## ❗ Notes & current limitations

- The backend redirects `/` to the local web UI: see `app/chatbot/server.js`.
- The project is a prototype: some build/dev automation and packaging are incomplete (see Dockerfile comment in Getting Started subheading).
- The LLM/provider configuration (Ollama or similar) and vector store population (embeddings/loader) must be configured before expecting relevant answers.

## 🧑‍💻 Credits

- **benny-18** – Development & design
- **hiyaranari** – Development & design
- **Leyte Normal University** – Handbook content

## 📄 License

This project is licensed under the terms in the `LICENSE` file.

