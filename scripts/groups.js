const fs = require("fs");

const FILE_NAME = process.argv.slice(2)[0];

const addGroup = (players) => {
  let gtr = {
    Qatar: "A",
    Ecuador: "A",
    Senegal: "A",
    Netherlands: "A",
    England: "B",
    Iran: "B",
    "United States": "B",
    Wales: "B",
    Argentina: "C",
    "Saudi Arabia": "C",
    Mexico: "C",
    Poland: "C",
    France: "D",
    Australia: "D",
    Denmark: "D",
    Tunisia: "D",
    Spain: "E",
    "Costa Rica": "E",
    Germany: "E",
    Japan: "E",
    Belgium: "F",
    Canada: "F",
    Morocco: "F",
    Croatia: "F",
    Brazil: "G",
    Serbia: "G",
    Switzerland: "G",
    Cameroon: "G",
    Portugal: "H",
    Ghana: "H",
    Uruguay: "H",
    "Korea Republic": "H",
  };

  return players.map((dt) => {
    return {
      ...dt,
      group: gtr[dt.nation_name],
    };
  });
};

let fileData = JSON.parse(
  fs.readFileSync("../src/assets/data/" + FILE_NAME + ".json", "utf8")
);
let players = fileData.players;

fileData.players = addGroup(players);

fs.writeFileSync(
  "../src/assets/data/" + FILE_NAME + ".json",
  JSON.stringify(fileData, null, 2)
);

console.log("Group added!");
