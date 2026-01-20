# User Service

User microservice for the BlogApp application. This service handles user authentication, profile management, and image uploads.

## Overview

The User Service manages all user-related operations including:
- **Authentication**: Google OAuth 2.0 login
- **User Profiles**: Create, retrieve, and update user information
- **Image Management**: Profile picture uploads and management via Cloudinary

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT and Google OAuth 2.0
- **Image Storage**: Cloudinary
- **File Upload**: Multer
- **Build Tool**: TypeScript Compiler (tsc)

## Project Structure

```
src/
├── server.ts              # Application entry point
├── routes/
│   └── user.ts           # User routes
├── controllers/
│   └── user.ts           # User business logic
├── middleware/
│   ├── isAuth.ts         # JWT authentication middleware
│   └── multer.ts         # File upload middleware
├── model/
│   └── User.ts           # Mongoose User schema
└── utils/
    ├── dataUri.ts        # Convert file to data URI
    ├── db.ts            # Database connection
    ├── GoogleConfig.ts  # Google OAuth configuration
    └── TryCatch.ts      # Error handling utility
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the service root directory:

```env
PORT=3002
DATABASE_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
cloudinary_cloud_name=your_cloudinary_name
cloudinary_api_key=your_cloudinary_api_key
cloudinary_api_secret=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
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

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/login` | Google OAuth login | No |
| GET | `/profile` | Get current user profile | Yes |
| GET | `/user/:id` | Get user profile by ID | Yes |
| PUT | `/user/update` | Update user information | Yes |
| POST | `/user/update/pic` | Update user profile picture | Yes |

### Detailed Endpoint Documentation

#### POST /login
Authenticates user with Google OAuth and returns JWT token.

**Request:**
```json
{
  "code": "google_authorization_code"
}
```

**Response:**
```json
{
  "message": "✅ User logged in successfully",
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "image": "https://example.com/profile.jpg"
  },
  "token": "jwt_token_here"
}
```

#### GET /profile
Get the current authenticated user's profile.

**Headers:** `Authorization: Bearer jwt_token`

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "image": "https://cloudinary.com/profile.jpg"
  }
}
```

#### GET /user/:id
Get a specific user's profile by their ID.

**Headers:** `Authorization: Bearer jwt_token`

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "image": "https://cloudinary.com/profile.jpg"
  }
}
```

#### PUT /user/update
Update the current user's profile information.

**Headers:** `Authorization: Bearer jwt_token`

**Request:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

**Response:**
```json
{
  "message": "✅ Profile updated successfully",
  "user": {
    "_id": "user_id",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "image": "https://cloudinary.com/profile.jpg"
  }
}
```

#### POST /user/update/pic
Upload or update user's profile picture.

**Headers:** `Authorization: Bearer jwt_token`

**Request:** Form data with file upload
- `file`: Image file (jpg, png, etc.)

**Response:**
```json
{
  "message": "✅ Profile picture updated successfully",
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "image": "https://cloudinary.com/updated_profile.jpg"
  }
}
```

## Features

- **Google OAuth Integration**: Seamless login via Google accounts
- **JWT Authentication**: Secure token-based authentication
- **Profile Management**: Full CRUD operations for user profiles
- **Image Uploads**: Profile picture management with Cloudinary
- **Error Handling**: Comprehensive error handling with TryCatch utility

## Dependencies

- `express`: ^5.2.1 - Web framework
- `mongoose`: ^9.1.2 - MongoDB ODM
- `jsonwebtoken`: ^9.0.3 - JWT authentication
- `cloudinary`: ^2.8.0 - Image storage service
- `multer`: ^2.0.2 - File upload middleware
- `datauri`: ^4.1.0 - File to data URI conversion
- `googleapis`: ^170.0.0 - Google API client
- `axios`: ^1.13.2 - HTTP client
- `cors`: ^2.8.5 - Cross-Origin Resource Sharing
- `dotenv`: ^17.2.3 - Environment variable management

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server

## Authentication

All endpoints marked as requiring authentication need a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Notes

- User profiles are stored in MongoDB
- Profile images are stored on Cloudinary
- Google OAuth requires proper client ID and secret configuration
- JWT tokens expire after 5 days by default

## License

ISC
