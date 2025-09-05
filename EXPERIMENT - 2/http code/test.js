const http = require("http");
const assert = require("assert");

const BASE_URL = "http://localhost:3000";

// helper to make requests
function request(method, path, data) {
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : null;

    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };

    const req = http.request(BASE_URL + path, options, res => {
      let chunks = "";
      res.on("data", d => (chunks += d));
      res.on("end", () => {
        try {
          const json = chunks ? JSON.parse(chunks) : {};
          resolve({ status: res.statusCode, body: json });
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", reject);

    if (body) req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log("🔍 Running API tests...");

  // 1. List users
  let res = await request("GET", "/api/users");
  assert.strictEqual(res.status, 200);
  console.log("✅ GET /api/users ->", res.body.count, "users");

  // 2. Create user
  res = await request("POST", "/api/users", { name: "Charlie", active: true });
  assert.strictEqual(res.status, 201);
  const userId = res.body.id;
  console.log("✅ POST /api/users -> created user:", userId);

  // 3. Get user by ID
  res = await request("GET", `/api/users/${userId}`);
  assert.strictEqual(res.status, 200);
  console.log("✅ GET /api/users/:id ->", res.body.name);

  // 4. Update user
  res = await request("PUT", `/api/users/${userId}`, { active: false });
  assert.strictEqual(res.status, 200);
  console.log("✅ PUT /api/users/:id -> updated active:", res.body.active);

  // 5. Delete user
  res = await request("DELETE", `/api/users/${userId}`);
  assert.strictEqual(res.status, 200);
  console.log("✅ DELETE /api/users/:id ->", res.body.message);

  // 6. Get deleted user (should 404)
  res = await request("GET", `/api/users/${userId}`);
  assert.strictEqual(res.status, 404);
  console.log("✅ GET deleted user -> 404 confirmed");

  console.log("🎉 All tests passed!");
}

runTests().catch(err => {
  console.error(" Test failed:", err.message);
});
