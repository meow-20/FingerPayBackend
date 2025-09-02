require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
// const walletRoutes = require("./routes/walletRoutes");
// const bankRoutes = require("./routes/bankRoutes");
// const cardRoutes = require("./routes/cardRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// middleware
app.use(express.json());

// database
connectDB();

app.get("/", (req, res) => res.send("FingerPay Backend Running"));

// routes
app.use("/api/users", userRoutes);
// app.use("/api/wallets", walletRoutes);
// app.use("/api/banks", bankRoutes);
// app.use("/api/cards", cardRoutes);
// app.use("/api/transactions", transactionRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
