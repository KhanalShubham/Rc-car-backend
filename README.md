# RC Dashboard Backend

A Node.js backend for RC car dashboard with user management system.

## Features

- User management (CRUD operations)
- Input validation
- MongoDB database
- RESTful API
- Error handling
- Pagination and sorting

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. For production:
```bash
npm start
```

## User API Endpoints

### Create User
```
POST /api/users
```
**Body:**
```json
{
  "username": "John Doe",
  "age": 25,
  "sex": "male",
  "feedback": "Great experience!",
  "rating": 5
}
```

### Get All Users
```
GET /api/users
```
**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Users per page
- `sort` (default: createdAt) - Sort field
- `order` (default: desc) - Sort order (asc/desc)

### Get User Statistics
```
GET /api/users/stats
```

### Get User by ID
```
GET /api/users/:id
```

### Update User
```
PUT /api/users/:id
```
**Body:** (all fields optional)
```json
{
  "username": "Updated Name",
  "age": 26,
  "sex": "female",
  "feedback": "Updated feedback",
  "rating": 4
}
```

### Delete User
```
DELETE /api/users/:id
```

### Delete All Users
```
DELETE /api/users
```

## User Model

```javascript
{
  username: String (required, 2-50 chars),
  age: Number (required, 1-120),
  sex: String (required, "male" or "female"),
  feedback: String (optional, max 500 chars),
  rating: Number (optional, 1-5, default: 5),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Create a `.env` file:
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/rc_dashboard
```

## Health Check

```
GET /api/health
```

## RC Car Endpoints

### Get RC Status
```
GET /api/rc/status
```

### Control RC Car
```
POST /api/rc/control
```
**Body:**
```json
{
  "command": "forward",
  "value": 50
}
``` 