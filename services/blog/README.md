# Blog Service

Blog microservice for the BlogApp application. This service is responsible for fetching and caching blog data using Redis and RabbitMQ for cache invalidation.

## Overview

The Blog Service provides read-only access to blog content. It integrates with:
- **Redis**: For caching blog data to improve performance
- **RabbitMQ**: For consuming cache invalidation messages from the Author Service
- **PostgreSQL**: Via Neon serverless database for data persistence

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Caching**: Redis (Upstash)
- **Message Queue**: RabbitMQ
- **Build Tool**: TypeScript Compiler (tsc)

## Project Structure

```
src/
├── server.ts              # Application entry point
├── routes/
│   └── blog.ts           # Blog routes
├── controllers/
│   └── blog.ts           # Blog business logic
└── utils/
    ├── consumer.ts       # RabbitMQ consumer for cache invalidation
    ├── db.ts            # Database connection
    └── TryCatch.ts      # Error handling utility
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the service root directory:

```env
PORT=3001
REDIS_URI=your_upstash_redis_uri
DATABASE_URL=your_neon_database_url
RABBITMQ_URL=your_rabbitmq_url
```

## Running the Service

### Development Mode

```bash
npm run dev
```

Runs the service with hot-reload enabled using concurrently (tsc --watch + nodemon).

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Blog Routes (`/api/blog`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/blogs` | Get all blogs | No |

#### GET /blogs
Retrieves all blog posts with pagination and filtering support.

**Response:**
```json
{
  "blogs": [
    {
      "id": 1,
      "title": "Blog Title",
      "description": "Blog description",
      "blogcontent": "Full blog content",
      "image": "https://cloudinary.com/image.jpg",
      "author": "Author Name",
      "created_at": "2024-01-20T10:00:00Z"
    }
  ],
  "total": 10,
  "page": 1
}
```

## Features

- **Read-Only Operations**: Optimized for fetching blog data
- **Caching**: Redis integration for improved performance
- **Cache Invalidation**: Consumes RabbitMQ messages to invalidate cache when blogs are created/updated/deleted
- **Error Handling**: Comprehensive error handling with TryCatch utility

## Dependencies

- `express`: ^5.2.1 - Web framework
- `@neondatabase/serverless`: ^1.0.2 - PostgreSQL serverless driver
- `amqplib`: ^0.10.9 - RabbitMQ client
- `@upstash/redis`: ^1.36.1 - Redis client
- `cors`: ^2.8.5 - Cross-Origin Resource Sharing
- `dotenv`: ^17.2.3 - Environment variable management
- `jsonwebtoken`: ^9.0.3 - JWT authentication
- `axios`: ^1.13.2 - HTTP client

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server

## Notes

- This service works in conjunction with the Author Service (creates/updates/deletes blogs) and Blog Service (reads/caches blogs)
- Cache invalidation happens automatically when the Author Service publishes messages to RabbitMQ
- All blog images are stored on Cloudinary

## License

ISC
