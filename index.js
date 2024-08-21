const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000 || process.env.PORT;
const MONGO_URI =
  "mongodb+srv://osamazaid821:6OTZWIVxujIf7qbn@cluster0.uiq1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("err"));
//6OTZWIVxujIf7qbn pass
//osamazaid821 user
/**
 * 
 * 
 * {
  "username": "exampleUser",
  "email": "example@example.com",
  "password": "examplePassword"
}

 */
