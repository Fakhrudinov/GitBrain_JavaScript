const axisCellValue = "ABCDEFGH";
const htmlTarget = document.getElementById("ChessBoard");

const newChessboard = document.createElement("table");
newChessboard.classList.add("chessTable");

newChessboard.setAttribute("cellpadding", "0");
newChessboard.setAttribute("cellspacing", "0");

//setup x axis top
const axisRowTop = document.createElement("tr");
for(let cell = 0; cell < 10; cell++){
    const axisCell = document.createElement("td");

    if(cell > 0 && cell < 9){
        axisCell.innerText=axisCellValue[cell - 1];
        axisCell.classList.add("axisXtop");
    }
    axisRowTop.appendChild(axisCell);
}
newChessboard.appendChild(axisRowTop);// set top axis

for(let row = 8; row > 0; row--){
    //create usual board row
    const boardRow = document.createElement("tr");


    for(let cell = 0; cell < 10; cell++){
        //create usual board cell
        const boardCell = document.createElement("td");

        if(cell == 0 || cell == 9){
            boardCell.innerText = row;// Y axis values like 1, 2, 3 etc
            boardCell.classList.add("axisY");
        }
        else{
            //boardCell.innerText = axisCellValue[cell - 1] + row;//FOR DEBUG
            
            //по этим id потом можно расставлять фигуры
            boardCell.id = axisCellValue[cell - 1] + row;

            if(row % 2 == 0){ 
                if(cell % 2 == 0){
                    boardCell.classList.add("blackCell");
                }
                else{
                    boardCell.classList.add("whiteCell");
                }
            }
            else{
                if(cell % 2 != 0){
                    boardCell.classList.add("blackCell");
                }
                else{
                    boardCell.classList.add("whiteCell");
                } 
            }
        }

        boardRow.appendChild(boardCell);
    }
    newChessboard.appendChild(boardRow);
}

//setup x axis Bottom
const axisRowBottom = document.createElement("tr");
for(let cell = 0; cell < 10; cell++){
    const axisCell = document.createElement("td");   

    if(cell > 0 && cell < 9){
        axisCell.classList.add("axisXbottom");

        axisCell.innerText=axisCellValue[cell - 1];
    }

    axisRowBottom.appendChild(axisCell);
}
newChessboard.appendChild(axisRowBottom);// set bottom axis

htmlTarget.appendChild(newChessboard);
