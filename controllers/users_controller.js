const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const users = require("../models/users");
const router = express.Router();
const User = require("../models/users");

// router.get("/", (req, res) => {
//   res.send(req.session.currentUser);
// });

// router.post("/createaccount", (req, res) => {
//   req.body.password = bcrypt.hashSync(
//     req.body.password,
//     bcrypt.genSaltSync(10)
//   );
//   User.create(req.body, (err, createdUser) => {
//     if (err) {
//       res.json(err.message);
//     } else {
//       req.session.currentUser = createdUser;

//       res.json(req.session.currentUser);
//     }
//   });
// });

// router.put("/login", (req, res) => {
//   User.findOne({ email: req.body.email }, (err, foundUser) => {
//     if (err) {
//       res.json(err.message);
//     } else {
//       if (!foundUser) {
//         res.json({
//           message: "We could not find that email, please try again.",
//         });
//       } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//         req.session.currentUser = createdUser;
//         res.json(req.session.currentUser);
//       } else {
//         res.json({
//           message: "Password was incorrect, please try again.",
//         });
//       }
//     }
//   });
// });

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/createaccount", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.signup(firstname, lastname, email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
