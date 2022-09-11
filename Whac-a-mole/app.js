let extra = 0;
let distance = 0;
let count = 0;
let scoreNum = 0;
let random = 0;
let step = 0;
let counter = 60;


const start = document.querySelector(".startGame");
const time = document.querySelector("#time");
const github = document.querySelector(".githuba");
const score = document.querySelector(".point");
const hole = document.querySelectorAll(".hole");
const mole = document.createElement("img");
const ball = document.querySelector(".ball");
const body = document.querySelector("body");

ball.addEventListener("click", clicked);
start.addEventListener("click", getMoleaTime);
mole.addEventListener("click", scoreCounter);

// a function to switch dark mode and light mode
function clicked() {
  if (count == 0) {
    ball.style.margin = "5px 0px 0px 50%";
    ball.style.transition = "all 0.5s ease-out";
    body.style.background = "#293462";
    github.style.color = "#fff";
    count++;

  } else {
    ball.style.margin = "5px 0px 0px 5px";
    body.style.background = "#F3E0B5";
    ball.style.transition = "all 0.5s ease-out"
    github.style.color = "#111";
    count--;
  }
}

// a function to generate a mole on screen
function getMole(){
    random = Math.floor(Math.random() * 15) + 1
    mole.src = "images/animal.png";
    document.getElementById(`hole${random}`).appendChild(mole);

    if(document.getElementById(`hole${random}`).innerText != "") document.getElementById(`hole${random}`).removeChild(mole);
}
// a function to get a mole a time
function getMoleaTime(){

setInterval(()=>{
        tester();
        time.innerText = counter;
                },1000)

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
    if (counter == 0 && step == 0){

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
        step = 1;
    }
    else if(counter > 0) {
        getMole();
        counter -= 1;
    }
   
}
