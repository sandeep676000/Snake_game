//game constants
let inputDir={x: 0, y:0}
const foodSound=new Audio('./music/food.mp3')
const gameOverSound =new Audio('./music/gameover.mp3');
const moveSound =new Audio('./music/move.mp3')
const musicSound=new Audio ('./music/music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:14 , y: 14}];
food={x:15,y:15}
let highscoreval=0;
// Game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function iscollide(sarr){
    //If the snake bite itself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x ==snakeArr[0].x && snakeArr[i].y ==snakeArr[0].y){
            return true;
        }
    }
    //if you collide into wall
        if(snakeArr[0].x>=18  || snakeArr[0].x<=0||snakeArr[0].y>=18  || snakeArr[0].y<=0){
            return true;
        }
    return false;
}

function gameEngine(){
    //Part 1 : - Updating the snake array
    if(iscollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0, y:0};
        alert("Game Over press any key to play again");
        snakeArr=[{x:13 , y: 15}];
        musicSound.play();
        score=0;
        scores.innerHTML='Score : ' + score;
    }
    //if you have eaten the food ,increament the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            highscores.innerHTML="Highest : "+highscoreval;
        }
        scores.innerHTML='Score : ' + score;
        console.log(score);
        snakeArr.unshift({x :snakeArr[0].x +inputDir.x, y :snakeArr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food ={x : Math.round(a + (b-a) * Math.random()),y : Math.round(a + (b-a)* Math.random())}
    }

    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2 : - Render the snake and food
    //Displaying the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //Displaying the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



let highscore=localStorage.getItem("highscore");
if(highscore === null){
    console.log("hell");
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore);
    highscores.innerHTML="HighScore : "+ highscore;
}

//keydown is use when a person press a button then what happen
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir ={x: 0,y:1}//Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})