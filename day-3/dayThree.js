// find all number positions
// find all symbol positions
//compare the two positions to check for valid adjacency
//sum

let fs = require("fs");
let input = fs.readFileSync(`dayThree.txt`).toString();

// const entities = [];

// for (let [y, line] of input.split("\n").entries()) {
//   for (let m of line.matchAll(/\d+/g)) {
//     entities.push({
//       type: "number",
//       x: m.index,
//       y,
//       token: m[0],
//       value: parseInt(m[0]),
//     });
//   }
//   for (let m of line.matchAll(/[^0-9\.]/g)) {
//     entities.push({ type: "symbol", x: m.index, token: m[0] });
//   }
// }

// const findAdjacent = (numberEntity, symbolEntity) => {
//   const xLeft = numberEntity.x - 1;
//   const xRight = numberEntity.x + numberEntity.token.length;
//   const yUp = numberEntity.y - 1;
//   const yDown = numberEntity.y + 1;
//   return (
//     symbolEntity.x >= xLeft &&
//     symbolEntity.x <= xRight &&
//     symbolEntity.y >= yUp &&
//     symbolEntity.y <= yDown
//   );
// };

// function findAnswer() {
//   const numbers = entities.filter((e) => e.type === "number");
//   const symbols = entities.filter((e) => e.type === "symbol");

//   return numbers
//     .filter((n) => symbols.some((s) => findAdjacent(n, s)))
//     .map((n) => n.value)
//     .reduce((a, b) => a + b, 0);
// }

// findAnswer();
// console.log(entities);

const adjacent = (numberEntity, symbolEntity) => {
  const x0 = numberEntity.x - 1;
  const x1 = numberEntity.x + numberEntity.token.length;
  const y0 = numberEntity.y - 1;
  const y1 = numberEntity.y + 1;
  return (
    symbolEntity.x >= x0 &&
    symbolEntity.x <= x1 &&
    symbolEntity.y >= y0 &&
    symbolEntity.y <= y1
  );
};

const parse = (s) => {
  const entities = [];
  for (const [y, line] of s.split("\n").entries()) {
    for (const m of line.matchAll(/\d+/g))
      entities.push({
        type: "number",
        x: m.index,
        y,
        token: m[0],
        value: parseInt(m[0]),
      });

    for (const m of line.matchAll(/[^0-9\.]/g))
      entities.push({ type: "symbol", x: m.index, y, token: m[0] });
  }
  console.log(entities);
  return entities;
};

const part1 = (s) => {
  const entities = parse(s);
  const numbers = entities.filter((e) => e.type === "number");
  const symbols = entities.filter((e) => e.type === "symbol");

  return numbers
    .filter((n) => symbols.some((s) => adjacent(n, s)))
    .map((n) => n.value)
    .reduce((a, b) => a + b, 0);
};

const part2 = (s) => {
  const entities = parse(s);
  const numbers = entities.filter((e) => e.type === "number");
  const symbols = entities.filter((e) => e.type === "symbol");

  return symbols
    .filter((s) => s.token === "*")
    .map((s) => {
      const adjacentNumbers = numbers
        .filter((n) => adjacent(n, s))
        .map((n) => n.value);
      return adjacentNumbers.length === 2
        ? adjacentNumbers[0] * adjacentNumbers[1]
        : 0;
    })
    .reduce((a, b) => a + b, 0);
};

console.log(part2(input));
