const { v4: uuid } = require("uuid");
const db = require("../db");

function listUsers(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ count: db.users.length, data: db.users }));
}

function getUserById(req, res, id) {
  const user = db.users.find(u => u.id === id);
  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "User not found" }));
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}

function createUser(req, res, body) {
  const { name, active } = body;
  if (!name || !name.trim()) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "name is required" }));
  }

  const now = new Date().toISOString();
  const user = {
    id: uuid(),
    name: name.trim(),
    active: Boolean(active) || false,
    createdAt: now,
    updatedAt: now
  };
  db.users.push(user);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}

function updateUser(req, res, id, body) {
  const user = db.users.find(u => u.id === id);
  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "User not found" }));
  }

  if (body.name !== undefined) user.name = String(body.name).trim();
  if (body.active !== undefined) user.active = Boolean(body.active);
  user.updatedAt = new Date().toISOString();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}

function deleteUser(req, res, id) {
  const idx = db.users.findIndex(u => u.id === id);
  if (idx === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "User not found" }));
  }
  const [deleted] = db.users.splice(idx, 1);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User deleted", user: deleted }));
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
