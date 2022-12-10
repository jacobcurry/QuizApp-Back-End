const bcrypt = require("bcrypt");
const express = require("express");
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

router.post("/login", async (req, res) => {
  res.json({ mssg: "login user" });
});

router.post("/createaccount", async (req, res) => {
  res.json({ mssg: "signup user" });
});

module.exports = router;
