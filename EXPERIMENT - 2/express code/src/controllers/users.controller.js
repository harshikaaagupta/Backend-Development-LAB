
const { v4: uuid } = require("uuid");
const db = require("../db");

function listUsers(req, res) {
  res.json({ count: db.users.length, data: db.users });
}

function getUserById(req, res) {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

function createUser(req, res) {
  const name = String(req.body?.name || "").trim();
  if (!name) return res.status(400).json({ error: "name is required" });
  const now = new Date().toISOString();
  const user = {
    id: uuid(),
    name,
    active: Boolean(req.body?.active) || false,
    createdAt: now,
    updatedAt: now
  };
  db.users.push(user);
  res.status(201).json(user);
}

function updateUser(req, res) {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (req.body?.name !== undefined) {
    user.name = String(req.body.name).trim();
  }
  if (req.body?.active !== undefined) {
    user.active = Boolean(req.body.active);
  }
  user.updatedAt = new Date().toISOString();
  res.json(user);
}

function deleteUser(req, res) {
  const idx = db.users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  const [deleted] = db.users.splice(idx, 1);
  res.json({ message: "User deleted", user: deleted });
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

// errors
// 1) Error: Cannot find module 'uuid'
//    fix: npm install uuid
// 2) 400 Bad Request: { "error": "name is required" }
//    cause: POST without valid name
// 3) 404 Not Found: { "error": "User not found" }
//    cause: wrong id used
