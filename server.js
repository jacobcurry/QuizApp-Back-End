const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongo");
});

// User Controller
const userController = require("./controllers/users_controller");
app.use("/", userController);

let PORT = 3000;
if (process.env.PORT) {
  PORT = process.ENV.PORT;
}
app.listen(PORT, () => {
  console.log("listening");
});
