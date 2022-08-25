var rightanswer = [];
var wronganswer =[];
var c =0
var a=0;
var temp =0;
let word;

const generator = document.querySelector(".generator");
const keyboard = document.querySelectorAll(".buttons");
const box = document.querySelectorAll(".box")



function getWord(){
    return fetch("https://random-word-api.herokuapp.com/word?length=6")
    .then(response => response.json())
    .then(response => response[0]);
    }


getWord().then(response => (word = response));



function writeWord(){
    

for (let i=0; i < keyboard.length;i++){
    keyboard[i].addEventListener("click",(e)=>getKeyboard(e));
}
}

function contoller(){ 
    
    rightanswer = [];
    for(let i =0; i<6;i++){

        if(box[i+c].textContent == word[i]){
            box[i+c].style.background = "#6aaa64"
            box[i+c].style.border = "#6aaa64"
            rightanswer[i] = word[i];
           
        }

        else if(word.includes(box[i+c].textContent)){
            box[i+c].style.background = "#c9b458"
            box[i+c].style.border = "#c9b458"
        }

        else{
            wronganswer.push(box[i+c].textContent);
            box[i+c].style.background = "#787c7e"
            box[i+c].style.border = "#787c7e"
            for(let i =0;i<keyboard.length;i++){
                if (wronganswer.includes(keyboard[i].id)){
                    keyboard[i].style.background="#787c7e" ;
                }
            } 
        } 
    }
    c +=6;
    console.log("Controller Working");
    if (rightanswer.join('') == word || c == 30){
        Overtester();
    }
    
}

function Overtester(){
    console.log("Overtester Worked");
    
    var div = document.createElement("div");
    div.className = "gameOver";
    div.id = "gameOver";

    if(rightanswer.join('') == word){
        div.innerHTML = `Congrualtions!! <br>You are a Winner <br><br> ${word} `;
    }
    else div.innerHTML = `Unlucky!! <br>  Try Again <br><br> ${word}`;
    document.getElementById("endGame").appendChild(div);

    var btn = document.createElement("button")
    btn.id = "gameBtn";
    btn.className = "gameBtn";
    btn.innerHTML = "Play Again"
    document.getElementById("endGame").appendChild(btn)
   
}

function getKeyboard(e){
    console.log(word)
        
    if(e.target.id != "del" && e.target.id != "ok"){
        temp++;
        
        if (temp<=6){
            box[a].innerHTML = e.target.id;
            a++;
        }
        else{
            temp =6;
        }
    }
    if (temp ==6 && e.target.id == "ok"){
        contoller();
        temp -=6;
    };
    console.log(temp)
    if(e.target.id == "del" && temp <=6){
        if (a>0 && temp>0){
            a--;
            temp--;
            box[a].innerHTML = "";
        } 
        
    }
}

writeWord();


