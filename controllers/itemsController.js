const db = require('../models/database');

// GET all items
exports.getItems = (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ items: rows });
    }
  });
};

// POST new item
exports.createItem = (req, res) => {
  const { name, description } = req.body;
  const query = `INSERT INTO items (name, description) VALUES (?, ?)`;
  db.run(query, [name, description], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, name, description });
    }
  });
};

// PUT update item
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = `UPDATE items SET name = ?, description = ? WHERE id = ?`;
  db.run(query, [name, description, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Item updated" });
    }
  });
};

// PATCH partially update item
exports.patchItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = `UPDATE items SET name = ?, description = ? WHERE id = ?`;
  db.run(query, [name, description, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Item updated" });
    }
  });
};

// DELETE item
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM items WHERE id = ?`;
  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Item deleted" });
    }
  });
};
