const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//==============================================REGISTER================================================================

// @route POST api/auth/register_guest
// @desc Register user (Guest)
// @access Public
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing email and/or password" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "Email already taken" });
    }

    // Hash password and create new user
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing email and/or password" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Incorrect email or password" });
    }

    // Verify password
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({ success: false, message: "Incorrect email or password" });
    }

    // Generate token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "User logged in successfully",
      user: {
        email: user.email,
        createdAt: user.createdAt,
      },
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router