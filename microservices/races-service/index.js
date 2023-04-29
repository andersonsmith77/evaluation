const server = require("./src/app");

server.listen(process.env.PORT || 5000, () => {

  console.log(`Races Service working in port: ${process.env.PORT || 5000}`); 
});