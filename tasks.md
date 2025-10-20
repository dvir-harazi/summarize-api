# MVP Development Tasks

This document outlines the minimal tasks required to complete the MVP (Minimum Viable Product) of the AI Summarization Proxy API.

## Project Goal
Build an HTTP endpoint that accepts text and returns a structured JSON summary with title, key points, sentiment, and keywords.

## Success Criteria
- Latency ≤ 5s for ≤ 10k tokens input
- Summary must only reflect source text (no hallucinations)
- Output matches JSON schema 100% of the time

---

## Task Checklist

### 1. Project Setup & Configuration
- [x] Initialize Node.js project with `package.json`
- [x] Install core dependencies (TypeScript, Express.js, Hugging Face SDK, Zod)
- [x] Configure TypeScript (`tsconfig.json`)
- [x] Set up environment variables (`.env` file with Hugging Face API token)
- [x] Create basic project folder structure (`src/`, `routes/`, `services/`, `types/`)

### 2. Define API Contract
- [x] Define request schema (text input)
- [x] Define response schema (title, summary, keywords, sentiment)
- [x] Define error response structure
- [x] Document API endpoint: `POST /api/summarize`

### 3. Implement Express Server
- [x] Create Express server with basic middleware (CORS, Helmet, JSON parser)
- [x] Set up health check endpoint (`GET /health`)
- [x] Configure port and basic error handling

### 4. Build Summarization Service
- [x] Create service module for LLM integration
- [x] Implement Hugging Face API client setup
- [x] Design prompt for text summarization (title, summary, keywords, sentiment)
- [x] Add token counting for input validation (≤ 10k tokens)

### 5. Create API Route & Controller
- [x] Create `/api/summarize` POST endpoint
- [x] Implement request validation using Zod
- [x] Connect controller to summarization service
- [x] Return structured JSON response

### 6. Add Error Handling
- [ ] Handle invalid input errors (400)
- [ ] Handle LLM API errors (502/503)
- [ ] Handle token limit exceeded (413)
- [ ] Add generic error handler middleware

### 7. Dockerize Application
- [ ] Create `Dockerfile` for Node.js/TypeScript app
- [ ] Create `docker-compose.yml` for development
- [ ] Add `.dockerignore` file
- [ ] Test Docker build and run

### 8. Create API Documentation
- [ ] Generate Postman collection JSON file
- [ ] Document request/response examples
- [ ] Include error response examples

### 9. Test & Validate
- [ ] Test endpoint with sample text inputs
- [ ] Verify response matches schema
- [ ] Verify latency requirements (≤ 5s)
- [ ] Test error handling scenarios

### 10. Iterate & Refine Prompt
- [ ] Test with various text types
- [ ] Refine LLM prompt if summaries are too long/short
- [ ] Ensure no hallucinations (factual accuracy)
- [ ] Validate JSON structure consistency

---

## Out of Scope (MVP)
The following features are NOT included in the MVP and will be added in future iterations:
- Authentication & authorization
- Rate limiting
- Database persistence
- PDF/audio file support
- Advanced logging & analytics
- Unit/integration tests
- Additional metadata fields (word_count, created_at)
