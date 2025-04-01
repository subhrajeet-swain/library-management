# Library Management System

A RESTful API for managing books and users built with Node.js, Express, and PostgreSQL.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Book Management (CRUD operations)
- Input Validation using Joi
- PostgreSQL Database with Sequelize ORM
- Error Handling
- API Response Formatting

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL database (or access to a PostgreSQL instance)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd library-management-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=your_port
PGHOST=your_database_host
PGDATABASE=your_database_name
PGUSER=your_database_user
PGPASSWORD=your_database_password
DB_DIALECT=postgres
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret
```

## Running the Application

Development mode (with nodemon):
```bash
npm run dev
```

The server will start on the port specified in your .env file (default: 8000).

src/
├── api/
│   ├── v1/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── validations/
│   └── index.js
├── configs/
│   └── db.config.js
├── core/
│   ├── models/
│   └── services/
├── lib/
│   └── utils/
└── app.js

## API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /user/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test123",
    "confirmPassword": "Test123"
}
```

#### Login User
```http
POST /user/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "Test123"
}
```

#### Get User Profile
```http
GET /user/profile
Authorization: Bearer <your_token>
```

#### Update User Profile
```http
PUT /user/update
Authorization: Bearer <your_token>
Content-Type: application/json

{
    "name": "Updated Name"
}
```

#### Delete User
```http
DELETE /user/delete
Authorization: Bearer <your_token>
```

### Book Endpoints

#### Create Book
```http
POST /create-book
Content-Type: application/json
Authorization: Bearer <your_token>

{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "description": "A story of decadence and excess."
}
```

#### Get All Books
```http
GET /get-all-books
Authorization: Bearer <your_token>
```

#### Update Book
```http
PUT /update-book/:id
Content-Type: application/json
Authorization: Bearer <your_token>

{
    "title": "Updated Title",
    "author": "Updated Author"
}
```

#### Delete Book
```http
DELETE /delete-book/:id
Authorization: Bearer <your_token>
```

## Validation Rules

### User Validation
- Name: 2-50 characters
- Email: Valid email format
- Password: 
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number

### Book Validation
- Title: 1-255 characters, required
- Author: 1-255 characters, required
- Genre: Optional, max 255 characters
- Description: Optional text field

## Error Handling

The API returns consistent error responses in the following format:
```json
{
    "statusCode": 400,
    "success": false,
    "error": {
        "field": "error message"
    },
    "message": "Validation Errors"
}
```

## Database Configuration
The application uses Sequelize ORM with PostgreSQL. Database configuration can be found in `src/configs/db.config.js`.

## Author
Subhrajeet Swain
