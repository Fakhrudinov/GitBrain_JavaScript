let userNumber = "q";
let promptText = "Введите число в диапазоне от 0 до 999";

//get number from user
while(isNaN(userNumber)){
    userNumber = prompt(promptText);
    console.log("user input is " + userNumber);

    if (isNaN(userNumber)) {//проверка на распознание - число или нет
        promptText = "Число " + userNumber + " не удалось распознать, повторите ввод\nВведите число в диапазоне от 0 до 999";
        console.log("Число не удалось распознать, повторите ввод");
    }
}
document.getElementById("number").innerHTML = "Введено число " + userNumber;

//get result object
let finalObject = getObjectFromNumber(userNumber);

//print result
console.log("Объект, полученный из числа:"); 
console.log(finalObject);

let result = "Объект, полученный из числа:<br/>";
for (let key in finalObject) {
    result = result + key + " " + finalObject[key] + "<br />";
}
document.getElementById("result").innerHTML = result;


///function: return object from number(0-999), or bigger, or smaller
function getObjectFromNumber(userNumber){
    //create empty object
    const objectFromNumber = {
        "units": 0, 
        "tens": 0, 
        "hundreds": 0,
        "condition": "unprocessed"
    };

    if(userNumber < 0){
        objectFromNumber.condition = "Number too small";
        console.log("Введенно слишком маленькое число.");
    }
    else if(userNumber > 999){
        objectFromNumber.condition = "Number too big";
        console.log("Введенно слишком большое число.");
    }
    else{
        //calculate object fields
        objectFromNumber.units = userNumber % 10;
        objectFromNumber.tens = ((userNumber - objectFromNumber.units) % 100) / 10;
        objectFromNumber.hundreds = Math.floor(userNumber / 100);
        objectFromNumber.condition = "ok";
    
        console.log("Object from number created.");
    }

    return objectFromNumber;
}


