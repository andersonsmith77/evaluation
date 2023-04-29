const csvToJson = require("csvtojson");
const csvFilePath = "./data/raza_info.csv";

const getData = async () => {
  const jsonData = await csvToJson({
    colParser: {
        color_de_pelo: (item) => {
        const color = item.split("; ");
        return color;
      },
    },
  }).fromFile(csvFilePath)

  return jsonData;
}

module.exports = getData;