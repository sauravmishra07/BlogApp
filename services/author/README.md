# Author Service

Author microservice for the BlogApp application. This service handles blog creation, updates, deletion, and publishes cache invalidation messages.

## Overview

The Author Service manages all blog-related write operations including:
- **Blog Creation**: Create new blog posts with image uploads
- **Blog Updates**: Modify existing blog content
- **Blog Deletion**: Remove blog posts
- **Cache Invalidation**: Publish RabbitMQ messages to invalidate cached data

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon serverless)
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **File Upload**: Multer
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
├── middleware/
│   ├── isAuth.ts         # JWT authentication middleware
│   └── multer.ts         # File upload middleware
└── utils/
    ├── dataUri.ts        # Convert file to data URI
    ├── db.ts            # Database connection
    ├── rabbitmq.ts      # RabbitMQ producer and connection
    └── TryCatch.ts      # Error handling utility
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the service root directory:

```env
PORT=3003
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret_key
RABBITMQ_URL=your_rabbitmq_url
cloudinary_cloud_name=your_cloudinary_name
cloudinary_api_key=your_cloudinary_api_key
cloudinary_api_secret=your_cloudinary_api_secret
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
| POST | `/blog/new` | Create new blog | Yes |
| PUT | `/blog/update/:id` | Update existing blog | Yes |
| DELETE | `/blog/delete/:id` | Delete blog | Yes |

### Detailed Endpoint Documentation

#### POST /blog/new
Create a new blog post with title, description, content, and image.

**Headers:** 
- `Authorization: Bearer jwt_token`
- `Content-Type: multipart/form-data`

**Request:** Form data
- `title` (string, required): Blog title
- `description` (string, required): Short description
- `blogcontent` (string, required): Full blog content
- `category` (string, required): Blog category
- `file` (file, required): Blog cover image

**Response:**
```json
{
  "message": "✅ Blog created successfully",
  "blog": {
    "id": 1,
    "author_id": "user_id",
    "title": "Blog Title",
    "description": "Blog description",
    "blogcontent": "Full blog content",
    "image": "https://cloudinary.com/blog_images/image.jpg",
    "category": "Technology",
    "author": "Author Name",
    "created_at": "2024-01-20T10:00:00Z"
  }
}
```

#### PUT /blog/update/:id
Update an existing blog post.

**Headers:** 
- `Authorization: Bearer jwt_token`
- `Content-Type: multipart/form-data`

**URL Parameters:**
- `id` (number, required): Blog ID to update

**Request:** Form data (all optional)
- `title` (string): Updated blog title
- `description` (string): Updated description
- `blogcontent` (string): Updated blog content
- `category` (string): Updated category
- `file` (file): New blog cover image

**Response:**
```json
{
  "message": "✅ Blog updated successfully",
  "blog": {
    "id": 1,
    "author_id": "user_id",
    "title": "Updated Blog Title",
    "description": "Updated description",
    "blogcontent": "Updated blog content",
    "image": "https://cloudinary.com/blog_images/updated_image.jpg",
    "category": "Technology",
    "author": "Author Name",
    "created_at": "2024-01-20T10:00:00Z"
  }
}
```

#### DELETE /blog/delete/:id
Delete a blog post.

**Headers:** `Authorization: Bearer jwt_token`

**URL Parameters:**
- `id` (number, required): Blog ID to delete

**Response:**
```json
{
  "message": "✅ Blog deleted successfully"
}
```

## Database Schema

The service initializes the following tables on startup:

### blogs
```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  blogcontent TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### comments
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  userid VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  blogid INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### savedblogs
```sql
CREATE TABLE savedblogs (
  id SERIAL PRIMARY KEY,
  userid VARCHAR(255) NOT NULL,
  blogid INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Features

- **Blog Management**: Create, read, update, and delete blog posts
- **Image Uploads**: Upload blog cover images to Cloudinary
- **Authentication**: JWT-based authentication for secure operations
- **Cache Invalidation**: Publishes messages to RabbitMQ to invalidate Blog Service cache
- **Error Handling**: Comprehensive error handling with TryCatch utility
- **CORS Support**: Configured for cross-origin requests

## Dependencies

- `express`: ^5.2.1 - Web framework
- `@neondatabase/serverless`: ^1.0.2 - PostgreSQL serverless driver
- `jsonwebtoken`: ^9.0.3 - JWT authentication
- `cloudinary`: ^2.8.0 - Image storage service
- `multer`: ^2.0.2 - File upload middleware
- `datauri`: ^4.1.0 - File to data URI conversion
- `amqplib`: ^0.10.9 - RabbitMQ client
- `cors`: ^2.8.5 - Cross-Origin Resource Sharing
- `dotenv`: ^17.2.3 - Environment variable management
- `axios`: ^1.13.2 - HTTP client

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server

## Authentication

All endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Cache Invalidation

When a blog is created, updated, or deleted, this service publishes a message to RabbitMQ. The Blog Service consumes these messages and invalidates the relevant cache entries.

## Notes

- All blog operations require user authentication
- Blog images are stored on Cloudinary with a `blog_images` folder
- The service connects to PostgreSQL via Neon serverless for scalability
- RabbitMQ is used for asynchronous cache invalidation between services

## License

ISC
