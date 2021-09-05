//копия на https://jsfiddle.net/ufxahoc6/

const debugModeOn = true;

const arrayQuizCollection = [
    {id:1, difficultyLevel:1, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:2, cost:100},
    {id:2, difficultyLevel:1, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:1, cost:100},
    {id:3, difficultyLevel:1, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:4, cost:100},
    {id:4, difficultyLevel:2, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:1000},
    {id:5, difficultyLevel:2, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:1000},
    {id:6, difficultyLevel:2, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:1000},
    {id:7, difficultyLevel:3, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:5000},
    {id:8, difficultyLevel:3, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:1, cost:5000},
    {id:9, difficultyLevel:3, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:4, cost:5000},
    {id:10, difficultyLevel:3, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:4, cost:5000},
    {id:11, difficultyLevel:4, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:2, cost:10000},
    {id:12, difficultyLevel:4, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:1, cost:10000},
    {id:13, difficultyLevel:4, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:4, cost:10000},
    {id:14, difficultyLevel:4, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:10000},
    {id:15, difficultyLevel:4, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:1, cost:10000},
    {id:16, difficultyLevel:5, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:1, cost:25000},
    {id:17, difficultyLevel:5, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:25000},
    {id:18, difficultyLevel:5, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:25000},
    {id:19, difficultyLevel:5, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:25000},
    {id:20, difficultyLevel:5, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:4, cost:25000},
    {id:21, difficultyLevel:6, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:2, cost:50000},
    {id:22, difficultyLevel:6, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:1, cost:50000},
    {id:23, difficultyLevel:6, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:4, cost:50000},
    {id:24, difficultyLevel:7, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:100000},
    {id:25, difficultyLevel:7, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:1, cost:100000},
    {id:26, difficultyLevel:7, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:100000},
    {id:27, difficultyLevel:8, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:250000},
    {id:28, difficultyLevel:8, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:250000},
    {id:29, difficultyLevel:8, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:4, cost:250000},
    {id:30, difficultyLevel:8, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:500000},
    {id:31, difficultyLevel:9, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:2, cost:500000},
    {id:32, difficultyLevel:9, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:1, cost:500000},
    {id:33, difficultyLevel:9, question:"1asdas dasd as das asd ", answer1:"1qwseqweqwe", answer2:"2qwseqweqwe", answer3:"3qwseqweqwe", answer4:"4qwseqweqwe", correct:4, cost:500000},
    {id:34, difficultyLevel:9, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:4, cost:500000},
    {id:35, difficultyLevel:10, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:4, cost:1000000},
    {id:36, difficultyLevel:10, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:3, cost:1000000},
    {id:37, difficultyLevel:10, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:1, cost:1000000},
    {id:38, difficultyLevel:10, question:"akujsrv kasjvr avs ваф мы ", answer1:"zser5vbw", answer2:"2354v23v3", answer3:"234v23234v", answer4:"wevrwevweervw", correct:2, cost:1000000},
];

const player = {
    level: 1,
    money: 0,
    
    levelUp(newMoney) {
        this.level++;
        this.money = newMoney;
     },  
};

const question = {
    id:0, 
    difficultyLevel:0, 
    question:"", 

    answer1:"", 
    answer2:"", 
    answer3:"", 
    answer4:"", 

    correct:0
};

while(player.level < 11){
    console.log("player", player);
    const currentQuestion = getQuizForLevel(player.level);
    console.log("currentQuestion", currentQuestion);

    //задаем вопрос
    //получаем от игрока число ответа на вопрос. пустой ввод и cancel = выход из игры
    let answer = getNumberFromPlayer(currentQuestion);

    //сравниваем ответ
    if(answer == null || answer == ""){//ничего не введено
        console.log("Игра окончена, ответ не введен");
        alert("Игра окончена");
        break;
    }

    if(answer == currentQuestion.correct){
        //правильный ответ
        player.levelUp(currentQuestion.cost);

        //конец игры - победа
        if(player.level == 11){
            console.log("player Win", player);
            alert("Победа!");
            break;
        }
    }
    else{
        //конец игры - неправильный ответ
        console.log("player loose", player);
        alert("Неправильно! \nПравильным был ответ " + currentQuestion.correct 
            + "\nВы проиграли");
        break;
    }
}

function getNumberFromPlayer(currentQuestion){
    
    let textPrompt = "";
    if(debugModeOn){// добавить подсказку правильного ответа
        textPrompt = `\nотладка правильный ответ = ${currentQuestion.correct}`;
    }

    const text = `На кону ${currentQuestion.cost} рублей\n 
        Вопрос: ${currentQuestion.question}\n
        Варианты ответов:\n
        1) ${currentQuestion.answer1}   2) ${currentQuestion.answer2} 
        \n3) ${currentQuestion.answer3}   4) ${currentQuestion.answer4} 
        ${textPrompt}`;
    

    //проверка на корректность введенного числа
    let userNumber="a";
    while(isNaN(userNumber)){
        userNumber = prompt(text);
        console.log("user input is " + userNumber);    
        
        if(userNumber == null || userNumber == ""){//выходим из проверки - по пустым значениям конец игры
            return userNumber;
        }
        else if (isNaN(userNumber)) {//проверка на распознание - число или нет
            alert("Число " + userNumber + " не удалось распознать, повторите ввод.");
            console.log("Число не удалось распознать, повторите ввод");
            userNumber="a";
        }
        else if (!(userNumber % 1) == 0) {
            console.log("Введенно дробное число.");
            alert("Введенно дробное число. Номера ответов - целые числа от 1 до 4");
            userNumber="a";
        }   
        else if(userNumber < 1){
            alert("Введенно слишком маленькое число. Номера ответов от 1 до 4");
            console.log("Введенно слишком маленькое число.");
            userNumber="a";
        }
        else if(userNumber > 4) {
            console.log("Введенно слишком большое число.");
            alert("Введенно слишком большое число. Номера ответов от 1 до 4");
            userNumber="a";
        }     
    }

    return userNumber;
}

function getQuizForLevel(levelNum){
    console.log("getQuizForLevel " + levelNum);
    //получим список из id вопросов с нужным уровнем.
    const arrayOfQuizId = arrayQuizCollection.filter(e => e.difficultyLevel == levelNum);
    //console.log("arrayOfQuizId", arrayOfQuizId);
  
    //получим 1 рандом номер по размеру массива с id
    const resultId = getRandomIntInclusive(0, arrayOfQuizId.length - 1);
    //console.log("resultId", resultId);

    //запросим этот вопрос из массива и вернем его как результат   
    const result = arrayOfQuizId[resultId];
    //console.log("result", result);
    return result;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
