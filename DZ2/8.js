let val = getNumberFromPromt("Введите целое число, которое возведем в степень", "");
let pow = getNumberFromPromt("Введите степень - положительное целое число", "");

let result = power(val, pow);
showText("Результат возведения числа " + val + " в степень " + pow + " = " + result); 

function power(val, pow){
    if (pow == 1) {
      return val;
    }
    else if (pow == 0){
      return 1;
    }
    else {
      return val * power(val, --pow);
    }
  }

function getNumberFromPromt(textForRequest){
    do {
        var number = prompt(textForRequest);
        console.log( "user input is " + number );

        if (isNaN(number)) {//проверка на распознание - число или нет
            showText("Число не удалось распознать, повторите ввод");
        }
        else if(number % 1 != 0){//проверка на целое число
            showText("Это дробное число, введите целое число");
            number = "a";// для продолжения цикла while
        }

    } while (isNaN(number));

    return number;
}

function showText(text) {
    console.log(text);
    alert(text); 
  }
