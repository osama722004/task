const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path if necessary
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: "Email already registered" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).send({ error: "Username already taken" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: `${user.username}` });
  } catch (error) {
    res
      .status(400)
      .send({ error: "User registration failed", details: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: "Email not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send({ error: "Invalid password" });

    res.send({ message: `${user.username}` });
  } catch (error) {
    res.status(500).send({ error: "Login failed", details: error.message });
  }
});

module.exports = router;
