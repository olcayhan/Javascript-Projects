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
        card[i].setAttribute("card-id", i);
        card[i].appendChild(back);
        card[i].addEventListener("click", flipCards);
        
    }
}

init();



function flipCards() {
    const id = this.getAttribute('card-id');
    selectedCard.push(cardArray[id].name);
    cardIDs.push(id);
    let thisImg = this.firstChild;
    thisImg.setAttribute("src",cardArray[id].img);
    this.style.transition = "transform 0.8s";
    this.style.transformStyle= "preserve-3d";
    this.style.transform =  "rotateY(180deg)";
    
    
    if(selectedCard.length == 2){
        setTimeout(controller,400);
    }
} 

function controller(){
    const img = document.querySelectorAll("img");

    if (cardIDs[0] == cardIDs[1]){
        
        card[cardIDs[0]].style.transform =  "rotateY(0deg)";
        card[cardIDs[1]].style.transform =  "rotateY(0deg)";
        img[cardIDs[0]].setAttribute("src","images/background.png");
        img[cardIDs[1]].setAttribute("src","images/background.png");
    }

    if(selectedCard[0] == selectedCard[1]){
        card[cardIDs[0]].style.transform =  "rotateY(0deg)";
        card[cardIDs[1]].style.transform =  "rotateY(0deg)";
        card[cardIDs[0]].removeEventListener("click",flipCards)
        card[cardIDs[1]].removeEventListener("click",flipCards)
        checkWon++;
        setTimeout(()=>{
            if (checkWon == 6) alert("congrulations");
        },1000)
       
    }
    else{
        card[cardIDs[0]].style.transform =  "rotateY(0deg)";
        card[cardIDs[1]].style.transform =  "rotateY(0deg)";
        img[cardIDs[0]].setAttribute("src","images/background.png");
        img[cardIDs[1]].setAttribute("src","images/background.png");
    }
    cardIDs = [];
    selectedCard = [];

   
}




