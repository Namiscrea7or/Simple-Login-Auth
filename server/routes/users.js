const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const verifyToken = require("../middleware/auth");

const User = require("../models/User");

// @route GET api/user/info
// @desc Get user infomation
// @access Private
router.get("/profile", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("email createdAt");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.json({
        success: true,
        user: {
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  
  module.exports = router;