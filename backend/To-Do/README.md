# Simple To-Do CRUD API

A lightweight REST API for managing to-do items built with Node.js and Express.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ JSON file-based storage (no database required)
- ✅ Input validation
- ✅ Completed status tracking
- ✅ Proper HTTP status codes
- ✅ Timestamps for creation and updates

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### 1. Get All Todos
```
GET /todos
```

**Response:**
```json
[
  {
    "id": "1234567890",
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
]
```

### 2. Create a Todo
```
POST /todos
```

**Request Body:**
```json
{
  "title": "Buy groceries",
  "completed": false
}
```

**Response (201 Created):**
```json
{
  "id": "1234567890",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2025-11-20T10:30:00.000Z"
}
```

### 3. Update a Todo
```
PUT /todos/:id
```

**Request Body:**
```json
{
  "title": "Buy groceries and cook dinner",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "id": "1234567890",
  "title": "Buy groceries and cook dinner",
  "completed": true,
  "createdAt": "2025-11-20T10:30:00.000Z",
  "updatedAt": "2025-11-20T11:00:00.000Z"
}
```

### 4. Delete a Todo
```
DELETE /todos/:id
```

**Response (200 OK):**
```json
{
  "message": "Todo deleted successfully",
  "todo": {
    "id": "1234567890",
    "title": "Buy groceries",
    "completed": false
  }
}
```

## Testing with cURL

### Get all todos:
```bash
curl http://localhost:3000/todos
```

### Create a todo:
```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d "{\"title\":\"Buy groceries\",\"completed\":false}"
```

### Update a todo:
```bash
curl -X PUT http://localhost:3000/todos/1234567890 -H "Content-Type: application/json" -d "{\"title\":\"Buy groceries and cook\",\"completed\":true}"
```

### Delete a todo:
```bash
curl -X DELETE http://localhost:3000/todos/1234567890
```

## Validation Rules

- `title`: Required, must be a non-empty string
- `completed`: Optional, must be a boolean (defaults to `false`)

## Error Responses

### 400 Bad Request
```json
{
  "error": "Title is required and must be a non-empty string"
}
```

### 404 Not Found
```json
{
  "error": "Todo not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to read todos"
}
```

## Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Deploy!

### Deploy to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect the Node.js app
4. Deploy!

### Deploy to Cyclic

1. Create a new app on [Cyclic](https://cyclic.sh)
2. Connect your GitHub repository
3. Cyclic will automatically deploy
4. Done!

## Data Storage

Todos are stored in a `todos.json` file in the project root. This file is automatically created when the server starts.

## Project Structure

```
.
├── server.js       # Main application file
├── package.json    # Dependencies and scripts
├── todos.json      # Data storage (auto-generated)
└── README.md       # Documentation
```

## License

ISC
