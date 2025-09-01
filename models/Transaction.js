const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromWalletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    default: null,
  },
  toWalletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    default: null,
  },
  bankAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    default: null,
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    default: null,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "GBP",
  },
  transactionType: {
    type: String,
    enum: ["payment", "topup", "withdrawal", "refund", "transfer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "reversed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
