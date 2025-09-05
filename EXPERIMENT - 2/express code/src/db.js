// db.js
const users = [
  {
    id: "u1",
    name: "Alice",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "u2",
    name: "Bob",
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = { users };

// errors
// 1) TypeError: Cannot read properties of undefined (reading 'push')
//    cause: wrong export like module.exports = users
//    fix: keep module.exports = { users }
