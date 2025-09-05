const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./src/routes/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Users API is live" });
});

app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// errors
// 1) Error: Cannot find module 'express'
//    fix: npm install express
// 2) Cannot GET /api/users
//    fix: add router or correct path
// 3) req.body undefined
//    fix: add app.use(express.json())
