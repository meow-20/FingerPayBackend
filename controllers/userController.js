const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 📌 Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, phone_number, first_name, last_name, password, country } =
      req.body;

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone_number }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      user_id: uuidv4(), // dummy unique ID
      email,
      phone_number,
      first_name,
      last_name,
      password_hash,
      country,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // update last login
    user.last_login_at = new Date();
    await user.save();

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password_hash");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body; // e.g., { first_name, last_name, country, device_info }

    // Only allow certain fields to be updated
    const allowedFields = [
      "first_name",
      "last_name",
      "country",
      "device_info",
      "biometric_enabled",
      "profile_picture_url",
      "date_of_birth"
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) updateData[field] = updates[field];
    });

    updateData.updated_at = Date.now();

    const user = await User.findOneAndUpdate(
      { user_id: req.user_id },
      updateData,
      { new: true, runValidators: true }
    ).select("-password_hash");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
