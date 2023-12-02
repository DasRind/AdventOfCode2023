  readyToBreakWord: for (let char of color) {
        if (!isNaN(char)) {
          number += char;
        } else {
          numberToCheck = parseFloat(number);
          switch (char) {
            case "r":
              console.log("red!");
              console.log(numberToCheck, boundaries.get("red"));
              if (numberToCheck < boundaries.get("red")) return false;
              break readyToBreakWord;
            case "g":
              console.log("grün!");
              console.log(numberToCheck, boundaries.get("green"));
              if (numberToCheck < boundaries.get("green")) return false;
              break readyToBreakWord;
            case "b":
              console.log("blue!");
              console.log(numberToCheck, boundaries.get("blue"));
              if (numberToCheck < boundaries.get("blue")) return false;
              break readyToBreakWord;
          }
        }
      }
    