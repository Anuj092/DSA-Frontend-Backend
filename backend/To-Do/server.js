const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

// Middleware
app.use(express.json());

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper functions
const readTodos = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};

// Validation middleware
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  
  if (req.body.completed !== undefined && typeof req.body.completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean value' });
  }
  
  next();
};

// Routes

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read todos' });
  }
});

// POST /todos - Create a new todo
app.post('/todos', validateTodo, (req, res) => {
  try {
    const todos = readTodos();
    const newTodo = {
      id: Date.now().toString(),
      title: req.body.title.trim(),
      completed: req.body.completed || false,
      createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    writeTodos(todos);
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', validateTodo, (req, res) => {
  try {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos[index] = {
      ...todos[index],
      title: req.body.title.trim(),
      completed: req.body.completed !== undefined ? req.body.completed : todos[index].completed,
      updatedAt: new Date().toISOString()
    };
    
    writeTodos(todos);
    res.json(todos[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  try {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const deletedTodo = todos.splice(index, 1)[0];
    writeTodos(todos);
    
    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'To-Do API is running', version: '1.0.0' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
