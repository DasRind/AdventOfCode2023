const fs = require("fs").promises;
const boundaries = new Map([
  ["red", 12],
  ["green", 13],
  ["blue", 14],
]);

// Part 1

/* e.g. [
  'Game 100',
  ' 2 red, 13 blue, 1 green',
  ' 1 green, 12 blue',
  ' 1 red, 5 blue, 1 green',
  ' 3 blue, 3 red'
]
*/
function checkTurn(turns) {
  for (let i = 1; i < turns.length; i++) {
    const colors = turns[i].split(",");
    for (let color of colors) {
      color = color.replace(/\s/g, "");
      let number = "";
      breakMe: for (let char of color) {
        if (!isNaN(char)) {
          number += char;
        } else {
          numberToCheck = parseFloat(number);
          switch (char) {
            case "r":
              if (numberToCheck > boundaries.get("red")) return false;
              break breakMe;
            case "g":
              if (numberToCheck > boundaries.get("green")) return false;
              break breakMe;
            case "b":
              if (numberToCheck > boundaries.get("blue")) return false;
              break breakMe;
          }
        }
      }
    }
  }
  return true;
}

async function dateiLesen() {
  const dateipfad = "Input.txt";

  const daten = await fs.readFile(dateipfad, "utf8");

  const zeilen = daten.split("\n");
  let result = 0;

  // const test =
  //   "Game 1: 12 blue, 15 red, 2 green; 17 red, 8 green, 5 blue; 8 red, 17 blue; 9 green, 1 blue, 4 red";
  // const test2 = " 12 blue";
  // const test3 = " 12 blue, 3 green";
  // console.log(test2.split(","), test3.split(","));
  // console.log(test2.split(",")[0].replace(/ /g, ""));

  for (const zeile of zeilen) {
    const turns = zeile.split(/[;:]/);
    if (checkTurn(turns)) result += parseInt(turns[0].split(" ")[1]);
  }
  console.log(result);
}

dateiLesen();

// Part 2

/* e.g. [
  'Game 100',
  ' 2 red, 13 blue, 1 green',
  ' 1 green, 12 blue',
  ' 1 red, 5 blue, 1 green',
  ' 3 blue, 3 red'
]
*/
function checkTurn2(turn) {
  let maxRed = 1;
  let maxGreen = 1;
  let maxBlue = 1;
  for (let i = 1; i < turn.length; i++) {
    const colors = turn[i].split(",");
    for (let color of colors) {
      color = color.replace(/\s/g, "");
      let number = "";
      breakMe: for (let char of color) {
        if (!isNaN(char)) {
          number += char;
        } else {
          numberToCheck = parseFloat(number);
          switch (char) {
            case "r":
              if (numberToCheck > maxRed) maxRed = numberToCheck;
              break breakMe;
            case "g":
              if (numberToCheck > maxGreen) maxGreen = numberToCheck;
              break breakMe;
            case "b":
              if (numberToCheck > maxBlue) maxBlue = numberToCheck;
              break breakMe;
          }
        }
      }
    }
  }

  return maxRed * maxBlue * maxGreen;
}

async function dateiLesen2() {
  const dateipfad = "Input.txt";

  const daten = await fs.readFile(dateipfad, "utf8");

  const zeilen = daten.split("\n");
  let result = 0;

  // const test =
  //   "Game 1: 12 blue, 15 red, 2 green; 17 red, 8 green, 5 blue; 8 red, 17 blue; 9 green, 1 blue, 4 red";
  // const test2 = " 12 blue";
  // const test3 = " 12 blue, 3 green";
  // console.log(test2.split(","), test3.split(","));
  // console.log(test2.split(",")[0].replace(/ /g, ""));

  for (const zeile of zeilen) {
    const turn = zeile.split(/[;:]/);
    result += checkTurn2(turn);
  }
  console.log(result);
}

dateiLesen2();
