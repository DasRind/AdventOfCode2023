const fs = require("fs").promises; // Beachte die Verwendung von fs.promises für Promisified-Methoden

// Part 1

async function dateiLesen() {
  const dateipfad = "input.txt";

  try {
    const daten = await fs.readFile(dateipfad, "utf8");

    const zeilen = daten.split("\n");
    let result = 0;

    for (const zeile of zeilen) {
      let resultI = "";
      let resultJ = "";
      let i = 0;
      let j = zeile.length - 1;

      while (i <= j) {
        if (!isNaN(zeile[i])) {
          if (resultI == "") resultI += zeile[i];
        } else {
          i++;
        }

        if (!isNaN(zeile[j])) {
          if (resultJ == "") resultJ += zeile[j];
        } else {
          j--;
        }

        if (resultI != "" && resultJ != "") {
          break;
        }
      }

      result += parseInt(resultI + resultJ);
    }

    console.log(result);

    // Hier kannst du weitere Operationen mit den Daten durchführen
  } catch (err) {
    console.error(err);
  }
}

// Aufruf der Funktion
dateiLesen();

// Part 2

const numbers = [
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
];

const teste = "jvvslnkdk6qnfzjzvseight55eight";
console.log(teste.lastIndexOf("eight"));

function isThisANumber(zeile, index) {
  for (const number of numbers[0]) {
    const firstIndex = zeile.indexOf(number);
    const lastIndexOfFirst = firstIndex + number.length - 1;
    if (firstIndex != -1 && index >= firstIndex && index <= lastIndexOfFirst) {
      const numberAsNumber = numbers[1][numbers[0].indexOf(number)];
      return numberAsNumber;
    }

    const firstIndexOfLast = zeile.lastIndexOf(number);
    const lastIndexOfLast = firstIndexOfLast + number.length - 1;
    if (
      firstIndexOfLast != -1 &&
      index >= firstIndexOfLast &&
      index <= lastIndexOfLast
    ) {
      const numberAsNumber = numbers[1][numbers[0].indexOf(number)];
      return numberAsNumber;
    }
  }
  return -1;
}

async function dateiLesenZwei() {
  const dateipfad = "input.txt";

  try {
    const daten = await fs.readFile(dateipfad, "utf8");

    const zeilen = daten.split("\n");
    let result = 0;

    for (let zeile of zeilen) {
      let resultI = "";
      let resultJ = "";
      let i = 0;
      let j = zeile.length - 1;

      let firstIndexes = [];
      let lastIndexes = [];

      //   for (const number of numbers[0]) {
      //     firstIndexes.push(zeile.indexOf(number));

      //     lastIndexes.push(zeile.lastIndexOf(number));
      //   }

      //   zeilen.some;

      //   {
      //     zeile = zeile.replaceAll(
      //       number,
      //       numbers[1][numbers[0].indexOf(number)]
      //     );
      //   }
      //   console.log(zeile);

      while (i <= j) {
        if (!isNaN(zeile[i])) {
          if (resultI == "") resultI += zeile[i];
        } else {
          const temp = isThisANumber(zeile, i);
          if (temp > 0) {
            if (resultI == "") resultI += temp;
          } else {
            i++;
          }
        }

        if (!isNaN(zeile[j])) {
          if (resultJ == "") resultJ += zeile[j];
        } else {
          const temp = isThisANumber(zeile, j);
          if (temp > 0) {
            if (resultJ == "") resultJ += temp;
          } else {
            j--;
          }
        }

        if (resultI != "" && resultJ != "") {
          break;
        }
      }
      console.log(zeile, parseInt(resultI + resultJ));

      result += parseInt(resultI + resultJ);
    }

    console.log(result);

    // Hier kannst du weitere Operationen mit den Daten durchführen
  } catch (err) {
    console.error(err);
  }
}

// Aufruf der Funktion
dateiLesenZwei();
