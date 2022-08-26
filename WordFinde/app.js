// declaration
var rightanswer = [];
var wronganswer = [];
var c =0
var a=0;
var temp =0;
let word;
let word2;

// load queries
const generator = document.querySelector(".generator");
const keyboard = document.querySelectorAll(".buttons");
const box = document.querySelectorAll(".box")

// take the word for guess
getWord().then(response => (
    word = response.toUpperCase(),
    word2 = word.split("")
    ));

// keyboard listener
for (let i=0; i < keyboard.length;i++) keyboard[i].addEventListener("click",(e)=>getKeyboard(e));

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
    }
  
    if (temp ==6 && e.target.id == "ok"){
        temp -= 6;
        contoller();

    }

    if(e.target.id == "del" && temp <=6){
        if (a>0 && temp>0){
            a--;
            temp--;
            box[a].innerHTML = "";
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
function contoller(){ 
    
    rightanswer = [];
    for(let i =0; i<6;i++){

        if(box[i+c].textContent == word[i]){
            box[i+c].style.background = "#88B04B"
            box[i+c].style.border = "#88B04B"
            rightanswer[i] = word[i];
            word2[i] = "";
        }

        else if(word2.includes(box[i+c].textContent)){
            box[i+c].style.background = "#EFC050"
            box[i+c].style.border = "#EFC050"
        }
        else{
            wronganswer.push(box[i+c].textContent);
            box[i+c].style.background = "#787c7e"
            box[i+c].style.border = "#787c7e"
            for(let i =0;i<keyboard.length;i++) if (wronganswer.includes(keyboard[i].id)) keyboard[i].style.background="#787c7e" ;
        }
    }
    c +=6;
    console.log("Controller Working");
    if (rightanswer.join('') == word || c == 30) Overtester();
    
    
}

// function for checking player won or lose
function Overtester(){
    console.log("Overtester Worked");
    
    var div = document.createElement("div");
    div.className = "gameOver";
    div.id = "gameOver";

    if(rightanswer.join('') == word){
        console.log(c)
        div.innerHTML = `Congrualtions!! <br>You are a Winner <br><br> ${word} <br> you achieved ${c/6} .step <br> your point = ${120-(c/6)*20}`;
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
    btnTo.addEventListener("click",()=>{location.reload();
    })
}