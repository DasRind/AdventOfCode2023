const fs = require("fs").promises;

// Part 1

async function dateiLesen() {
  const dateipfad = "Input.txt";

  const daten = await fs.readFile(dateipfad, "utf8");

  const zeilen = daten.split(/\n/g);
  let result = 0;
  const turns = [];

  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {
    const nummerUndZug = zeilen[indexZ].split(":");
    turns.push(nummerUndZug[1]);
    const winningNumbers = nummerUndZug[1].split("|")[0].trim().split(/\s+/g);
    const myNumbers = nummerUndZug[1].split("|")[1].trim().split(/\s+/g);

    const winCount = 0;
    for (const number of myNumbers) {
      if (winningNumbers.includes(number)) {
        winCount++;
      }
    }

    if (winCount > 0) result += Math.pow(2, winCount - 1);

    console.log(winningNumbers);
    console.log(myNumbers);
  }

  console.log(result);
}

dateiLesen();

// Part 2
/*
const fs = require("fs").promises;

async function dateiLesen() {
  const dateipfad = "Input.txt";

  const daten = await fs.readFile(dateipfad, "utf8");

  const zeilen = daten.split(/\n/g);
  let result = 0;
  const turnCopies = [];

  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {
    if (turnCopies.length - 1 < indexZ) {
      turnCopies.push(0);
    }
    // turns.push(nummerUndZug[1]);
    const nummerUndZug = zeilen[indexZ].split(":");
    const winningNumbers = nummerUndZug[1].split("|")[0].trim().split(/\s+/g);
    const myNumbers = nummerUndZug[1].split("|")[1].trim().split(/\s+/g);

    let winCount = 0;
    for (const number of myNumbers) {
      if (winningNumbers.includes(number)) {
        winCount++;
      }
    }

    if (indexZ > 202) console.log(turnCopies[indexZ], winCount);
    for (let j = 0; j <= turnCopies[indexZ]; j++) {
      for (let i = 1; i <= winCount; i++) {
        if (turnCopies.length <= indexZ + i) {
          // console.log(
          //   "was ist hier falsch:",
          //   turnCopies.length - 1,
          //   indexZ + i
          // );
          turnCopies.push(1);
        } else {
          turnCopies[indexZ + i] += 1;
        }
      }
    }

    // console.log(winningNumbers);
    // console.log(myNumbers);
  }

  for (let x = 0; x < zeilen.length; x++) {
    result += turnCopies[x] + 1;
  }

  console.log(turnCopies);
  console.log("result:", result);
  // console.log(turnCopies);
  // console.log(turnCopies.length);
}

dateiLesen();

*/
