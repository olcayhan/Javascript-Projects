// declaration
let rightanswer = []; // a list for right answer
let wronganswer = []; // a list for wrong answer
let c =0 // counter for controller function which is keep game is where. 
let a = 0; // counter for all press in all boxes
let temp =0; // counter for all press in boxes at each row
let word; // word for guessing


// load queries
const generator = document.querySelector(".generator");
const keyboard = document.querySelectorAll(".buttons");
const box = document.querySelectorAll(".box");
const enterBtn = document.querySelector(".enterBtn");
const enterPage = document.querySelector(".enterPage");
const github = document.querySelector(".githuba")

const sleep = ms => new Promise(r => setTimeout(r, ms));

const checkbox = document.getElementById('checkbox');

// dark mode button, if you want ot switch between dark and light mode
checkbox.addEventListener('change', ()=>{document.body.classList.toggle('dark'),github.style.color="white"})

// a button function to start game
enterBtn.addEventListener("click",()=>{enterPage.parentNode.removeChild(enterPage);})

// take the word for guess
getWord().then(response => (word = response.toUpperCase()));

// keyboard listener
for (let i=0; i < keyboard.length;i++) keyboard[i].addEventListener("click",(e)=>getKeyboard(e)); // each press of keyboard

// function for getting keyboard in the website
function getKeyboard(e){
    console.log(word)
    
    if(e.target.id != "del" && e.target.id != "ok"){
        temp++;
        if (temp<=5){
            box[a].innerHTML = e.target.id;
            a++;
        }
        else temp = 5;
    }
  
    if (temp ==5 && e.target.id == "ok"){
        contoller();
        temp -= 5;

    }

    if(e.target.id == "del" && temp <=5){
        if (a>0 && temp>0){
            a--;
            temp--;
            box[a].innerHTML = "";    
        } 
    }
}

// function for getting word with API on the server.
function getWord(){
    return fetch("https://random-word-api.herokuapp.com/word?length=5")
    .then(response => response.json())
    .then(response => response[0]);
}

// function for checking gueesed letter true, false or letter in word but wrong box.
async function contoller(){ 
    
    rightanswer = [];
    for(let i =0; i<5;i++){
        await sleep(250);
        if(box[i+c].textContent == word[i]){
            box[i+c].style.background = "#88B04B";
            box[i+c].style.border = "#88B04B";
            box[i+c].style.transition = "all 0.3s ease-out";
            rightanswer[i] = word[i];
            word[i] = "";
        }

        else if(word.includes(box[i+c].textContent)){
            box[i+c].style.background = "#EFC050"
            box[i+c].style.border = "#EFC050"
            box[i+c].style.transition = "all 0.3s ease-out";

        }
        else{
            
            wronganswer.push(box[i+c].textContent);
            box[i+c].style.background = "#787c7e"
            box[i+c].style.border = "#787c7e"
            box[i+c].style.transition = "all 0.3s ease-out";

            for(let i =0;i<keyboard.length;i++) if (wronganswer.includes(keyboard[i].id)) keyboard[i].style.background="#787c7e" ; 
        }
            
        
    }
    c += 5
    console.log("Controller Working");
    if (rightanswer.join('') == word || c == 25) Overtester();
    
    
}

// function for checking player won or lose
async function Overtester(){
    await sleep(1000);
    console.log("Overtester Worked");
    
    var div = document.createElement("div");
    div.className = "gameOver";
    div.id = "gameOver";

    if(rightanswer.join('') == word){
        div.innerHTML = `<h1>Congrualtions!!</h1> <h2>${word}</h2> <h2>you achieved at ${c/5} .step</h2> <h2>your point = ${120-(c/5)*20}</h2>`;
        div.style.background= "#00A170";
    }
    else div.innerHTML = `<h1>Unlucky!!</h1> <h2>Try Again<h2> <h2>${word}</h2>`;
    document.getElementById("endGame").appendChild(div);

    var btn = document.createElement("button")
    btn.id = "gameBtn";
    btn.className = "gameBtn";
    btn.innerHTML = "Play Again"
    document.getElementById("endGame").appendChild(btn)
   
    var btnTo = document.getElementById("gameBtn")
    btnTo.addEventListener("click",()=>{location.reload()}); //reload the screen for play again
}

