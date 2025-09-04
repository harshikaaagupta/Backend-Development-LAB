// Import express framework
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory list of items (like a to-do list)
let items = [];

// GET - Fetch all items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST - Add a new item
app.post("/items", (req, res) => {
  const newItem = req.body.item;
  if (!newItem) {
    return res.status(400).json({ error: "Item is required" });
  }
  items.push(newItem);
  res.status(201).json({ message: "Item added", items });
});

// PUT - Update an item by index
app.put("/items/:index", (req, res) => {
  const index = req.params.index;
  const updatedItem = req.body.item;
  if (!items[index]) {
    return res.status(404).json({ error: "Item not found" });
  }
  items[index] = updatedItem;
  res.json({ message: "Item updated", items });
});

// DELETE - Remove an item by index
app.delete("/items/:index", (req, res) => {
  const index = req.params.index;
  if (!items[index]) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(index, 1);
  res.json({ message: "Item deleted", items });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
