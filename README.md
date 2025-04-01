# Library Management System

A full-stack Library Management System with React frontend and Node.js/Express backend.

## Project Structure

```
library-management/
├── library-management-frontend/  # React frontend
├── library-management-backend/   # Node.js backend
└── README.md
```

## Features

- User Authentication (Register/Login)
- Book Management (CRUD operations)
- JWT-based Authorization
- Responsive React UI
- RESTful API with Express
- PostgreSQL Database

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL database

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd library-management-backend
npm install
```

2. Create `.env` file in backend directory:
```env
PORT=8000
PGHOST=your_database_host
PGDATABASE=your_database_name
PGUSER=your_database_user
PGPASSWORD=your_database_password
DB_DIALECT=postgres
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret
```

3. Start backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd library-management-frontend
npm install
```

2. Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

3. Start frontend development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:8000`.

## Detailed Documentation

- For detailed backend documentation, see [library-management-backend/README.md](./library-management-backend/README.md)
- For detailed frontend documentation, see [library-management-frontend/README.md](./library-management-frontend/README.md)

## Author
Subhrajeet Swain