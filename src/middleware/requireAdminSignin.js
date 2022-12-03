const jwt = require("jsonwebtoken");
const env = require("dotenv");
const User = require("../models/User");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT,async (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
       const tempUser = await User.findById(decoded.user.id).select(
          "-password"
        );
        if (tempUser.role == "admin") {
          req.user = decoded.user;
          next();
        } else {
          return res.status(401).json({ msg: "Access Dennied" });
        }
      }
    });
  } catch (err) { 
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
