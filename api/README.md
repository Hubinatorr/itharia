# Itharia Express.js API

A Node.js/Express backend API for the Itharia project, replacing the original PHP implementation.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in your database credentials:
```bash
cp .env.example .env
```

Edit `.env` with your database configuration:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=your_database_name
PORT=3000
NODE_ENV=development
```

### 3. Run the server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Users
- **POST** `/api/users` - Create a new user
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "role": "user",
      "faction": "dwarfs",
      "oauth_provider": null,
      "oauth_id": null
    }
    ```
  - Returns: `201 Created` with user ID
  - Validation:
    - Email must be valid
    - Role must be `user` or `admin`
    - Faction must be one of: `dwarfs`, `humans`, `avians`, `minotaurs`
    - Password is hashed with bcrypt before storage

### Posts
- **GET** `/api/posts` - Fetch all categories with their posts
  - Returns: Array of categories with nested posts, ordered by position
  - Sample response:
    ```json
    [
      {
        "id": 1,
        "name": "Category Name",
        "position": 0,
        "posts": [
          {
            "id": 1,
            "title": "Post Title",
            "slug": "post-slug",
            "content": "<p>Post content</p>",
            "position": 0
          }
        ]
      }
    ]
    ```

### Health Check
- **GET** `/api/health` - Server status check
  - Returns: `{ "status": "ok" }`

## Database

The API requires the following database tables (as per your original PHP schema):

- `users` - User accounts
- `categories` - Post categories
- `posts` - Forum/wiki posts

## Features

- ✅ MySQL connection pooling
- ✅ UTF-8 encoding support
- ✅ CORS enabled
- ✅ Input validation
- ✅ Password hashing with bcrypt
- ✅ Environment variable configuration
- ✅ Error handling and logging
