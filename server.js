const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongo");
});

let PORT = 3000;
if (process.env.PORT) {
  PORT = process.ENV.PORT;
}
app.listen(PORT, () => {
  console.log("listening");
});
