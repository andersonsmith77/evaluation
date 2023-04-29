
const express = require("express");

const router = express.Router();

const data = require("../../data/datos_perro.json");

const logger = (message) => console.log(`Pets Service: ${message}`);

router.get("/", (req, res) => {
  
  const response = {
    service: "pets",
    architecture: "microservices",
    data: data,
  };

  return res.send(response);
});

router.get("/", (req, res) => {
  
  const response = {
    service: "pets",
    architecture: "microservices",
    data: data,
  };

  return res.send(response);
});

module.exports = router;