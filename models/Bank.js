const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String, // encrypted
    required: true,
  },
  sortCode: {
    type: String, // encrypted
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended", "closed"],
    default: "active",
  },
  linkedAt: {
    type: Date,
    default: Date.now,
  },
});

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
