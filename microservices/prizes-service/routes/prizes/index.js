const express = require("express");

const router = express.Router();

const getChampionships = require("../../data/connection.js");

const logger = (message) => console.log(`Prizes Service: ${message}`);

router.get("/", async (req, res) => {

  const data = await getChampionships();
  const championships = JSON.parse(data);
  
  const response = {
    service: "prizes",
    architecture: "microservices",
    data: championships
  };

  return res.send(response);
});

module.exports = router;