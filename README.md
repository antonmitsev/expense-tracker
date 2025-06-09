# Expense Tracker Application

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (register/login)
- Track expenses with categories
- Add, edit, and delete expenses
- View expense history
- Responsive Material-UI design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at http://localhost:3000

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user

### Expenses
- GET /api/spends - Get all expenses for the authenticated user
- POST /api/spends - Create a new expense
- PUT /api/spends/:id - Update an expense
- DELETE /api/spends/:id - Delete an expense

### Categories
- GET /api/categories - Get all categories
- POST /api/categories - Create a new category
- PUT /api/categories/:id - Update a category
- DELETE /api/categories/:id - Delete a category

## Technologies Used

- Frontend:
  - React.js
  - Material-UI
  - React Router
  - Axios
  - date-fns

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication

## License

MIT 