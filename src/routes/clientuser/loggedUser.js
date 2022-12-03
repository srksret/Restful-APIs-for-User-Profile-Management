const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const requireSignin = require("../../middleware/requireSignin");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const env = require("dotenv");

router.get("/", requireSignin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({ user, id: req.user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
