//chessBoard array
// digits > 10 = white
// digits < 10 = black

/*
white  king 	♔ 	U+2654  16
white  queen 	♕ 	U+2655  15
white  rook 	♖ 	U+2656  14
white  bishop 	♗ 	U+2657  13
white  knight 	♘ 	U+2658  12
white  pawn 	♙ 	U+2659  11

black  king 	♚ 	U+265A  6
black  queen 	♛ 	U+265B  5
black  rook 	♜ 	U+265C  4
black  bishop 	♝ 	U+265D  3
black  knight 	♞ 	U+265E  2
black  pawn 	♟︎ 	 U+265F  1   
*/

const axisValue = "ABCDEFGH";

const chessFieldArray = [
//   A  B  C  D  E  F  G  H
    [14,12,13,15,16,13,12,14,],//1
    [11,11,11,11,0,11,11,11,],//2
    [0, 0, 0, 0, 0, 0, 0, 0,],//3
    [0, 0, 0, 0,11, 0, 0, 0,],//4
    [0, 0, 0, 0, 0, 0, 0, 0,],//5
    [0, 0, 0, 0, 0, 0, 0, 0,],//6
    [1, 1, 1, 1, 1, 1, 1, 1,],//7
    [4, 2, 3, 5, 6, 3, 2, 4,],//8
//   A  B  C  D  E  F  G  H
];

showChessFiguresOnDesk();

function showChessFiguresOnDesk(){
    for (let row = chessFieldArray.length - 1; row >= 0; row--) {

        for(let cell = 0; cell < chessFieldArray[row].length; cell++) {
        
            const cellValue = document.getElementById(axisValue[cell] + (row + 1));

            if (chessFieldArray[row][cell] != 0){
                cellValue.innerText = getFigureCodeFromNumber(chessFieldArray[row][cell]);
            }
            else{
                cellValue.innerText = "";
            }
        }
    }
}

function getFigureCodeFromNumber(num){
    switch(num){
        case 1:
            return "\u265F";
        case 2:
            return "\u265E";
        case 3:
            return "\u265D";
        case 4:
            return "\u265C";
        case 5:
            return "\u265B";
        case 6:
            return "\u265A";

        case 11:
            return "\u2659";
        case 12:
            return "\u2658";
        case 13:
            return "\u2657";
        case 14:
            return "\u2656";
        case 15:
            return "\u2655";
        case 16:
            return "\u2654";
    }
}
