# Let Me Ask: AI-Powered Live Audio Q&A Platform

## 💡 About the Project

Let Me Ask is a proof of concept (POC) for a full-stack app that lets users record live audio (like from live streams), upload it, and have it transcribed and processed with AI.

The platform leverages vector databases to provide accurate and context-aware answers to questions about the recorded content, by combining transcription, embeddings, and semantic search.

This was developed during the NLW Agents workshop, hosted by Rocketseat 💜.

### Main Features

- **Live Audio Recording:** Users can record audio directly from their browser and upload it for processing.
- **Automatic Transcription:** Uploaded audio is transcribed to text using the Google Gemini API.
- **Semantic Search with Embeddings:** Transcriptions are converted into vector embeddings and stored in a PostgreSQL database with vector support.
- **AI-Powered Q&A:** Users can ask questions about the recorded content. The system retrieves relevant audio chunks using vector similarity and generates answers using Gemini.
- **Room-Based Organization:** Users can create rooms to organize different sessions or topics, each with its own set of audio and questions.
- **Real-Time Frontend:** The React-based frontend provides a seamless experience for recording, uploading, and interacting with AI-generated answers.

## 🚀 Technologies

### Backend

- **Node.js** with **Fastify** for high-performance APIs
- **PostgreSQL** with vector extension for efficient embedding storage and similarity search
- **Drizzle ORM** for type-safe database access and migrations
- **Google Gemini API** for transcription, embeddings, and answer generation
- **Zod** for schema validation
- **Docker** for easy local development and database setup

### Frontend

- **React** (with Vite) for a fast, modern UI
- **React Query** for efficient data fetching and caching
- **React Hook Form** and **Zod** for robust form handling and validation
- **Tailwind CSS** for rapid UI development

### Technical Challenges

- Integrating real-time audio recording and chunked uploads in the browser
- Handling large audio files and splitting them for efficient processing
- Generating and storing high-dimensional embeddings in PostgreSQL
- Performing fast, accurate semantic search using vector similarity
- Orchestrating multiple AI tasks (transcription, embedding, Q&A) with the Gemini API
- Ensuring a smooth developer experience with type safety and modern tooling

## 🤔 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for running PostgreSQL with vector extension)
- [Google Gemini API Key](https://ai.google.dev/gemini-api/docs/api-key)

### Setup

#### 1. Clone the repository

```sh
git clone git@github.com:bonizario/let-me-ask.git

cd let-me-ask
```

#### 2. Start the database

```sh
cd server

docker compose up -d
```

This will start a PostgreSQL instance with vector support.

#### 3. Configure Environment Variables

Create a `.env` file in the `server` directory

```dotenv
GEMINI_API_KEY="your_google_gemini_api_key"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agents"
PORT="3333"
```

#### 4. Install Dependencies

Install the `pnpm` package manager if you haven't already:

```sh
npm install -g pnpm@latest
```

Then, install the project dependencies on both `server` and `web` directories:

```sh
pnpm install
```

#### 5. Run Database Migrations and Seed

```sh
cd server
pnpm db:migrate
pnpm db:seed
```

#### 6. Start the Backend

```sh
pnpm dev
```

#### 7. Start the Frontend

```sh
pnpm dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) and the API at [http://localhost:3333](http://localhost:3333).

## 👋 Get in touch

Feel free to reach out if you have any questions, suggestions, or just want to chat about the project!

My LinkedIn: [https://www.linkedin.com/in/gabriel-bonizario](https://www.linkedin.com/in/gabriel-bonizario)
