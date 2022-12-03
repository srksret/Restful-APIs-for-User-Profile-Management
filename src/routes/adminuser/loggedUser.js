const express = require("express");
const router = express.Router();
const requireAdminSignin = require("../../middleware/requireAdminSignin");
const requireSignin = require("../../middleware/requireSignin");
const User = require("../../models/User");

router.get("/", requireSignin, requireAdminSignin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user, id: req.user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
