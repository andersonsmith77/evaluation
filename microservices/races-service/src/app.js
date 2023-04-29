const express = require("express");
const races = require("../routes/races");

const app = express();

app.use("/api/v2/races", races);

module.exports = app;