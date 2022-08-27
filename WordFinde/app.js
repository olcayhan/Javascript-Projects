// declaration
let btnAudio = new Audio('https://www.soundjay.com/communication/sounds/typewriter-key-1.mp3') // sound effect for a keyboard button
let okAudio = new Audio('https://www.soundjay.com/communication/sounds/cassette-eject-1.mp3') // sound effect for ok button on keyboard
let delAudio = new Audio('https://www.soundjay.com/communication/sounds/tape-recorder-eject-1.mp3') // sound effect for del button on keyboard
var rightanswer = []; // a list for right answer
var wronganswer = []; // a list for wrong answer
var c =0 // counter for controller function which is keep game is where. 
var a=0; // counter for all press in all boxes
var temp =0; // counter for all press in boxes at each row
let word; // word for guessing


// load queries
const generator = document.querySelector(".generator");
const keyboard = document.querySelectorAll(".buttons");
const box = document.querySelectorAll(".box");
const enterBtn = document.querySelector(".enterBtn");
const enterPage = document.querySelector(".enterPage");

const sleep = ms => new Promise(r => setTimeout(r, ms));

const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('dark');
})


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
        if (temp<=6){
            box[a].innerHTML = e.target.id;
            a++;
        }
        else temp = 6;
        btnAudio.load();
        btnAudio.play();
        setTimeout(() => {btnAudio.pause()},200);
        console.log(temp,a,c)

    }
  
    if (temp ==6 && e.target.id == "ok"){
        temp -= 6;
        contoller();
        okAudio.play();

    }

    if(e.target.id == "del" && temp <=6){
        if (a>0 && temp>0){
            a--;
            temp--;
            box[a].innerHTML = "";
            delAudio.load();
            delAudio.play();
            setTimeout(() => {delAudio.pause();},150);
            
        } 
    }
}

// function for getting word with API on the server.
function getWord(){
    return fetch("https://random-word-api.herokuapp.com/word?length=6")
    .then(response => response.json())
    .then(response => response[0]);
}

// function for checking gueesed letter true, false or letter in word but wrong box.
async function contoller(){ 
    
    rightanswer = [];
    for(let i =0; i<6;i++){
        console.log(Date.now)
        await sleep(250);
        console.log(Date.now)
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
    c += 6
    console.log("Controller Working");
    if (rightanswer.join('') == word || c == 30) Overtester();
    
    
}

// function for checking player won or lose
async function Overtester(){
    await sleep(1000);
    console.log("Overtester Worked");
    
    var div = document.createElement("div");
    div.className = "gameOver";
    div.id = "gameOver";

    if(rightanswer.join('') == word){
        console.log(c)
        div.innerHTML = `Congrualtions!! <br>You are a Winner <br><br> ${word} <br> you achieved at ${c/6} .step <br> your point = ${120-(c/6)*20}`;
        div.style.background= "#00A170";
    }
    else div.innerHTML = `Unlucky!! <br>  Try Again <br><br> ${word}`;
    document.getElementById("endGame").appendChild(div);

    var btn = document.createElement("button")
    btn.id = "gameBtn";
    btn.className = "gameBtn";
    btn.innerHTML = "Play Again"
    document.getElementById("endGame").appendChild(btn)
   
    var btnTo = document.getElementById("gameBtn")
    btnTo.addEventListener("click",()=>{location.reload()}); //reload the screen for play again
}
