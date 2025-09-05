const http = require("http");
const url = require("url");
const { listUsers, getUserById, createUser, updateUser, deleteUser } = require("./controllers/users.controller");

const PORT = 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  if (path === "/api/users" && method === "GET") {
    return listUsers(req, res);
  }

  if (path === "/api/users" && method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        createUser(req, res, data);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // routes with ID
  const userIdMatch = path.match(/^\/api\/users\/(.+)$/);
  if (userIdMatch) {
    const userId = userIdMatch[1];

    if (method === "GET") return getUserById(req, res, userId);

    if (method === "PUT") {
      let body = "";
      req.on("data", chunk => (body += chunk));
      req.on("end", () => {
        try {
          const data = JSON.parse(body || "{}");
          updateUser(req, res, userId, data);
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
      });
      return;
    }

    if (method === "DELETE") return deleteUser(req, res, userId);
  }

  // fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
