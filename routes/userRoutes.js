const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
