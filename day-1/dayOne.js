let fs = require("fs");
let input = fs.readFileSync(`dayOne.txt`).toString();

let total = 0;

const numberLetters = {
  one: "one1one",
  two: "two2two",
  three: "three3three",
  four: "four4four",
  five: "five5five",
  six: "six6six",
  seven: "seven7seven",
  eight: "eight8eight",
  nine: "nine9nine",
};

for (let line of input.split("\n")) {
  for (let num of Object.keys(numberLetters)) {
    line = line.replaceAll(num, numberLetters[num]);
  }

  const numbers = line.split("").filter((el) => !isNaN(parseInt(el)));
  total += parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
}
console.log(total);
