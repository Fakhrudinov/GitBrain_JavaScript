let a = getRandomIntInclusive(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
let b = getRandomIntInclusive(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
console.log("a=" + a + " and b=" + b);

//check function from task 5
console.log("check function from task 5");
console.log("addition: " + addition(a, b));
console.log("subtraction: " + subtraction(a, b));
console.log("multiplication: " + multiplication(a, b));
console.log("division: " + division(a, b));

//check function from task 6
console.log("\ncheck function from task 6");
console.log("mathOperation addition: " + mathOperation(a, b, "addition"));
console.log("mathOperation subtraction: " + mathOperation(a, b, "subtraction"));
console.log("mathOperation multiplication: " + mathOperation(a, b, "multiplication"));
console.log("mathOperation division: " + mathOperation(a, b, "division"));

console.log("mathOperation abc: " + mathOperation(a, b, "abc"));


function addition(a, b) {
	return a + b;
  }
  
function subtraction(a, b) {
	return a - b;
  }
  
function multiplication(a, b) {
	return a * b;
  }
  
function division(a, b) {
	return a / b;
  }

function mathOperation(arg1, arg2, operation) {
  switch(operation){
    case "addition":
      return addition(arg1, arg2);
    case "subtraction":
      return subtraction(arg1, arg2);
    case "multiplication":
      return multiplication(arg1, arg2);
    case "division":
      return division(arg1, arg2);
    default:
      console.log("Unrecognized operation '" + operation + "' in function mathOperation.");       
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }