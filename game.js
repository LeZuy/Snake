const GameBoard = document.querySelector("#GameBoard");
const ctx = GameBoard.getContext("2d");
const ScoreText = document.querySelector("#ScoreText");
const GameWidth = GameBoard.width;
const GameHeight = GameBoard.height;
const BackGroundColor = "white";
const SnakeColor = "lightgreen";
const SnakeBorder = "black";
const FoodColor = "red";
const UnitSize = 25;

let isRunning = false;
let xVelocity = UnitSize;
let yVelocity = 0;
let xFood, yFood;
let Score = 0;
let Snake = [
    {x:UnitSize*2, y:0},
    {x:UnitSize*1, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
ResetBtn.addEventListener("click", resetGame);

gameStart();

/**OTHER FUNCTION */
function preventScrolling(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}
/**GAME FUNCTION */
function gameStart(){
    isRunning = true;
    createFood();
    ScoreText.textContent = Score;
    drawFood();
    nextTick();
    window.addEventListener("keydown",preventScrolling, false);
};
function nextTick(){
    if(isRunning){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else displayGameOver();
};
function createFood(){
    function randomFood(min, max){
        const random = Math.round((Math.random() * (max - min) + min)/UnitSize) * UnitSize;
        return random;
    }
    xFood = randomFood(0, GameWidth - UnitSize);
    yFood = randomFood(0, GameHeight - UnitSize);
}
function drawFood(){
    ctx.fillStyle = FoodColor;
    ctx.fillRect(xFood, yFood, UnitSize, UnitSize);
}
function clearBoard(){
    ctx.fillStyle = BackGroundColor;
    ctx.fillRect(0, 0, GameWidth, GameHeight);
}
function drawSnake(){
    ctx.fillStyle = SnakeColor;
    ctx.strokeStyle = SnakeBorder;
    Snake.forEach(SnakePart =>{
        ctx.fillRect(SnakePart.x, SnakePart.y, UnitSize, UnitSize);
        ctx.strokeRect(SnakePart.x, SnakePart.y, UnitSize, UnitSize);
    })
};
function moveSnake(){
    const Head = {
        x: Snake[0].x + xVelocity,
        y: Snake[0].y + yVelocity
    };
    Snake.unshift(Head);
    // ran an duoc moi
    if(Snake[0].x == xFood && Snake[0].y == yFood){
        Score++;
        ScoreText.textContent = Score;
        createFood();
    } 
    else Snake.pop();
    
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    
    // boolean direction var
    const goingUp = (yVelocity == -UnitSize);
    const goingDown = (yVelocity == UnitSize);
    const goingLeft = (xVelocity == -UnitSize);
    const goingRight = (xVelocity == UnitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -UnitSize;
            yVelocity = 0;
            break;

        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -UnitSize;
            break;
        
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = UnitSize;
            yVelocity = 0;
            break;
    
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = UnitSize;
            break;              
    }
};
function checkGameOver(){
    switch(true){
        case (Snake[0].x < 0):
            isRunning = false;
            break;

        case (Snake[0].x >= GameWidth):
            isRunning = false;
            break;

        case (Snake[0].y >= GameHeight):
            isRunning = false;
            break;
        
        case (Snake[0].y < 0):
            isRunning = false;
            break;               
    }   
    for(var i = 1; i < Snake.length; i++){
        if(Snake[i].x == Snake[0].x && Snake[i].y == Snake[0].y)
            isRunning = false;
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", GameWidth/2, GameHeight/2);
    isRunning = false; 
    window.removeEventListener("keydown",preventScrolling, false);
};
function resetGame(){
    Score = 0;
    xVelocity = UnitSize;
    yVelocity = 0;
    Snake = [
        {x:UnitSize*2, y:0},
        {x:UnitSize*1, y:0},
        {x:0, y:0}
    ];
    gameStart();
};

