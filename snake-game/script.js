const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const box=20;

let snake=[{x:9*box,y:10*box}];

let food={
x:Math.floor(Math.random()*20)*box,
y:Math.floor(Math.random()*20)*box
};

let direction="RIGHT";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highScore").innerText = highScore;

document.addEventListener("keydown",changeDirection);

function changeDirection(event){
if(event.key==="ArrowLeft"&&direction!=="RIGHT")direction="LEFT";
if(event.key==="ArrowUp"&&direction!=="DOWN")direction="UP";
if(event.key==="ArrowRight"&&direction!=="LEFT")direction="RIGHT";
if(event.key==="ArrowDown"&&direction!=="UP")direction="DOWN";
}

function draw(){

ctx.fillStyle="black";
ctx.fillRect(0,0,400,400);

for(let i=0;i<snake.length;i++){
ctx.fillStyle=i==0?"lime":"green";
ctx.fillRect(snake[i].x,snake[i].y,box,box);
}

ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,box,box);

let snakeX=snake[0].x;
let snakeY=snake[0].y;

if(direction==="LEFT")snakeX-=box;
if(direction==="UP")snakeY-=box;
if(direction==="RIGHT")snakeX+=box;
if(direction==="DOWN")snakeY+=box;

if(snakeX==food.x&&snakeY==food.y){
    score++;
document.getElementById("score").innerText = score;

if(score > highScore){
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById("highScore").innerText = highScore;
}
if (score % 5 === 0) {
    clearInterval(game);
    speed = Math.max(50, speed - 10);
    game = setInterval(draw, speed);
}
food={
x:Math.floor(Math.random()*20)*box,
y:Math.floor(Math.random()*20)*box
};
}else{
snake.pop();
}

const newHead={x:snakeX,y:snakeY};

if(
snakeX<0||snakeY<0||
snakeX>=400||snakeY>=400||
snake.some(s=>s.x===snakeX&&s.y===snakeY)
){
clearInterval(game);
alert("Game Over!\nYour Score:" + score);
}

snake.unshift(newHead);

}

let speed = 120;
let game = setInterval(draw, speed);
document.getElementById("up").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});

document.getElementById("down").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});

document.getElementById("left").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});

document.getElementById("right").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});
document.getElementById("restart").addEventListener("click", function () {
    location.reload();
});
let startX = 0;
let startY = 0;

canvas.addEventListener("touchstart", function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

canvas.addEventListener("touchend", function(e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let dx = endX - startX;
    let dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction !== "LEFT") {
            direction = "RIGHT";
        } else if (dx < 0 && direction !== "RIGHT") {
            direction = "LEFT";
        }
    } else {
        if (dy > 0 && direction !== "UP") {
            direction = "DOWN";
        } else if (dy < 0 && direction !== "DOWN") {
            direction = "UP";
        }
    }
});