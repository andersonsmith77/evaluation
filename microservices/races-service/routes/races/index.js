
const express = require("express");

const router = express.Router();

const getData = require("../../utils/converter.js");

const logger = (message) => console.log(`Races Service: ${message}`);

const petsMicroserviceUrl = "http://pets:3000/api/v2/pets";
const prizesMicroserviceUrl = "http://prizes:4000/api/v2/prizes";

router.get("/", async (req, res) => {

  const data = await getData();
  
  const response = {
    service: "races",
    architecture: "microservices",
    data: data,
  };

  return res.send(response);
});

router.get("/creditedType/:creditedType(true|false|-)", async (req, res) => {
  const creditedType = req.params.creditedType;
  
  const data = await getData();

  let creditedTypePredicate;

  if (creditedType === "true") {
    creditedTypePredicate = pet => pet.acreditado === "true";
  }

  if (creditedType === "false") {
    creditedTypePredicate = pet => pet.acreditado === "false";
  }

  if (creditedType === "-") {
    creditedTypePredicate = pet => pet.acreditado === "-";
  }

  if (!creditedTypePredicate) {
    return res.status(400).send("Invalid creditedType parameter");
  }

  const raceList = data.filter(creditedTypePredicate);

  let petList;
  let prizeList;

  try {
    const pets = await axios.get(`${petsMicroserviceUrl}/`);
    petList = pets.data.data;

  } catch (error) {
    console.log(error);
    return res.status(500).send("Error trying to communicate with the pets service.");
  }

  try {
    const prizes = await axios.get(`${prizesMicroserviceUrl}/`);
    prizeList = prizes.data.data;

  } catch (error) {
    console.log(error);
    return res.status(500).send("Error trying to communicate with the prizes service.");
  }

  const winnerPets = petList.filter(pet => {
    return raceList.some(race => {
      return race.race === pet.race;
    })
  })

  const prizesWon = prizeList.filter(prize => {
    return petList.some(pet => {
      return pet.Id === prize.id_campeon;
    })
  })

  const response = {
    service: "races",
    architecture: "microservices",
    data: {
      petCredited: petList,
      prizeWon: prizesWon
    },
  }

  return res.send(response);
})

module.exports = router;