# Docker Setup Instructions

## Prerequisites
- Docker Desktop installed and running
- Docker Compose installed (included with Docker Desktop)

## Build and Run with Docker

### Option 1: Using Docker Compose (Recommended for Development)

1. Make sure your `.env` file has the required variables:
   ```
   HUGGINGFACE_API_TOKEN=your_token_here
   ```

2. Build and start the container:
   ```bash
   docker-compose up --build
   ```

3. The API will be available at `http://localhost:3000`

4. To run in detached mode:
   ```bash
   docker-compose up -d
   ```

5. To stop:
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker directly (Production)

1. Build the image:
   ```bash
   docker build -t summarize-api .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 \
     -e HUGGINGFACE_API_TOKEN=your_token_here \
     -e NODE_ENV=production \
     summarize-api
   ```

## Verify the Container

Check if the container is running:
```bash
docker ps
```

Check container logs:
```bash
docker logs summarize-api
```

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

## Development with Docker Compose

The docker-compose.yml is configured for development:
- Source code is mounted as a volume
- Changes to TypeScript files will require restart
- Use `npm run dev` inside the container

To rebuild after dependency changes:
```bash
docker-compose up --build
```
