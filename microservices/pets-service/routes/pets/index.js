
const express = require("express");

const router = express.Router();

const axios = require("axios");

const data = require("../../data/datos_perro.json");

const logger = (message) => console.log(`Pets Service: ${message}`);

const racesMicroserviceUrl = "http://races:5000/api/v2/races";

router.get("/", (req, res) => {
  
  const response = {
    service: "pets",
    architecture: "microservices",
    data: data,
  };

  return res.send(response);
});

router.get("/race/:race/ownerName/:ownerName", (req, res) => {
  const race = req.params.race;
  const ownerName = req.params.ownerName;

  const petList = data.filter(pet => {
    return pet.raza === race && pet.nombre_dueno == ownerName;
  });
  
  const response = {
    service: "pets",
    architecture: "microservices",
    data: petList,
  };

  return res.send(response);
});

router.get("/raceAverageWeight/:race", (req, res) => {
  const race = req.params.race;

  const petList = data.filter(pet => {
    return pet.raza === race;
  });

  console.log({petList});

  const totalWeight = petList.reduce((acc, pet) => acc + pet.peso, 0);
  const averageWeight = totalWeight / petList.length;
  
  const response = {
    service: "pets",
    architecture: "microservices",
    data: {
      raceAverageWeight: averageWeight
    },
  };

  return res.send(response);
});

router.get("/searchPetByName/:petName", (req, res) => {
  const petName = req.params.petName;

  const pet = data.find(pet => {
    return pet.nombre_perro === petName;
  });
  
  const response = {
    service: "pets",
    architecture: "microservices",
    data: pet,
  };

  return res.send(response);
});

router.get("/weightGrouping/", async (req, res) => {
  let pets = data.sort((a, b) => a.peso - b.peso);

  const theTenHeaviestPetsRaces = pets.slice(0, 10).map(pet => pet.raza);

  let raceList;

  try{
    const races = await axios.get(`${racesMicroserviceUrl}`);
    raceList = races.data.data;

  } catch (error) {
    console.log(error);
    return res.status(500).send("Error trying to communicate with the races service.");
  }

  const racesInfo = raceList.filter(race => theTenHeaviestPetsRaces.includes(race.raza));

  const response = {
    service: "pets",
    architecture: "microservices",
    data: {
      racesInfo: racesInfo
    },
  };

  return res.send(response);
});

module.exports = router;