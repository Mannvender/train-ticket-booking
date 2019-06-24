const express = require("express");
const path = require("path");
const cors = require("cors");
const app = require("./app");
const {
  SERVER: { PORT }
} = require("./config");
const trainRoute = require("./train-api");
require("./connection");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/trains", trainRoute);

app.listen(PORT, () =>
  console.log(`Yo dawg! Server's at http://localhost:${PORT}`)
);
