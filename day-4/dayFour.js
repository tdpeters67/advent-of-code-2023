let fs = require("fs");
let input = fs.readFileSync(`dayFour.txt`).toString();
let lines = input.split("\n");

function partOne() {
  let total = 0;
  for (let line of lines) {
    let [cardId, data] = line.split(": ");
    console.log(data);
    let [winningNumbersStr, drawnNumbersStr] = data.split(" | ");
    let winningNumbers = [];
    let drawnNumbers = [];

    let match;
    let pattern = /\d+/g;
    while ((match = pattern.exec(winningNumbersStr)) !== null) {
      winningNumbers.push(match[0]);
    }
    while ((match = pattern.exec(drawnNumbersStr)) !== null) {
      drawnNumbers.push(match[0]);
    }

    let count = 0;
    for (let winningNumber of winningNumbers) {
      if (drawnNumbers.includes(winningNumber)) {
        count++;
      }
    }

    total += count != 0 ? Math.pow(2, count - 1) : 0;
  }
  return total;
}

console.log(partOne());

function partTwo() {
  let total = 0;
  let cardInstances = {};
  for (let line of lines) {
    let [cardId, data] = line.split(": ");
    let [winningNumbersStr, drawnNumbersStr] = data.split(" | ");
    let winningNumbers = [];
    let drawnNumbers = [];

    let match;
    let pattern = /\d+/g;
    while ((match = pattern.exec(winningNumbersStr)) !== null) {
      winningNumbers.push(match[0]);
    }
    while ((match = pattern.exec(drawnNumbersStr)) !== null) {
      drawnNumbers.push(match[0]);
    }

    let count = 0;
    for (let winningNumber of winningNumbers) {
      if (drawnNumbers.includes(winningNumber)) {
        count++;
      }
    }
    cardInstances[cardId.replace("Card ", "").trim()] = count;
  }
  function cardCopy(input) {
    total++;
    const instancesCount = cardInstances[input];

    if (instancesCount != 0) {
      for (
        let i = parseInt(input) + 1;
        i <= parseInt(input) + instancesCount;
        i++
      ) {
        cardCopy(i);
      }
    }
  }
  for (let key of Object.keys(cardInstances)) {
    cardCopy(key);
  }
  return total;
}

console.log(partTwo());
