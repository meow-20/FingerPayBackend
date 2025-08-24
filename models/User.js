// In-memory or DB user schema and storage

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String, //phone number
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  encryptedFingerprint: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    required: true,
  },
  fingerprintHash: {
    type: String,
    default: null,
  },
  onlyForTesting: {
    type: String,
    require: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  bank: {
    accountNumber: { type: String, default: null },
    bankName: { type: String, default: null },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
