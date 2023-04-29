const express = require("express");
const prizes = require("../routes/prizes");

const app = express();

app.use("/api/v2/prizes", prizes);

module.exports = app;