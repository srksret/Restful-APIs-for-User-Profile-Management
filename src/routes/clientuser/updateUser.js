const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const requireSignin = require("../../middleware/requireSignin");

router.put("/:id", requireSignin, (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(
    (err, us) => {
      if (err) {
        return res.status(400).json({ msg: "Error", err: err });
      } else {
        return res.status(200).json({ us });
      }
    }
  );
});

module.exports = router;
