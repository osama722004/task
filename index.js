const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  "mongodb+srv://osamazaid821:6OTZWIVxujIf7qbn@cluster0.uiq1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("Database connection error:", err));
