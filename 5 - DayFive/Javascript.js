const fs = require("fs").promises;

// Part 1

async function dateiLesen() {
  const dateipfad = "Input.txt";

  const daten = await fs.readFile(dateipfad, "utf8");

  const zeilen = daten.split(/\n/g);

  const maps = daten.split(/\n\n/)[4];

  const seeds = maps.shift().split(" ");
  seeds.shift();

  console.log("maps:", maps, "seeds:", seeds);
  console.log(daten.split(/\n\n/)[4]);

  for (let indexZ = 0; indexZ < zeilen.length; indexZ++) {}
}

dateiLesen();

// gucke ob eingabe >= zweiter wert  && < zweiter wert + dritter wert
