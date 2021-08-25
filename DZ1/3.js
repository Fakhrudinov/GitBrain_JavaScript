let resultString = 1000 + "108";
let resultNumber = 1000 - "108";
let resultNaN = 1000 * "108x";

alert("1000 + \"108\" = " + resultString +
    "\n1000 - \"108\" = " + resultNumber +
    "\n1000 * \"108x\" = " + resultNaN);