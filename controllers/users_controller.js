const bcrypt = require("bcrypt");
const express = require("express");
const users = require("../models/users");
const router = express.Router();
const User = require("../models/users");

router.post("/createaccount", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json(createdUser);
    }
  });
});

router.put("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      res.json(err.message);
    } else {
      if (!foundUser) {
        res.json({
          message: "We could not find that email, please try again.",
        });
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({ user: foundUser });
      } else {
        res.json({
          message: "We could not find that email, please try again.",
        });
      }
    }
  });
});

module.exports = router;
