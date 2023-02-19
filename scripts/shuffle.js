const fs = require("fs");

const FILE_NAME = process.argv.slice(2)[0];

function getShuffledArr(arr) {
  return arr.reduce(
    (newArr, _, i) => {
      var rand = i + Math.floor(Math.random() * (newArr.length - i));
      [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
      return newArr;
    },
    [...arr]
  );
}

let fileData = JSON.parse(
  fs.readFileSync("../src/assets/data/legends/" + FILE_NAME + ".json", "utf8")
);
let players = fileData.players;

fileData.players = getShuffledArr(players);

fs.writeFileSync(
  "../src/assets/data/legends/" + FILE_NAME + ".json",
  JSON.stringify(fileData, null, 2)
);

console.log("Shuffle complete!");
