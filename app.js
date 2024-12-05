const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Routes
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching items.');
    } else {
      res.json({ items: rows });
    }
  });
});

app.post('/items', (req, res) => {
  const { name, description } = req.body;
  db.run(
    'INSERT INTO items (name, description, date_created) VALUES (?, ?, ?)',
    [name, description, new Date().toISOString()],
    function (err) {
      if (err) {
        res.status(500).send('Error adding item.');
      } else {
        res.status(201).send({ id: this.lastID });
      }
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
