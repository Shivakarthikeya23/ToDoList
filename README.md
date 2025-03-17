# Todo List Application

A full-stack todo list application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive design using Bootstrap
- Protected routes for authenticated users

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shivakarthikeya23/ToDoList.git
cd ToDoList
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

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
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

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- POST /api/register - Register a new user
- POST /api/login - Login user
- POST /api/logout - Logout user

### Tasks
- GET /api/tasks - Get all tasks for logged in user
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Bootstrap
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
