const gameFieldInitial = [
    [null, null, "goblin", null, null, null, null, "troll", null, null],
    ["goblin", null, null, "troll", null, "cyclops", null, null, "goblin", null],
    [null, null, "troll", null, "goblin", null, "goblin", null, null, "cyclops"],
    ["goblin", null, "goblin", null, null, "cyclops", null, null, "goblin", null],
    [null, null, null, null, "goblin", null, "cyclops", "troll", null, "troll"],
    ["troll","goblin","cyclops","goblin",null,null,"goblin",null,"cyclops",null,],
    [null, null, null, null, null, "cyclops", null, null, null, null],
    [null,"cyclops",null,"goblin","cyclops",null,null,"goblin",null,"troll",],
    ["troll", null, "goblin", null, "goblin", "troll", null, null, null, null],
    [null, "goblin", null, null, null, null, "troll", "goblin", null, "dragon"],
];

var gameField = [];
var gameMovesLog = [];

const MONSTERS = {
    goblin:  { power: 12 },
    troll:   { power: 44 },
    cyclops: { power: 160 },
    dragon:  { power: 400 },
};

const stateOfGame = {//определение стартовых значений в функции startGame
    player: {
        power: 0,
        position: {
            x: 0,
            y: 0,
        },
    },
};

function LogMove(cellEvent, power, x, y) {
    this.cellEvent = cellEvent;
    this.power = power;
    this.x = x;
    this.y = y;
}

function showGameField() {
//показать инфо о игроке
    document.getElementById("playerStats").innerHTML = 
    "<strong>Player stats</strong><br />"
    + "Power=" + stateOfGame.player.power  
    + "<br />x=" + stateOfGame.player.position.x
    + "<br />y=" + stateOfGame.player.position.y;

// показать игровое поле
    let gameFieldInTable = "";
    
    for(let row = 0; row < gameField.length; row++) {
        gameFieldInTable = gameFieldInTable + "<tr>";
        
        for(let cell = 0; cell < gameField[row].length; cell++) {
            textInField = gameField[row][cell];
            if(textInField == null){
                textInField = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            
            //set user in gameField
            if(cell == stateOfGame.player.position.x && row == stateOfGame.player.position.y){
                textInField="player";

                gameFieldInTable = gameFieldInTable + "<td style=\" color:green; \">"
                + "<br />"
                + (textInField) 
                + "<br /><br />"
                + "</td>";
            }
            else{
                gameFieldInTable = gameFieldInTable + "<td>"
                + "<br />"
                + (textInField)
                + "<br /><br />"
                + "</td>";
            }
        }
        gameFieldInTable = gameFieldInTable + "</tr>";
      }

    document.getElementById("gameScreen").innerHTML = gameFieldInTable;
}

function moveDown() { 
    stateOfGame.player.position.y += 1;
    calculateGameStats();
}

function moveUp() { 
    stateOfGame.player.position.y -= 1;
    calculateGameStats();
}

function moveLeft() { 
    stateOfGame.player.position.x -= 1;
    calculateGameStats();
}

function moveRight() { 
    stateOfGame.player.position.x += 1;
    calculateGameStats();
}

function checkGameFieldInitialArray(){

    if (gameFieldInitial.length != 10){
        console.log("массив с игровыми данными некоректен - количество строк в массиве не равно 10, актуальное количество="+ gameFieldInitial.length);
        return false;
    }

    for(let row = 0; row < gameFieldInitial.length; row++) {
        
        if (gameFieldInitial[row].length != 10){
            console.log(`массив с игровыми данными некоректен - строка ${row} в массиве содержит не 10 элементов, актуальное количество=`+ gameFieldInitial[row].length);
            return false;
        }
    
        //проверка на содержимое ячеек - null или MONSTER
        for(let cell = 0; cell < gameFieldInitial[row].length; cell++) {
            if(gameFieldInitial[row][cell] != null){
                
                let flag = false;
                for (let key in MONSTERS) {
                    if(key == gameFieldInitial[row][cell]){
                        flag = true;
                    }
                }

                if(!flag){
                    console.log(`массив с игровыми данными некоректен - ячейка ${[row]} ${[cell]} содержит нераспознанный элемент=`+ gameFieldInitial[row][cell]);
                    return false;
                }
            }        
        }
    }

    return true;
}

function startGame() {
    const isArrayCorrect = checkGameFieldInitialArray();
    if(!isArrayCorrect){
        document.getElementById("cellEventDescription").innerHTML = 
            "Некорректный массив с игровыми данными";
            return;       
    }  

    gameField = copyArrayOfArrays(gameFieldInitial);
    gameMovesLog = [];

    stateOfGame.player.position.x = 0;
    stateOfGame.player.position.y = 0;
    stateOfGame.player.power = 12;

    calculateGameStats();

    //print monsters stats
    let monsters = "<strong>Monster stats:</strong><br />";
    for (let key in MONSTERS) {
        monsters = monsters + key + " " + MONSTERS[key].power + "<br />";
    }
    document.getElementById("cellMonsterDescription").innerHTML = monsters;
    document.getElementById("btnGetLog").disabled = false;
}

function calculateGameStats() { 
    getAvailableMovements();
    checkPlayerMovement();
    showGameField();
}

const getAvailableMovements = () => {
    document.getElementById("btnUp").disabled = false;
    document.getElementById("btnleft").disabled = false;
    document.getElementById("btnRight").disabled = false;
    document.getElementById("btnDown").disabled = false;

    if (stateOfGame.player.position.y == 0) {
        document.getElementById("btnUp").disabled = true;
    }

    if (stateOfGame.player.position.y == 9) {
        document.getElementById("btnDown").disabled = true;
    }

    if (stateOfGame.player.position.x == 0) {
        document.getElementById("btnleft").disabled = true;
    }

    if (stateOfGame.player.position.x == 9) {
        document.getElementById("btnRight").disabled = true;
    }
};

function checkPlayerMovement(){
    // проверка на монстра
    const gameCell = gameField[stateOfGame.player.position.y][stateOfGame.player.position.x];

    if (gameCell === null) {
        document.getElementById("cellEventDescription").innerHTML = "На этом поле никого не нашли";
        gameMovesLog.push(new LogMove(
            "На этом поле никого не нашли", 
            stateOfGame.player.power, 
            stateOfGame.player.position.x, 
            stateOfGame.player.position.y));
    }
    else{
        const monster = MONSTERS[gameCell];
        // сражение с монстром
        let messageOfBattle = `<br />Вы встретили монстра ${gameCell}\n`;
    
        if (stateOfGame.player.power >= monster.power) {
            stateOfGame.player.power += (monster.power/4);
            messageOfBattle += "<br />Вы выиграли\n";
            messageOfBattle += `<br />Ваша сила теперь ${stateOfGame.player.power}`;
    
            //удалить монстра из массива
            gameField[stateOfGame.player.position.y][stateOfGame.player.position.x] = null;
    
            //информация о поле
            document.getElementById("cellEventDescription").innerHTML = 
                "На этом поле " + messageOfBattle;

            gameMovesLog.push(new LogMove(
                messageOfBattle, 
                stateOfGame.player.power, 
                stateOfGame.player.position.x, 
                stateOfGame.player.position.y));

        } else {
            messageOfBattle += "<br />Вы проиграли\n";
            messageOfBattle += "<br />Конец игры";

            document.getElementById("cellEventDescription").innerHTML = 
                "На этом поле x=" + stateOfGame.player.position.x 
                + " y=" + stateOfGame.player.position.y 
                + " " + messageOfBattle;

            gameMovesLog.push(new LogMove(
                messageOfBattle, 
                0, 
                stateOfGame.player.position.x, 
                stateOfGame.player.position.y));

            document.getElementById("btnUp").disabled = true;
            document.getElementById("btnleft").disabled = true;
            document.getElementById("btnRight").disabled = true;
            document.getElementById("btnDown").disabled = true;
        }
    }

    //увеличим счетчик в получении логов
    document.getElementById("gameLogStepSelector").max = gameMovesLog.length - 1;
    document.getElementById("gameLogStepSelector").value = gameMovesLog.length - 1;
}

function copyArrayOfArrays(myArray){
    let newArray = [];
    
    for(let row = 0; row < myArray.length; row++) {
        newArray.push([]);
    
        for(let cell = 0; cell < myArray[row].length; cell++) {
            newArray[row].push(myArray[row][cell]);
        }
      }
    return newArray;
}

function getGameLogForStep(){
    const stepNumber = document.getElementById('gameLogStepSelector').value;

    const logInfo = gameMovesLog[stepNumber].cellEvent 
        + "<br /> x=" + gameMovesLog[stepNumber].x 
        + " y=" + gameMovesLog[stepNumber].y 
        + "<br /> playerPower=" + gameMovesLog[stepNumber].power;

    console.log(logInfo);
    document.getElementById("gameLogInfo").innerHTML = logInfo;
}
