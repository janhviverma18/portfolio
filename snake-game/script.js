const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const box=20;

let snake=[{x:9*box,y:10*box}];

let food={
x:Math.floor(Math.random()*20)*box,
y:Math.floor(Math.random()*20)*box
};

let direction="RIGHT";

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
alert("Game Over");
}

snake.unshift(newHead);

}

const game=setInterval(draw,120);
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