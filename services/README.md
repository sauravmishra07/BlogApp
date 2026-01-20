# BlogApp Services - Microservices Architecture

A scalable, microservices-based blogging platform built with Node.js, Express, and TypeScript. This project implements a distributed architecture with independent services for user management, blog authoring, and blog consumption.

## 📋 Project Overview

**BlogApp Services** is a production-ready microservices architecture designed for a modern blogging platform. The system is decomposed into three independent services that communicate asynchronously through message queues and synchronously through REST APIs.

### Architecture Principles

- **Microservices Pattern**: Each service is independently deployable and scalable
- **Single Responsibility**: Each service handles a specific business domain
- **Asynchronous Communication**: Services communicate via RabbitMQ for decoupled operations
- **Caching Strategy**: Redis caching layer for improved performance
- **Database Per Service**: Each service manages its own data store

## 🏗️ Services Architecture

### Service Topology

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐      ┌────▼─────┐    ┌───▼──────┐
   │  User   │      │   Blog   │    │ Author   │
   │ Service │      │ Service  │    │ Service  │
   └────┬────┘      └────┬─────┘    └───┬──────┘
        │                │                │
        │         ┌──────┴────────┐       │
        │         │               │       │
   ┌────▼──┐  ┌──▼─┐         ┌───▼──┐   │
   │MongoDB│  │ Redis      │PostgreSQL│
   └───────┘  └─────┘       └─────────┘
                  ▲
                  │
             ┌────┴────┐
             │ RabbitMQ│
             └──────────┘
```

## 🎯 Services

### 1. **User Service** 
**Port**: `3002` | **Database**: MongoDB

Manages user authentication, profiles, and identity.

**Key Features:**
- Google OAuth 2.0 authentication
- User profile management (CRUD)
- Profile picture uploads to Cloudinary
- JWT token generation and validation

**Technologies:**
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Google APIs
- Cloudinary

**API Routes:**
- `POST /api/users/login` - Google OAuth login
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/user/:id` - Get user by ID
- `PUT /api/users/user/update` - Update profile
- `POST /api/users/user/update/pic` - Upload profile picture

### 2. **Author Service** 
**Port**: `3003` | **Database**: PostgreSQL (Neon)

Handles blog creation, updates, and deletion operations.

**Key Features:**
- Create new blog posts with image uploads
- Update blog content and metadata
- Delete blogs
- Cache invalidation via RabbitMQ
- Image management with Cloudinary

**Technologies:**
- Express.js
- PostgreSQL (Neon Serverless)
- Multer for file uploads
- RabbitMQ producer
- Cloudinary

**API Routes:**
- `POST /api/blog/blog/new` - Create new blog
- `PUT /api/blog/blog/update/:id` - Update blog
- `DELETE /api/blog/blog/delete/:id` - Delete blog

### 3. **Blog Service** 
**Port**: `3001` | **Database**: PostgreSQL (Neon) + Redis Cache

Provides high-performance read access to blog data with intelligent caching.

**Key Features:**
- Fetch all blogs with pagination
- Redis caching for performance
- RabbitMQ consumer for cache invalidation
- Automatic cache updates on data changes
- JWT validation

**Technologies:**
- Express.js
- PostgreSQL (Neon Serverless)
- Redis (Upstash)
- RabbitMQ consumer
- JWT validation

**API Routes:**
- `GET /api/blog/blogs` - Fetch all blogs

## 🛠️ Technology Stack

### Core Technologies

| Category | Technology | Version |
|----------|-----------|---------|
| **Runtime** | Node.js | Latest LTS |
| **Language** | TypeScript | ^5.9.3 |
| **Web Framework** | Express.js | ^5.2.1 |
| **Build Tool** | TypeScript Compiler | ^5.9.3 |
| **Development** | Concurrently, Nodemon | Latest |

### Databases

| Service | Database | Type | Provider |
|---------|----------|------|----------|
| User Service | MongoDB | NoSQL Document | Self-hosted or Atlas |
| Author Service | PostgreSQL | SQL Relational | Neon (Serverless) |
| Blog Service | PostgreSQL | SQL Relational | Neon (Serverless) |
| Blog Service | Redis | In-Memory Cache | Upstash |

### External Services

| Service | Purpose | Package |
|---------|---------|---------|
| **Cloudinary** | Image Storage & CDN | `cloudinary@^2.8.0` |
| **Google OAuth** | Authentication | `googleapis@^170.0.0` |
| **RabbitMQ** | Message Queue | `amqplib@^0.10.9` |
| **JWT** | Token Authentication | `jsonwebtoken@^9.0.3` |

### Middleware & Utilities

| Package | Purpose | Version |
|---------|---------|---------|
| `multer` | File Upload Handling | ^2.0.2 |
| `datauri` | File to URI Conversion | ^4.1.0 |
| `axios` | HTTP Client | ^1.13.2 |
| `cors` | Cross-Origin Requests | ^2.8.5 |
| `dotenv` | Environment Variables | ^17.2.3 |
| `mongoose` | MongoDB ODM | ^9.1.2 |
| `@neondatabase/serverless` | Neon Database Driver | ^1.0.2 |
| `@upstash/redis` | Redis Client | ^1.36.1 |

### Development Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `@types/express` | TypeScript Express Types | ^5.0.6 |
| `@types/node` | TypeScript Node Types | Latest |
| `@types/multer` | TypeScript Multer Types | ^2.0.0 |
| `@types/mongoose` | TypeScript Mongoose Types | ^5.11.96 |
| `@types/jsonwebtoken` | TypeScript JWT Types | ^9.0.10 |
| `@types/dotenv` | TypeScript Dotenv Types | ^6.1.1 |
| `@types/cors` | TypeScript CORS Types | ^2.8.19 |
| `@types/amqplib` | TypeScript RabbitMQ Types | ^0.10.8 |
| `@types/axios` | TypeScript Axios Types | ^0.9.36 |
| `typescript` | TypeScript Compiler | ^5.9.3 |
| `concurrently` | Run Multiple Commands | ^9.2.1 |
| `nodemon` | File Watcher | Latest |

## 📁 Project Structure

```
services/
├── README.md                    # This file
│
├── user/                        # User Management Service
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md               # Service-specific documentation
│   └── src/
│       ├── server.ts
│       ├── controllers/
│       │   └── user.ts
│       ├── middleware/
│       │   ├── isAuth.ts       # JWT validation
│       │   └── multer.ts       # File upload
│       ├── model/
│       │   └── User.ts         # MongoDB schema
│       ├── routes/
│       │   └── user.ts
│       └── utils/
│           ├── dataUri.ts      # File conversion
│           ├── db.ts          # MongoDB connection
│           ├── GoogleConfig.ts # OAuth setup
│           └── TryCatch.ts    # Error handler
│
├── author/                      # Blog Writing Service
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md               # Service-specific documentation
│   └── src/
│       ├── server.ts
│       ├── controllers/
│       │   └── blog.ts
│       ├── middleware/
│       │   ├── isAuth.ts
│       │   └── multer.ts
│       ├── routes/
│       │   └── blog.ts
│       └── utils/
│           ├── dataUri.ts
│           ├── db.ts          # PostgreSQL connection
│           ├── rabbitmq.ts    # RabbitMQ producer
│           └── TryCatch.ts
│
└── blog/                        # Blog Reading Service
    ├── package.json
    ├── tsconfig.json
    ├── README.md               # Service-specific documentation
    └── src/
        ├── server.ts
        ├── controllers/
        │   └── blog.ts
        ├── routes/
        │   └── blog.ts
        └── utils/
            ├── consumer.ts      # RabbitMQ consumer
            ├── db.ts           # PostgreSQL + Redis
            └── TryCatch.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (for RabbitMQ, PostgreSQL, MongoDB - optional if using cloud services)
- Environment variables configured for each service

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sauravmishra07/BlogApp.git
cd BlogApp/services
```

2. **Install dependencies for all services:**
```bash
# User Service
cd user && npm install && cd ..

# Author Service
cd author && npm install && cd ..

# Blog Service
cd blog && npm install && cd ..
```

3. **Configure environment variables:**

Create `.env` files for each service:

**user/.env**
```env
PORT=3002
DATABASE_URL=mongodb://localhost:27017/blogapp
JWT_SECRET=your_jwt_secret_key
cloudinary_cloud_name=your_cloudinary_name
cloudinary_api_key=your_cloudinary_api_key
cloudinary_api_secret=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**author/.env**
```env
PORT=3003
DATABASE_URL=postgresql://user:password@localhost:5432/blogapp
JWT_SECRET=your_jwt_secret_key
RABBITMQ_URL=amqp://localhost
cloudinary_cloud_name=your_cloudinary_name
cloudinary_api_key=your_cloudinary_api_key
cloudinary_api_secret=your_cloudinary_api_secret
```

**blog/.env**
```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/blogapp
REDIS_URI=redis://localhost:6379
RABBITMQ_URL=amqp://localhost
```

### Running Services

**Development Mode** (with hot-reload):
```bash
# In each service directory
npm run dev
```

**Production Mode:**
```bash
# In each service directory
npm run build
npm start
```

**Run all services concurrently** (from services root):
```bash
# Create a root package.json with scripts like:
concurrently "cd user && npm run dev" "cd author && npm run dev" "cd blog && npm run dev"
```

## 🔄 Data Flow

### User Registration Flow
```
Frontend → User Service (POST /login)
         → Google OAuth Verification
         → MongoDB: Create/Update User
         → JWT Token Generation
         → Response to Frontend
```

### Blog Creation Flow
```
Frontend → Author Service (POST /blog/new)
         → JWT Validation
         → File Upload to Cloudinary
         → PostgreSQL: Create Blog Record
         → Publish to RabbitMQ
         → Blog Service consumes message
         → Redis Cache Invalidation
         → Response to Frontend
```

### Blog Reading Flow
```
Frontend → Blog Service (GET /blogs)
         → Check Redis Cache
         → If miss: Query PostgreSQL
         → Store in Redis Cache
         → Return to Frontend
```

## 🔌 Communication Patterns

### Synchronous (REST API)
- Frontend ↔ All Services
- Services call each other via HTTP when needed

### Asynchronous (RabbitMQ)
- Author Service → Blog Service: Cache invalidation events
- Decouples services for better resilience

## 📊 Database Schemas

### MongoDB (User Service)
```javascript
User {
  _id: ObjectId,
  name: String,
  email: String,
  image: String,
  createdAt: Date
}
```

### PostgreSQL (Author & Blog Services)
```sql
-- Blogs Table
blogs {
  id, author_id, title, description, blogcontent, 
  image, category, author, created_at
}

-- Comments Table
comments {
  id, comment, userid, username, blogid, created_at
}

-- Saved Blogs Table
savedblogs {
  id, userid, blogid, created_at
}
```

## 🔐 Security Features

- **JWT Authentication**: Token-based auth for protected routes
- **Google OAuth**: Secure third-party authentication
- **Environment Variables**: Sensitive data in .env files
- **CORS**: Cross-origin request protection
- **Cloudinary**: Secure image storage and CDN

## 📈 Scalability Considerations

- **Horizontal Scaling**: Each service can scale independently
- **Database**: Neon provides serverless PostgreSQL scaling
- **Redis**: Upstash provides managed Redis with auto-scaling
- **Message Queue**: RabbitMQ enables asynchronous processing
- **Stateless Services**: Services don't maintain state, enabling horizontal scaling

## 🐛 Debugging

Each service logs:
- Server startup messages
- Database connection status
- API request/response info
- Error messages with context

Check console output or implement centralized logging for production.

## 📚 Service-Specific Documentation

- [User Service README](./user/README.md) - Authentication & profiles
- [Author Service README](./author/README.md) - Blog CRUD operations
- [Blog Service README](./blog/README.md) - Blog reading & caching

## 🤝 Contributing

1. Each service is independently maintained
2. Follow the existing code structure
3. Update README when adding new endpoints
4. Test API changes thoroughly

## 📝 License

ISC

## 🔗 Related Resources

- [Frontend Application](../frontend/README.md)
- [BlogApp Repository](https://github.com/sauravmishra07/BlogApp)

---

**Last Updated**: January 2026
