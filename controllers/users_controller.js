const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const users = require("../models/users");
const router = express.Router();
const User = require("../models/users");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.getUser(email);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await User.deleteUser(email);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:email", async (req, res) => {
  const emailParam = req.params.email;
  const { firstname, lastname, email, password } = req.body;
  try {
    const updatedUser = await User.updateUser(
      emailParam,
      firstname,
      lastname,
      email,
      password
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
