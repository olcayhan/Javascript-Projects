const cardArray =[
{
    name:"fries",
    img: "images/fries.png",
    
},
{
    name:"cheeseburger",
    img: "images/cheeseburger.png",
},
{
    name:"hotdog",
    img: "images/hotdog.png",
},
{
    name:"ice-cream",
    img: "images/ice-cream.png",
},
{
    name:"milkshake",
    img: "images/milkshake.png",
},
{
    name:"pizza",
    img: "images/pizza.png",
},
{
    name:"fries",
    img: "images/fries.png",
    
},
{
    name:"cheeseburger",
    img: "images/cheeseburger.png",
},
{
    name:"hotdog",
    img: "images/hotdog.png",
},
{
    name:"ice-cream",
    img: "images/ice-cream.png",
},
{
    name:"milkshake",
    img: "images/milkshake.png",
},
{
    name:"pizza",
    img: "images/pizza.png",
}
]


cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result")
let cardsChosen = [];
let cardsChosenIDs = [];
const cardsWon = [];



function createBoard(){
    for(let i=0;i<cardArray.length;i++){
        const card = document.createElement("img");
        card.setAttribute("src","images/blank.png");
        card.setAttribute("data-id",i);
        card.addEventListener("click",flipCard);
        gridDisplay.append(card);
    }
}

createBoard();

function checkMatch(){
    const cards = document.querySelectorAll("img")
    const optionOneId = cardsChosenIDs[0];
    const optiontwoId = cardsChosenIDs[1];
    if(optionOneId == optiontwoId){
        
        cards[optionOneId].setAttribute("src","images/blank.png")
        cards[optiontwoId].setAttribute("src","images/blank.png")
        alert("you have clicked same image !!")
    }


    if (cardsChosen[0] == cardsChosen[1] && optionOneId != optiontwoId){
       
        cards[optionOneId].setAttribute("src","images/white.png")
        cards[optiontwoId].setAttribute("src","images/white.png")
        cards[optionOneId].removeEventListener("click",flipCard)
        cards[optiontwoId].removeEventListener("click",flipCard)
        cardsWon.push(cardsChosen);
    }else{
        cards[optionOneId].setAttribute("src","images/blank.png")
        cards[optiontwoId].setAttribute("src","images/blank.png")
        
    }
    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIDs = [];
    if(cardsWon.length === cardArray.length/2){
        resultDisplay.innerHTML =  "You found them all!!"
    }
}

function flipCard(){
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIDs.push(cardId)
    this.setAttribute("src",cardArray[cardId].img)
    if(cardsChosen.length === 2){
        setTimeout(checkMatch, 200)
    }
}








