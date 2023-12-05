const fs = require("fs").promises;

// Part 1

class Zahl {
  nummer = "";
  zeile = 0;
  spalte = 0;
  chosen = false;

  constructor(zeile, spalte, nummer) {
    this.nummer = nummer;
    this.zeile = zeile;
    this.spalte = spalte;
  }

  addNumber(nummer) {
    this.nummer += nummer;
  }
}

async function dateiLesen() {
  const dateipfad = "Input.txt";

  const daten = await fs.readFile(dateipfad, "utf8");

  const zeilen = daten.split(/\n/g);
  let result = 0;
  const numbersThatAreOk = [[]];
  const numbers = [];

  const opArray = ["+", "-", "*", "/", "#", "$", "@", "=", "%", "&"];

  let lastNumber = undefined;

  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {
    if (indexZ > 0) numbersThatAreOk.push([]);
    for (const char of zeilen[indexZ]) {
      numbersThatAreOk[indexZ].push(false);
    }
  }

  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {
    for (let indexS = 0; indexS < zeilen[indexZ].length; indexS++) {
      const char = zeilen[indexZ][indexS];
      if (!isNaN(char)) {
        if (lastNumber != undefined) {
          lastNumber.addNumber(char);
        } else {
          lastNumber = new Zahl(indexZ, indexS, char);
          numbers.push(lastNumber);
        }
      } else if (opArray.includes(char)) {
        lastNumber = undefined;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const zeilenIndex = indexZ + i;
            const spaltenIndex = indexS + j;

            if (
              zeilenIndex >= 0 &&
              zeilenIndex < zeilen.length &&
              spaltenIndex >= 0 &&
              spaltenIndex < zeilen[indexZ].length
            ) {
              numbersThatAreOk[zeilenIndex][spaltenIndex] = true;
            }
          }
        }
      } else {
        lastNumber = undefined;
      }
    }
    lastNumber = undefined;
  }

  //   console.log(numbers.length);
  //   console.log(numbers[0]);
  //   console.log(numbers[1]);
  //   console.log(!isNaN("#"), "#" != ".");
  //   console.log(numbers[2]);
  //   console.log(numbersThatAreOk[numbers[0].zeile][numbers[0].spalte]);
  //   console.log(numbersThatAreOk[numbers[1].zeile][numbers[1].spalte]);
  //   console.log(numbersThatAreOk[numbers[2].zeile + 2][numbers[2].spalte + 1]);

  //   for (const number of numbersThatAreOk.slice(0, 3)) {
  //     for (const field of number) {
  //       console.log(field);
  //     }
  //   }

  //   console.log(zeilen.length, numbersThatAreOk.length);

  for (const zahl of numbersThatAreOk[0]) {
    console.log(zahl);
  }
  console.log("zeile 2");
  for (const zahl of numbersThatAreOk[1]) {
    console.log(zahl);
  }
  console.log("zeile 3");

  for (const zahl of numbersThatAreOk[2]) {
    console.log(zahl);
  }

  for (const zahl of numbers) {
    for (let i = 0; i < zahl.nummer.length; i++) {
      if (numbersThatAreOk[zahl.zeile][zahl.spalte + i]) {
        if (zahl.zeile < 3)
          console.log(
            zeilen[zahl.zeile][zahl.spalte + i],
            zahl.zeile,
            zahl.spalte
          );
        result += parseInt(zahl.nummer);
        break;
      }
    }
  }
  console.log(numbers);
  console.log(numbersThatAreOk[0]);

  console.log(result);
}

dateiLesen();

function getNumber(zeile, spalte, numbers) {
  for (const number of numbers) {
    if (
      zeile == number.zeile &&
      spalte >= number.spalte &&
      spalte < number.spalte + number.nummer.length
    ) {
      return number;
    }
  }
  return undefined;
}

function searchForNumbers(zeile, spalte, array, numbers) {
  const numbersFound = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      calcZeile = zeile + i;
      calcSpalte = spalte + j;
      if (zeile == 1) {
        console.log("nummereeeen", calcZeile, calcSpalte);
      }

      if (
        calcZeile >= 0 &&
        calcZeile < array.length &&
        calcSpalte >= 0 &&
        calcSpalte < array[calcZeile].length
      ) {
        const number = getNumber(calcZeile, calcSpalte, numbers);
        if (number != undefined) {
          if (!number.chosen) {
            number.chosen = true;
            numbersFound.push(number);
          }
        }
      }
    }
  }

  for (const number of numbersFound) {
    number.chosen = false;
  }
  if (zeile == 1) console.log("nummern", numbersFound);
  if (numbersFound.length == 2) {
    if (zeile == 1)
      console.log(
        "nehme ich:",
        parseInt(numbersFound[0].nummer),
        parseInt(numbersFound[1].nummer),
        parseInt(numbersFound[0].nummer) * parseInt(numbersFound[1].nummer)
      );
    return parseInt(numbersFound[0].nummer) * parseInt(numbersFound[1].nummer);
  }

  return 0;
}

async function dateiLesen2() {
  const dateipfad = "Input.txt";

  const datene = await fs.readFile(dateipfad, "utf8");

  const zeilen = datene.split(/\n/g);
  let result = 0;
  const numbers = [];

  let lastNumber = undefined;

  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {
    for (let indexS = 0; indexS < zeilen[indexZ].length; indexS++) {
      const char = zeilen[indexZ][indexS];
      if (!isNaN(char)) {
        if (lastNumber != undefined) {
          lastNumber.addNumber(char);
        } else {
          lastNumber = new Zahl(indexZ, indexS, char);
          numbers.push(lastNumber);
        }
      } else {
        lastNumber = undefined;
      }
    }
    lastNumber = undefined;
  }

  let counter = 0;
  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {
    for (let indexS = 0; indexS < zeilen[indexZ].length; indexS++) {
      const char = zeilen[indexZ][indexS];
      if (char == "*") {
        counter++;
        result += searchForNumbers(indexZ, indexS, zeilen, numbers);
      }
    }
  }

  console.log(result);
  console.log(counter);
}

dateiLesen2();
