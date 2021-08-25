let maxValue = 15; //для более быстрого изменения, если потребуется расширить диапазон
let a = getRandomIntInclusive(0, maxValue);
console.log("Start number is " + a);

switch(a) {
  case 0:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 1:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 2:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 3:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 4:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 5:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 6:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 7:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 8:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 9:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 10:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 11:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 12:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 13:
    printNumbersFromDiapason(a,maxValue);
    break;
  case 14:
    printNumbersFromDiapason(a,maxValue);
    break;
  case maxValue:
    printNumbersFromDiapason(a,maxValue);
    break;    
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printNumbersFromDiapason(min, max) {
  let textToShow = "";
  
  while (min <= max) {
    textToShow = textToShow + min + "\n";
    min++;
  }

  console.log("Result:\n" + textToShow);
  alert("Result:\n" + textToShow);
}
