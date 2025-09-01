const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true, // can be UUID or phone/email based
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  biometric_enabled: {
    type: Boolean,
    default: false,
  },
  date_of_birth: {
    type: Date,
    required: false,
  },
  device_info: {
    device_id: { type: String, default: null },
    device_model: { type: String, default: null },
    os: { type: String, default: null },
    last_ip: { type: String, default: null },
  },
  kyc_status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  country: {
    type: String,
    required: true,
  },
  profile_picture_url: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  last_login_at: {
    type: Date,
    default: null,
  },
});

// auto-update `updated_at`
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
