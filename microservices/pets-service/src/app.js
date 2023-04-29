const express = require("express");
const pets = require("../routes/pets");

const app = express();

app.use("/api/v2/pets", pets);

module.exports = app;