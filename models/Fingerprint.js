const mongoose = require("mongoose");

const fingerprintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fingerIndex: {
    type: String,
    enum: ["left_thumb", "right_thumb", "left_index", "right_index"],
    required: true,
  },
  template: {
    type: String, // encrypted fingerprint template
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "revoked"],
    default: "active",
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const Fingerprint = mongoose.model("Fingerprint", fingerprintSchema);

module.exports = Fingerprint;
