const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardNetwork: {
    type: String,
    enum: ["Visa", "Mastercard", "Amex", "Discover"],
    required: true,
  },
  cardNumber: {
    type: String, // tokenized or encrypted
    required: true,
  },
  last4: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String, // MM/YY format (encrypted in production)
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "expired", "suspended"],
    default: "active",
  },
  linkedAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
