
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

module.exports = router;