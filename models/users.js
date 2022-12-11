const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
});

userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  password
) {
  //validation
  if (!email || !password || !firstname || !lastname) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password not strong enough, must be a minimum of eight characters and must contain at least one number and one symbol "
    );
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstname,
    lastname,
    email,
    password: hash,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

//static getuser info method
userSchema.statics.getUser = async function (email) {
  const user = await this.findOne({ email });

  return user;
};

//static method delete user
userSchema.statics.deleteUser = async function (email) {
  const deletedUser = await this.findOneAndDelete({ email });

  return deletedUser;
};

//static method update user
userSchema.statics.updateUser = async function (
  emailParam,
  firstname,
  lastname,
  email
) {
  //validation
  if (!email || !firstname || !lastname) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email must be different");
  }

  const updatedUser = await this.findOneAndUpdate(
    { emailParam },
    { firstname, lastname, email }
  );
  return updatedUser;
};

module.exports = mongoose.model("User", userSchema);
