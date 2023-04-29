const server = require("./src/app");

server.listen(process.env.PORT || 3000, () => {

  console.log(`Pets Service working in port: ${process.env.PORT || 3000}`); 
});