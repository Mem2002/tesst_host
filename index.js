require("dotenv").config();
const connection = require("./config/db.config");
const express = require("express");
const authRouter = require("./routes/auth");
//npm i mongoose
//để dùng mongoose
// const mongoose = require("mongoose");
const Product = require("./models/user");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//connect to mongoose
const port = process.env.PORT || 8888;
// const hostname = process.env.HOST_NAME;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRouter);

app.listen(port, async () => {
  try {
    await connection();
    console.log(`App is running at ${port}`);
  } catch (err) {
    console.log(">>> Error connect to DB", err);
    console.log(">>> Err when starting server: " + err);
  }
});
