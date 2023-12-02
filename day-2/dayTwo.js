let fs = require("fs");
let input = fs.readFileSync(`dayTwo.txt`).toString();

function partOneFunction() {
  let partOneTotal = 0;

  for (let game of input.split("\n")) {
    let test = true;
    let [gameId, gameData] = game.split(": ");
    for (let round of gameData.split("; ")) {
      let maxCount = {
        red: 12,
        green: 13,
        blue: 14,
      };
      for (let cube of round.split(", ")) {
        let [count, color] = cube.split(" ");
        maxCount[color] -= parseInt(count);

        for (let key of Object.keys(maxCount)) {
          if (maxCount[key] < 0) {
            test = false;
            break;
          }
        }
      }
    }
    if (test) {
      partOneTotal += parseInt(gameId.split(" ")[1]);
    }
  }
  return partOneTotal;
}
console.log(partOneFunction());

function partTwoFunction() {
  let partTwoTotal = 0;

  for (let game of input.split("\n")) {
    let [gameId, gameData] = game.split(": ");
    let rollingCount = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let round of gameData.split("; ")) {
      let currentCount = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for (let cube of round.split(", ")) {
        let [count, color] = cube.split(" ");
        currentCount[color] += parseInt(count);

        for (let key of Object.keys(currentCount)) {
          if (currentCount[key] > rollingCount[key]) {
            rollingCount[key] = currentCount[key];
          }
        }
      }
    }

    partTwoTotal += rollingCount.red * rollingCount.blue * rollingCount.green;
  }
  return partTwoTotal;
}

console.log(partTwoFunction());
