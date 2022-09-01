const score = document.querySelector(".point");
var hole = document.querySelectorAll(".hole");
const sleep = ms => new Promise(r => setTimeout(r, ms));
var mole = document.createElement("img");



async function getMole(){
    let random = Math.floor(Math.random() * 15)+1
    mole.src = "images/animal.png";
    document.getElementById(`hole${random}`).appendChild(mole);
    await sleep(1000);
    document.getElementById(`hole${random}`).removeChild(mole);

}
async function getTime(){
   while(true){
    await sleep(1000);
    getMole();
   }
    
}

getTime();
