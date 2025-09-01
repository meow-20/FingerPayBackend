const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "GBP",
  },
  status: {
    type: String,
    enum: ["active", "frozen"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
