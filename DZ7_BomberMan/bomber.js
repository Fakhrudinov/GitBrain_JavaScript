const gameFieldWidth = 16;
const gameFieldHeight = 16;
const tickPerSecond = 3;

const bombExplositonTime = 3000;
const bombStopTime = 1000;

const bombsCounterInHtml = document.querySelector(".bombs-counter span");
const enemyCounterInHtml = document.querySelector(".enemy-counter span");
const gameStatusInHtml = document.querySelector(".game-status");

const CELL_TYPE = {
  BOMBERMAN: "bomberman",
  BOMB: "bomb",
  ENEMY: "enemy",
  WALL: "wall",
  EXPLOSION: "explosion",
  DEADBOMBERMAN:"dead",
};


let gameField;
const gameState = {
  bomberman: {
    position: {
      rowNumber: 0,
      columnNumber: 0,
    },
  },
  // {rowNumber, columnNumber, startTimeMs}
  bombs: [],
  bombExplodeSize: 3,
  bombExploseCells: {
    // i,j: time of start explode
  },
  gameTickHandler: null,
  enemys: [],
  enemyCount: 10,
  enemySpeed: 1000
};

const gameStatistic = {
  totalBombSet: 0,
  enemyKilled:0
}

const htmlPositionAttributeName = "cell-position";

/**
 * Создание двойного массива и заполнение игрового поля null
 */
const createGameField = () => {
  //   gameField = [];

  //   for (let i = 0; i < gameFieldHeight; i++) {
  //     gameField.push([]);
  //     for (let j = 0; j < gameFieldWidth; j++) {
  //       gameField[i].push(null);
  //     }
  //   }

  const gameFieldRows = new Array(gameFieldHeight).fill(null);

  gameField = gameFieldRows.map(() => {
    return new Array(gameFieldWidth).fill(null);
  });
};

/**
 * Установка id в DOM элементы, для взаимодействия с ними
 */
const setDomTreeAttributes = () => {
  const allCells = document.querySelectorAll(".cell");
  for (let i = 0; i < allCells.length; i++) {
    const numberOfRow = Math.floor(i / gameFieldHeight);
    const numberOfColumn = i % gameFieldWidth;

    allCells[i].id = generateCellId(numberOfRow, numberOfColumn);
  }
};

/**
 * Генерация id ячейки
 */
const generateCellId = (rowNumber, columnNumber) => {
  return `${htmlPositionAttributeName}${rowNumber},${columnNumber}`;
};

/**
 * Получение DOM элемента по позиции в gameField
 */
const getCellDomElement = (rowNumber, columnNumber) => {
  return document.getElementById(generateCellId(rowNumber, columnNumber));
};

/**
 * Получение позиции в gameField из id DOM элемента
 */
const getPositionById = (cellElement) => {
  const cellId = cellElement.id;
  const arrayOfPosition = cellId
    .replace(htmlPositionAttributeName, "")
    .split(",");

  return {
    rowNumber: arrayOfPosition[0],
    columnNumber: arrayOfPosition[1],
  };
};

/**
 * Установка бомбы (gameField и DOM)
 */
const setBombPosition = (rowNumber, columnNumber) => {
  gameField[rowNumber][columnNumber] = CELL_TYPE.BOMB;

  gameState.bombs.push({ rowNumber, columnNumber, startTimeMs: Date.now() });

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMB);
};

/**
 * Установка позиции бомбермена, с удалением старой позиции
 */
const setBombermanPosition = (rowNumber, columnNumber) => {
  gameState.bomberman.position.rowNumber = rowNumber;
  gameState.bomberman.position.columnNumber = columnNumber;

  const currentBombermanPositionElement = document.querySelector(`.${CELL_TYPE.BOMBERMAN}`);

  if (currentBombermanPositionElement !== null) {
    const bombermanPosition = getPositionById(currentBombermanPositionElement);
    gameField[bombermanPosition.rowNumber][bombermanPosition.columnNumber] = null;

    currentBombermanPositionElement.classList.remove(CELL_TYPE.BOMBERMAN);
  }

  if (gameField[rowNumber][columnNumber] != null){
    // эта проверка должна быть изменена с появлением стен и бонусов 
    bombermanIsDead(rowNumber, columnNumber, "Enemy catch you!");
  }

  gameField[rowNumber][columnNumber] = CELL_TYPE.BOMBERMAN;

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMBERMAN);
};

/**
 * Установка enemy на начало игры (gameField и DOM)
 */
 function setEnemiesAtGameStart(){
  enemyCounterInHtml.innerHTML = gameState.enemyCount;

  for(let count = 0; count < gameState.enemyCount; count++){
    //new enemy row cell
    const enemyRow = getRandomIntInclusive(0, gameFieldHeight - 1)
    const enemyCell = getRandomIntInclusive(0, gameFieldWidth - 1)
    const moveVector = getRandomIntInclusive(0, 3)
    //moveVector:
    //0=up
    //1=down
    //2=left
    //3=right

    //проверить, что ячейка не занята (null)
    //если занята, счетчик уменьшить для нового цикла генерации координат enemy
    if(gameField[enemyRow][enemyCell] != null){
      count--;
    }
    else{
      gameState.enemys.push({ row: enemyRow, cell: enemyCell, vector: moveVector});
      const newEnemyPosition = getCellDomElement(enemyRow, enemyCell);
      newEnemyPosition.classList.add(CELL_TYPE.ENEMY);
      gameField[enemyRow][enemyCell] = CELL_TYPE.ENEMY;
    }  
  }
};

function getRandomIntInclusive(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Инициализация игрового поля
 */
const initializeGameField = () => {
  createGameField();
  setDomTreeAttributes();
  setBombermanPosition(0, 0);
  setEnemiesAtGameStart();
};

/**
 * Обработчик нажатий на клавиатуре
 */

 function KeyboardHandlers(e) {
    switch (e.code) {
      case "ArrowLeft":
        if (gameState.bomberman.position.columnNumber > 0) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber - 1
          );        
        }
        else{
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameFieldWidth - 1
          );
        }
        break;
      case "ArrowRight":
        if (gameState.bomberman.position.columnNumber < gameFieldWidth - 1) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber + 1
          );
        }        
        else{
          setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            0
          );
        }
        break;
      case "ArrowDown":
        if (gameState.bomberman.position.rowNumber < gameFieldHeight - 1) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber + 1,
            gameState.bomberman.position.columnNumber
          );
        }
        else{
          setBombermanPosition(
            0,
            gameState.bomberman.position.columnNumber
          );
        }
        break;
      case "ArrowUp":
        if (gameState.bomberman.position.rowNumber > 0) {
          setBombermanPosition(
            gameState.bomberman.position.rowNumber - 1,
            gameState.bomberman.position.columnNumber
          );
        }
        else{
          setBombermanPosition(
            gameFieldHeight - 1,
            gameState.bomberman.position.columnNumber
          );
        }
        break;
      case "Space":
        // поставить бомбу
        setBombPosition(
          gameState.bomberman.position.rowNumber,
          gameState.bomberman.position.columnNumber
        );
        break;
    }
};

/**
 * Взрыв бомбы, рисование крестика
 */
const explodeBomb = (i) => {
  //увеличение счетчика взорванных бомб
  gameStatistic.totalBombSet += 1;
  bombsCounterInHtml.innerHTML = gameStatistic.totalBombSet;

  // удаление иконки бомбы
  const explodedBomb = gameState.bombs.splice(i, 1)[0];

  const elementWithBomb = getCellDomElement( explodedBomb.rowNumber, explodedBomb.columnNumber );

  elementWithBomb.classList.remove(CELL_TYPE.BOMB);

  // рисование взрыва по вертикали (gameState и DOM)
  for (let i = 0; i < gameState.bombExplodeSize * 2 - 1; i++) {
    const explodeRowNumber = explodedBomb.rowNumber - (gameState.bombExplodeSize - 1) + i;
    
    if (explodeRowNumber < 0 || explodeRowNumber >= gameFieldHeight) {
      continue;
    }
    
    const cellForExplode = getCellDomElement( explodeRowNumber, explodedBomb.columnNumber );
    checkIsBombermanAlive(explodeRowNumber, explodedBomb.columnNumber);
    checkIsEnemyKilled(explodeRowNumber, explodedBomb.columnNumber);
    cellForExplode.classList.add(CELL_TYPE.EXPLOSION);
    
    // gameState
    gameState.bombExploseCells[`${explodeRowNumber},${explodedBomb.columnNumber}`] = Date.now();
  }

  // рисование взрыва по горизонтали (gameState и DOM)
  for (let i = 0; i < gameState.bombExplodeSize * 2 - 1; i++) {
    const explodeColumnNumber = explodedBomb.columnNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeColumnNumber < 0 || explodeColumnNumber >= gameFieldWidth) {
      continue;
    }
    const cellForExplode = getCellDomElement(explodedBomb.rowNumber, explodeColumnNumber);
    checkIsBombermanAlive(explodedBomb.rowNumber, explodeColumnNumber);
    checkIsEnemyKilled(explodedBomb.rowNumber, explodeColumnNumber);
    cellForExplode.classList.add(CELL_TYPE.EXPLOSION);

    // gameState
    gameState.bombExploseCells[`${explodedBomb.rowNumber},${explodeColumnNumber}`] = Date.now();
  }
};

/*
 * Проверка совпадения взрыва и бомбермена. 
 */
function checkIsBombermanAlive(row, cell){
  if(gameState.bomberman.position.rowNumber == row && gameState.bomberman.position.columnNumber == cell){
    bombermanIsDead(row, cell, "BANG!");
  }
}

/*
 * Ставим статус убит и останавливаем игру
 */
function bombermanIsDead(row, cell, text){
  console.log("bomberman killed at ", row, cell );
  document.removeEventListener("keydown", KeyboardHandlers);

  const cellForExplode = getCellDomElement(row, cell);
  cellForExplode.classList.add(CELL_TYPE.DEADBOMBERMAN);

  gameStatusInHtml.innerHTML = text + " GAME OVER! You loose.";
  stopEnemyMove();
}

/*
 * Проверка совпадения взрыва и enemy
 */
function checkIsEnemyKilled(row, cell){
  if(gameField[row][cell] == "enemy"){
    console.log("enemy killed at ", row, cell);

    gameField[row][cell] = null;
    gameState.enemyCount--;

    const removeEnemy = getCellDomElement(row, cell);
    removeEnemy.classList.remove(CELL_TYPE.ENEMY);

    enemyCounterInHtml.innerHTML = gameState.enemyCount;
    if(gameState.enemyCount == 0){
      gameStatusInHtml.innerHTML = "Congratulation! You win!!";
      console.log("Congratulation! You win!!");
      stopEnemyMove();
    }

    //убираю из gameState.enemy
    for (let i = gameState.enemys.length - 1; i >= 0; i--) {
      const enemy = gameState.enemys[i];
      
      if (enemy.row == row && enemy.cell == cell) {
        gameState.enemys.splice(i, 1);
      }
    }
  }
}

/**
 * Проверка что пора бомбе взорваться
 * Вызывается на каждом тике
 */
const checkBombsExplosion = () => {
  const currentTime = Date.now();
  for (let i = gameState.bombs.length - 1; i >= 0; i--) {
    const bomb = gameState.bombs[i];
    
    if (currentTime - bomb.startTimeMs > bombExplositonTime) {
      // взорвать бомбу
      explodeBomb();
    }
  }
};

/**
 * Тушения взрыва бомб, в gameState и DOM дереве
 * Вызывается каждый тик
 */
const checkBombsStop = () => {
  const currentTime = Date.now();
  for (const explodeCellKey in gameState.bombExploseCells) {
    if ( currentTime - gameState.bombExploseCells[explodeCellKey] >= bombStopTime) {
      // удалить из gameState.bombExploseCells поле
      delete gameState.bombExploseCells[explodeCellKey];

      // убрать из DOM класс
      const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
      const explodeCell = getCellDomElement(explodeCellRow, explodeCellColumn);
      explodeCell.classList.remove(CELL_TYPE.EXPLOSION);
    }
  }
};

/**
 * Обработчик на каждом тике игры
 */
const startGame = () => {
  gameState.gameTickHandler = setInterval(() => {
    checkBombsExplosion();
    checkBombsStop();
  }, 1000 / tickPerSecond);
};

/**
 * Обработчик движения enemy
 */
 const enemyMoving = setInterval(moveEnemy, gameState.enemySpeed);

 function stopEnemyMove() {
  clearInterval(enemyMoving);
}

 function moveEnemy() {
   //var dateNow = new Date();
   //var timeLocal = dateNow.toLocaleTimeString();
   //console.log(timeLocal);//видеть таймер движения

    //берем из gameState.enemy по очереди
    for (let i = gameState.enemys.length - 1; i >= 0; i--) {
    const enemy = gameState.enemys[i];    
      //moveVector:
      //0=up
      //1=down
      //2=left
      //3=right
      switch(enemy.vector){
        case 0:
          if(enemy.row == 0){
            gameState.enemys[i].vector = 1;
            setEnemyNewPosition(i, 1, enemy.cell);
            //console.log("new vector", i, 1, enemy.cell);
          }
          else{
            setEnemyNewPosition(i, enemy.row - 1, enemy.cell);   
          }
        break;

        case 1:
          if(enemy.row == gameFieldHeight - 1){
            gameState.enemys[i].vector = 0;
            setEnemyNewPosition(i, gameFieldHeight - 2, enemy.cell);
          }
          else{
            setEnemyNewPosition(i, enemy.row + 1, enemy.cell);
          }
        break;

        case 2:
          if(enemy.cell == 0){
            gameState.enemys[i].vector = 3;
            setEnemyNewPosition(i, enemy.row, 1);
          }
          else{
            setEnemyNewPosition(i, enemy.row, enemy.cell-1);
          }
        break;

        case 3:
          if(enemy.cell == gameFieldWidth - 1){
            gameState.enemys[i].vector = 2;
            setEnemyNewPosition(i, enemy.row, gameFieldWidth - 2);
          }
          else{
            setEnemyNewPosition(i, enemy.row, enemy.cell + 1);   
          }
        break;
      }
    }
 }
 
 /**
 * Установка позиции enemy, с удалением старой позиции
 */
const setEnemyNewPosition = (enemyInArray, row, cell) => {
  //записываем старые координаты
  const currentEnemyPositionRow = gameState.enemys[enemyInArray].row;
  const currentEnemyPositionCell = gameState.enemys[enemyInArray].cell;
  currentEnemyPositionElement = document.getElementById(`${htmlPositionAttributeName}${currentEnemyPositionRow},${currentEnemyPositionCell}`);

  //если по новым координатам бомберман или null - идем
  //иначе - поворачиваем
  if(gameField[row][cell] == null || gameField[row][cell] == CELL_TYPE.BOMBERMAN){
    //стираем старые
    if (currentEnemyPositionElement !== null) {
      gameField[currentEnemyPositionRow][currentEnemyPositionCell] = null;
      currentEnemyPositionElement.classList.remove(CELL_TYPE.ENEMY);
    }
    //ставим по новым координатам  
    gameState.enemys[enemyInArray].row = row;
    gameState.enemys[enemyInArray].cell = cell;
    gameField[row][cell] = CELL_TYPE.ENEMY;

    const enemyNewPosition = getCellDomElement(row, cell);
    enemyNewPosition.classList.add(CELL_TYPE.ENEMY);

    if (gameState.bomberman.position.rowNumber == row && gameState.bomberman.position.columnNumber == cell){
      bombermanIsDead(row, cell, "Enemy catch you!");
    }
  }
  else{
    gameState.enemys[enemyInArray].vector++;
    if(gameState.enemys[enemyInArray].vector > 3){
      gameState.enemys[enemyInArray].vector = 0;
    }
  }
 
};

/**
 * Остановка обработчика тиков игры
 */
const stopGame = () => {
  clearInterval(gameState.gameTickHandler);
};

initializeGameField();
document.addEventListener("keydown", KeyboardHandlers);
startGame();
