const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { userId, fullname, token, onlyForTesting, bank } = req.body;

    // Optional: check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // ✅ Use destructured values, not raw fullname
    const user = new User({
      userId,
      fullname,
      token,
      onlyForTesting,
      bank: bank || null,
      encryptedFingerprint: null,
      fingerprintHash: null,
      walletBalance: 0,
    });

    await user.save();
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    console.log("📩 Incoming body:", req.body);

    // Find user by phone number
    const user = await User.findOne({ userId });

    console.log(userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Check password (stored in onlyForTesting for now)
    if (user.onlyForTesting?.trim() !== password?.trim()) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Login successful
    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
