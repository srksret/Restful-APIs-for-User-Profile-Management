
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

//route     POST api/admin/newUser
//desc      register new admin user
//access    public
router.post(
  "/",
  [
    check("firstname", "FirstName is Required").not().isEmpty(),
    check("lastname", "LastName is Required").not().isEmpty(),
    check("email", "Valid Email is Required").isEmail(),
    check("password", "Password must be minimum 8 characters").isLength({
      min: 8,
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let role = "admin";

    const {
        firstname,middlename,lastname,
        email,
        password,department
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "Admin User already exists" }] });
      }

      user = new User({
        firstname,middlename,lastname,
        email,
        password,department,
        role,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "krithika",
        { expiresIn: "60 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
