require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./router/userRouter");
app.use("/api/v1", userRouter);

app.use("/", (req, res) => {
  res.send("<h2>Testing</h2>");
});

module.exports = app;
