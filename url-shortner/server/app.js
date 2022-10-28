const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.get("/url/:id", (req, res) => {
  //create a short url by id
});

app.get("/:id", (req, res) => {
  //create a short url by id
});

app.post("/url", (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log("connected to server");
});
