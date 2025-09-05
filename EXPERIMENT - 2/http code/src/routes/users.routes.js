// routes/users.routes.js
const express = require("express");
const { listUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/users.controller");

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

// errors
// 1) Error: Route.get() requires a callback but got undefined
//    cause: wrong import or missing function
// 2) TypeError: Router is not a function
//    cause: forgot express.Router()
