
const express = require("express");

const router = express.Router();

const getData = require("../../utils/converter.js");

const logger = (message) => console.log(`Races Service: ${message}`);

router.get("/", async (req, res) => {

  const data = await getData();
  
  const response = {
    service: "races",
    architecture: "microservices",
    data: data,
  };

  return res.send(response);
});

module.exports = router;