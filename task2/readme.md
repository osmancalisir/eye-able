# Eyeable - Task 2

This API provides two endpoints: one for a simple "Hello world" message and another for personalized greetings with the current date. The personalized endpoint requires authentication via a bearer token.

## Prerequisites
- Docker installed on your system
- Docker Compose

## Setup and Running the API

### 1. Build and start the service
```bash
docker-compose up -d
```

This will:
- Build the Node.js application
- Start the API service on port 4000
- Output logs to your terminal

### 1. Verify the service is running
You should see this message in the logs:
```
🚀 Eyeable server running on port 4000
🌐 http://localhost:4000
🩺 Health endpoint: http://localhost:4000/health
👋 Hello endpoints: http://localhost:4000/api/v1/hello
```

## Testing the API Endpoints

### 1. Public endpoint - Hello World
```bash
curl http://localhost:4000/api/v1/hello
```
Response:
```
Hello world
```

### 2. Authenticated endpoint - Personalized greeting
Use the token from your .env file or docker-compose.yml:
```bash
curl -H "Authorization: Bearer your-token-here" \
  http://localhost:4000/api/v1/hello/YourName
```

Response (example):
```
Hello YourName. Today is the Wednesday, July 2, 2025
```

Alternative Setup: Instead of the manual steps above, you can run this command to automatically generate the token and create the .env file:
sed "s|EYE_ABLE_TOKEN=.*|EYE_ABLE_TOKEN=$(npm run generate-token --silent | tail -n 1)|" .env.example > .env

### 3. Health check endpoint
```bash
curl http://localhost:4000/health
```

Response:
```json
{"status":"healthy","timestamp":"2025-07-01T19:54:10.821Z","message":"API is running"}% 
```

## Generating a New Token
To generate a new authentication token:

1. Update the `EYE_ABLE_TOKEN` value in docker-compose.yml
2. Run this command to generate a new token:
```bash
openssl rand -hex 32
or
yarn generate-token
```

## Stopping the Service
Press `CTRL+C` in the terminal where docker-compose is running, or use:
```bash
docker-compose down
```

## Troubleshooting
If you encounter issues:
1. Verify Docker is running: `docker ps`
2. Check container logs: `docker-compose logs -f app`
3. Ensure your token matches between:
   - Your curl command
   - The EYE_ABLE_TOKEN value in docker-compose.yml
4. Test the API without authentication first: `curl http://localhost:4000/api/v1/hello`

## API Endpoint Summary
| Endpoint | Method | Authentication | Description |
|----------|--------|----------------|-------------|
| `/api/v1/hello` | GET | None | Returns "Hello world" |
| `/api/v1/hello/:name` | GET | Bearer token | Returns personalized greeting with current date |
| `/health` | GET | None | Returns API health status |
| `/` | GET | None | Shows available endpoints |