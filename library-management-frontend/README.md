# Library Management System Frontend

A React-based frontend application for managing books operations.

## Prerequisites

- Node.js (v14 or higher)
- npm package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/subhrajeet-swain/library-management.git
cd library-management-frontend
```

2. Set up environment variables:
```
VITE_API_URL=<your-backend-url>/api/v1
For example - VITE_API_URL=http://localhost:8000/api/v1
```

3. Install dependencies:
```bash
npm install

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Project Structure
```
library-management-frontend/
├── src/
│ ├── assets/ # Static assets (images, fonts, etc.)
│ ├── components/ # Reusable React components
│ ├── pages/ # Page components
│ ├── routes/ # Route configurations
│ ├── store/ # State management
│ ├── utils/ # Utility functions
│ ├── App.jsx # Root component
│ └── main.jsx # Entry point
```