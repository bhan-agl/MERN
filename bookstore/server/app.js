const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/book-route");

const app = express();
app.use(express.json());

app.use("/books", router);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("Database Connection Failed " + err);
  });
