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
