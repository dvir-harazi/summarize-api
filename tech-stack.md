# Tech Stack

This document defines the technology stack for the AI Summarization Proxy API project.

## Core Technologies

### Runtime & Language
- **Node.js** (v22.x LTS) - JavaScript runtime for server-side development
- **TypeScript** (v5.6+) - Type-safe JavaScript with enhanced developer experience
- **npm** (v10+) - Package manager for dependency management

### Web Framework
- **Express.js** (v5.x) - Fast, minimalist web framework for Node.js
- **cors** - Cross-Origin Resource Sharing middleware
- **helmet** - Security middleware for Express apps

## AI & LLM Integration

### LLM Services
- **Hugging Face Inference API** - Primary LLM service for text summarization using open-source models (e.g., Llama 3.1, Mistral, Falcon)
- **@huggingface/inference** (v2.x) - Official Hugging Face TypeScript SDK
- **Alternative providers**: OpenAI (GPT-4o, GPT-4 Turbo), Anthropic Claude 3.5 Sonnet, Google Gemini 2.0 (for future extensibility)

### Text Processing
- **@huggingface/transformers** - Token counting for Hugging Face models
- **pdf-parse** (v1.x) - PDF text extraction (for future PDF support)
- **mammoth** (v1.x) - Word document processing (for future document support)

## API & Validation

### Request/Response Handling
- **express-validator** (v7.x) - Input validation and sanitization
- **zod** (v3.23+) - Type-safe schema validation for request/response objects
- **multer** (v1.x) - Multipart form data handling (for file uploads)

### Documentation
- **swagger-ui-express** (v5.x) - API documentation interface
- **swagger-jsdoc** (v6.x) - Generate OpenAPI specs from JSDoc comments

## Development & Build Tools

### TypeScript Tooling
- **ts-node** - TypeScript execution for development
- **@types/node** - Node.js type definitions
- **@types/express** - Express.js type definitions
- **typescript** - TypeScript compiler

### Code Quality
- **eslint** - Code linting
- **prettier** - Code formatting
- **@typescript-eslint/parser** & **@typescript-eslint/eslint-plugin** - TypeScript-specific linting rules

### Testing (Future Implementation)
- **vitest** (v2.x) - Fast modern testing framework with native TypeScript support
- **supertest** (v7.x) - HTTP assertion library for API testing
- **@vitest/ui** - Optional UI for test visualization

Alternatively:
- **jest** (v29.x) - Traditional testing framework
- **@types/jest** - Jest type definitions

## Infrastructure & Deployment

### Containerization
- **Docker** - Container platform for deployment
- **docker-compose** - Multi-container orchestration for development

### Environment Management
- **dotenv** (v16.x) - Environment variable management
- **dotenv-expand** (v11.x) - Variable expansion support
- **config** (v3.x) - Application configuration management

## Logging & Monitoring

### Logging
- **winston** (v3.x) - Logging library with multiple transports
- **morgan** (v1.x) - HTTP request logging middleware
- **pino** (v9.x) - Alternative high-performance logger (faster than winston)

### Error Handling
- **express-async-errors** - Async error handling for Express
- **http-status-codes** - HTTP status code constants

## Security

### Authentication & Authorization
- **jsonwebtoken** (v9.x) - JWT token handling (for future auth implementation)
- **bcryptjs** (v2.x) - Password hashing (for future user management)
- **express-rate-limit** (v7.x) - Rate limiting middleware

### Security Headers
- **helmet** - Security headers middleware
- **express-validator** - Input sanitization

## Database (Future Extension)

### Primary Database
- **PostgreSQL** (v16.x) - Relational database for summary storage
- **pg** (v8.x) - PostgreSQL client for Node.js
- **@types/pg** - PostgreSQL type definitions

### ORM/Query Builder
- **prisma** (v5.x) - Modern database ORM with excellent TypeScript support
- **drizzle-orm** (v0.33+) - Lightweight TypeScript ORM (alternative)
- **typeorm** (v0.3.x) - Traditional ORM option

## File System & Storage

### Local Storage
- **fs-extra** - Enhanced file system operations
- **path** - Path manipulation utilities

### Cloud Storage (Future)
- **@aws-sdk/client-s3** (v3.x) - AWS S3 integration (modular AWS SDK v3)
- **multer-s3** (v3.x) - S3 storage for multer

## Development Workflow

### Package Scripts
```json
{
  "scripts": {
    "dev": "ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

### Docker Configuration
- **Dockerfile** - Container image definition
- **docker-compose.yml** - Development environment setup
- **.dockerignore** - Docker build optimization

## Project Structure

```
src/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # Data models and types
├── routes/         # Route definitions
├── services/       # Business logic and external API calls
├── utils/          # Utility functions
├── config/         # Configuration files
└── types/          # TypeScript type definitions
```

## Performance Considerations

### Caching
- **node-cache** (v5.x) - In-memory caching
- **redis** (v4.x) - Distributed caching (for scaling)
- **ioredis** (v5.x) - Alternative high-performance Redis client

### Request Optimization
- **compression** (v1.x) - Response compression middleware
- **express-slow-down** (v2.x) - Request throttling

## Environment Variables

```env
PORT=3000
NODE_ENV=development
HUGGINGFACE_API_TOKEN=your_huggingface_token
MAX_REQUEST_SIZE=10mb
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

This tech stack provides a solid foundation for building a scalable, maintainable AI Summarization Proxy API while supporting future extensions and enhancements outlined in the project roadmap.