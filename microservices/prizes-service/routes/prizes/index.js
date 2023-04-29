const express = require("express");
const axios = require("axios");

const router = express.Router();

const getChampionships = require("../../data/connection.js");

const logger = (message) => console.log(`Prizes Service: ${message}`);

const petsMicroserviceUrl = "http://pets:3000/api/v2/pets";

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

router.get("/petName/:petName", async (req, res) => {
  const petName = req.params.petName;

  const data = await getChampionships();
  const championships = JSON.parse(data);

  let pet;
  

  try {
    const pets = await axios.get(`${petsMicroserviceUrl}/searchPetByName/${petName}`);
    pet = pets.data.data;

  } catch (error) {
    console.log(error);
    return res.status(500).send("Error trying to communicate with the pets service.");
  }
  console.log({pet})
  console.log({championships})

  const prizesWonList = championships.filter(championship => {
    return championship.id === pet.Id;
  })
  
  const response = {
    service: "prizes",
    architecture: "microservices",
    data: {
      pet: pet,
      prizesWonList: prizesWonList
    }
  };

  return res.send(response);
});

module.exports = router;