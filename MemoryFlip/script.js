const cardArray = [
    {
        name: "snake",
        img: "images/animal1.png",

    },
    {
        name: "kangaroo",
        img: "images/animal2.png",

    },
    {
        name: "sheep",
        img: "images/animal3.png",

    },
    {
        name: "turtle",
        img: "images/animal4.png",

    },
    {
        name: "giraffe",
        img: "images/animal5.png",

    },
    {
        name: "lobster",
        img: "images/animal6.png",

    },
    {
        name: "snake",
        img: "images/animal1.png",

    },
    {
        name: "kangaroo",
        img: "images/animal2.png",

    },
    {
        name: "sheep",
        img: "images/animal3.png",

    },
    {
        name: "turtle",
        img: "images/animal4.png",

    },
    {
        name: "giraffe",
        img: "images/animal5.png",

    },
    {
        name: "lobster",
        img: "images/animal6.png",

    }
];

let selectedCard = [];
let cardIDs = [];
let checkWon = 0;



const card = document.querySelectorAll(".card");


// for suffle place of cards
cardArray.sort(() => 0.5 - Math.random());

function init() {
    for (let i = 0; i < cardArray.length; i++) {
        let back = document.createElement("img");
        back.setAttribute("src", "images/background.png");
        back.setAttribute("card-id", i);
        back.addEventListener("click", flipCards);
        card[i].appendChild(back);
        
    }
}

init();



function flipCards() {
    const id = this.getAttribute('card-id');
    selectedCard.push(cardArray[id].name);
    cardIDs.push(id);
    this.setAttribute("src",cardArray[id].img);
    if(selectedCard.length == 2){
        setTimeout(controller,400);
    }
} 

function controller(){
    const img = document.querySelectorAll("img");

    if (cardIDs[0] == cardIDs[1]){
        img[cardIDs[0]].setAttribute("src","images/background.png");
        img[cardIDs[1]].setAttribute("src","images/background.png");
    }

    if(selectedCard[0] == selectedCard[1]){
        img[cardIDs[0]].removeEventListener("click",flipCards)
        img[cardIDs[1]].removeEventListener("click",flipCards)
        checkWon++;
    }
    else{
        img[cardIDs[0]].setAttribute("src","images/background.png");
        img[cardIDs[1]].setAttribute("src","images/background.png");
    }
    cardIDs = [];
    selectedCard = [];

    if (checkWon == 6) console.log("congr");
}




