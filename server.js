const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ex-quiz-ite.netlify.app"],
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongo");
});

// User Controller
const userController = require("./controllers/users_controller");
app.use("/", userController);
// Quiz Data Controller
const quizDataController = require("./controllers/quizData_controller");
app.use("/quiz", quizDataController);

let PORT = 3000;
if (process.env.PORT) {
  PORT = process.env.PORT;
}
app.listen(PORT, () => {
  console.log("listening");
});
