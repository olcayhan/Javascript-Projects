// declarations
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
let count = 0;
let counter = 0;
let scoreCounter = 0;

// cards in the game
// start button listener
const startBtn = document.querySelector(".startBtn");
const screen = document.querySelector(".flipscreen")
const scoreCnt = document.querySelector(".scoreCounter");
const startScreen = document.querySelector(".startScreen")


// variables for need dark mode
const ball = document.querySelector(".ball");
const body = document.querySelector("body");

ball.addEventListener("click", clicked);
startBtn.addEventListener("click", init);

// a function for initialize the game
function init() {
    count++;
    if (count==1) screen.removeChild(startScreen);
    startBtn.innerHTML = "Retry";
    if (count == 2) startBtn.addEventListener("click", location.reload());

    cardArray.sort(() => 0.5 - Math.random());

    for (let i = 0; i <= 2; i++) {
        var cardsRowGenerate = document.createElement("div");
        cardsRowGenerate.className = "cards";
        for (let i = 0; i <= 3; i++) {
            var cardGenerate = document.createElement("div");
            cardGenerate.className = "card";
            cardsRowGenerate.appendChild(cardGenerate);
        }
        screen.appendChild(cardsRowGenerate);
    }

    var card = document.querySelectorAll(".card");


    for (let i = 0; i < cardArray.length; i++) {

        card[i].setAttribute("card-id", i);
        var id = card[i].getAttribute('card-id');

        let cardFront = document.createElement("img");
        let cardBack = document.createElement("img");



        cardBack.setAttribute("src", cardArray[id].img);
        cardBack.className = "cardBack";
        cardFront.setAttribute("src", "images/background.png");
        cardBack.className = "cardFront";


        cardBack.style.transform = "rotateY(180deg)"
        cardBack.style.backfaceVisibility = "hidden";
        cardFront.style.backfaceVisibility = "hidden";

        card[id].appendChild(cardFront);
        card[id].appendChild(cardBack);


        card[id].addEventListener("click", flipCards)

    }
}

// a function for flip the cards
function flipCards() {
    var card = document.querySelectorAll(".card");
    selectedCard.push(cardArray[this.getAttribute('card-id')].name);
    cardIDs.push(this.getAttribute('card-id'));

    this.style.transition = "ease-in-out 0.8s";
    this.style.transformStyle = "preserve-3d";
    this.style.transform = "rotateY(180deg)";

    card[cardIDs[0]].style.animation = "";
    card[cardIDs[1]].style.animation = "";


    if (selectedCard.length == 2) {
        setTimeout(() => {
            controller();
        }, 800);
    }
}

// a function for controller the cards true or false
function controller() {
    var card = document.querySelectorAll(".card");


    if (cardIDs[0] == cardIDs[1]) {
        card[cardIDs[0]].style.animation = "shake 0.4s";
        card[cardIDs[0]].style.transform = "rotateY(0deg)";
        scoreCounter -= 10;
    }

    else if (selectedCard[0] === selectedCard[1]) {


        card[cardIDs[0]].style.transition = "all 0.4s ease";
        card[cardIDs[1]].style.transition = "all 0.4s ease";
        card[cardIDs[0]].style.marginTop = "20px";
        card[cardIDs[1]].style.marginTop = "20px";


        card[cardIDs[0]].style.transform = "rotateY(180deg)";
        card[cardIDs[1]].style.transform = "rotateY(180deg)";
        card[cardIDs[0]].removeEventListener("click", flipCards);
        card[cardIDs[1]].removeEventListener("click", flipCards);



        scoreCounter += 100;
        checkWon++;

        if (checkWon == 6) setTimeout(() => { alert("congrulations") }, 1000)

    }
    else {

        card[cardIDs[0]].style.animation = "shake 0.4s";
        card[cardIDs[1]].style.animation = "shake 0.4s";

        card[cardIDs[0]].style.transform = "rotateY(0deg)";
        card[cardIDs[1]].style.transform = "rotateY(0deg)";

        scoreCounter -= 20;
    }



    cardIDs = [];
    selectedCard = [];

    scoreCnt.innerHTML = ` Score : ${scoreCounter} `;
}

// a function for starting the game 
function clicked() {
    if (counter == 0) {
        ball.style.margin = "5px 0px 0px 50px";
        ball.style.transition = "all 0.5s ease-out";
        body.style.background = "#293462";
        counter++;
    } else {
        ball.style.margin = "5px 0px 0px 5px";
        body.style.background = "#EEE3CB";
        ball.style.transition = "all 0.5s ease-out";
        counter--;
    }
}


