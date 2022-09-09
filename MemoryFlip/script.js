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

const card = document.querySelectorAll(".card");
const startBtn = document.querySelector(".startBtn");

const ball = document.querySelector(".ball");
const body = document.querySelector("body");

ball.addEventListener("click", clicked);



startBtn.addEventListener("click", init);


function init() {
    count++;
    startBtn.innerHTML = "Retry"
    if (count == 2) startBtn.addEventListener("click", location.reload());

    cardArray.sort(() => 0.5 - Math.random());
    for (let i = 0; i < cardArray.length; i++) {

        let cardBack = document.createElement("img");

        cardBack.setAttribute("src", "images/background.png");


        card[i].setAttribute("card-id", i);
        card[i].appendChild(cardBack);
        card[i].addEventListener("click", flipCards);



    }
}

function flipCards() {
    const id = this.getAttribute('card-id');
    selectedCard.push(cardArray[id].name);
    cardIDs.push(id);
    let thisImg = this.firstChild;

    this.style.transition = "transform 0.8s";
    this.style.transformStyle = "preserve-3d";
    this.style.transform = "rotateY(180deg)";
    setTimeout(() => {
        thisImg.setAttribute("src", cardArray[id].img);

    }, 300);



    if (selectedCard.length == 2) {
        setTimeout(controller, 800);
    }
}

function controller() {
    const img = document.querySelectorAll("img");

    if (cardIDs[0] == cardIDs[1]) {


        card[cardIDs[0]].style.transform = "rotateY(0deg)";
        img[cardIDs[0]].setAttribute("src", "images/background.png");

    }

    else if (selectedCard[0] == selectedCard[1]) {
        card[cardIDs[0]].style.transform = "rotateY(0deg)";
        card[cardIDs[1]].style.transform = "rotateY(0deg)";
        card[cardIDs[0]].removeEventListener("click", flipCards);
        card[cardIDs[1]].removeEventListener("click", flipCards);

        checkWon++;
        setTimeout(() => {
            if (checkWon == 6) alert("congrulations");
        }, 1000)

    }
    else {
        card[cardIDs[0]].style.transform = "rotateY(0deg)";
        card[cardIDs[1]].style.transform = "rotateY(0deg)";

        img[cardIDs[0]].setAttribute("src", "images/background.png");
        img[cardIDs[1]].setAttribute("src", "images/background.png");


    }
    cardIDs = [];
    selectedCard = [];


}

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


