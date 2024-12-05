const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Import path module
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Root route (Accessed when you visit http://localhost:10000 or root URL)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Spotify Playlists</h1><p>Use the endpoint <code>/items</code> to interact with the app.</p>');
});

// GET all items
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching items.');
    } else {
      res.json({ items: rows });
    }
  });
});

// POST a new item
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
