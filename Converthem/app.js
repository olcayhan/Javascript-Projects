//  value of input amunt
let input = document.querySelector("#input");
//  value of output amunt
let output = document.querySelector("#output");

// queries for using
const exchangeBtn = document.querySelector(".exchangeBtn")
const translate = document.querySelector(".translate")
let inputSlct = document.querySelector("#inputSlct");
let outputSlct = document.querySelector("#outputSlct");

// exchange the currencies
exchangeBtn.addEventListener("click",()=>{exchange()});

// computing the currencies
translate.addEventListener("click",()=>{translateCurrencies()});

// reverse function, it is use for exchange to currencies
function exchange(){
    // exchange input currency with output currency
    let temp1 = inputSlct.value
    inputSlct.value = outputSlct.value
    outputSlct.value =temp1

    // exchange input value with output value
    let temp2 = input.value;
    input.value = output.value;
    output.value = temp2;

}


// translateCurrencies function, it is use for translate to currencies
function translateCurrencies(){

    fetch(`https://api.exchangerate-api.com/v4/latest/${inputSlct.value}`)
    .then(res => res.json())
    .then(res => {
        const new_rate = res.rates[outputSlct.value];
        output.innerText = `1 ${outputSlct.value} = ${new_rate} ${outputSlct.value}`
        output.value = (input.value * new_rate).toFixed(2);
    })
}