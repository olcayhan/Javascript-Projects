let extra = 0;
let distance = 0;
let count = 0;
let scoreNum = 0;
let random = 0;
let step = 0;

const counter = 30000;
const second = 1000;
const countDown = new Date().getTime() + counter;
const start = document.querySelector(".startGame");
const time = document.querySelector("#time");

const score = document.querySelector(".point");
const hole = document.querySelectorAll(".hole");
const sleep = ms => new Promise(r => setTimeout(r, ms));
const mole = document.createElement("img");




start.addEventListener("click", getMoleaTime);
mole.addEventListener("click", scoreCounter);


// a function to generate a mole on screen
async function getMole(){
    
    random = Math.floor(Math.random() * 15) + 1
    mole.src = "images/animal.png";
    document.getElementById(`hole${random}`).appendChild(mole);
    await sleep(1000);

    if(document.getElementById(`hole${random}`).innerText != "") document.getElementById(`hole${random}`).removeChild(mole);
}
// a function to get a mole a time
async function getMoleaTime(){

    setInterval(getTime, 0);

    while(true){
        await sleep(1000);
        tester();
   } 
}
// a function to get remainder
function getTime(){
    const now = new Date().getTime();
    distance = (countDown + extra) - now;

    if(distance>0) time.innerText = Math.floor((distance) / second);
    else distance = 0;
}
// a function to add score if click mole on screen. 
function scoreCounter(){
    mole.style.cursor = "pointer"
    scoreNum += 100;
    score.innerText = scoreNum;
    document.getElementById(`hole${random}`).removeChild(mole);
}

// a function to chech if play over.
function tester(){
    if (distance == 0 && step == 0){
        var div = document.createElement("div");
        div.className = "gameOver";
        div.id= "gameOver";
        div.innerHTML = `<h1>Time Over</h1> <br> <p>Your Score is : ${scoreNum} </p>`
        document.getElementById("endGame").appendChild(div);

        var againBtn = document.createElement("button");
        againBtn.className = "againBtn";
        againBtn.innerText= "Play Again"
        document.getElementById("gameOver").appendChild(againBtn);


        const playAgain = document.querySelector(".againBtn");

        playAgain.addEventListener("click", () => {location.reload();})


        step += 1
    }
    else if(distance > 0) getMole();
    else{
        return;
    }
}
