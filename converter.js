const BASE_URL = 
// "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";
"https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")






let i = 0;
for(let select of dropDowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
}
select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
    updateExchangeRate();
    
})
// currency symbols 
}

const updateExchangeRate = async () => {
    // swapArro();

     let amount =document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<=0){
        amtVal = 1;
        amount.value = "1";
    }

    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();
    
    const URL = `${BASE_URL}/${from}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data)

    let rate = data[from][to];
    // console.log(rate);

    let finalAmount = amtVal*rate.toFixed(2);
    // console.log(finalA);
    const ToSymbols = currencySymbols[toCurr.value] || "";
    const FromSymbols = currencySymbols[fromCurr.value] || ""

    msg.innerHTML = `${FromSymbols}<span style="color:green">${amtVal}</span> ${fromCurr.value}  =  ${ToSymbols}<span style="color:green">${finalAmount} </span> ${toCurr.value}`;

    if (fromCurr.value === toCurr.value){
        alert("Can't Exchange in same currecy!\nDo it again");
        msg.innerText = "";
    }
}
const swapArro = () => {
     swap = document.getElementById("swap")
    swap.addEventListener("click", ()=>{
        let temp = fromCurr.value;
        fromCurr.value = toCurr.value;
        toCurr.value = temp;

        // console.log(currCode)
        updateFlag(fromCurr);
        updateFlag(toCurr);


        updateExchangeRate();
    })
    
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    // console.log(countryCode);
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();

})

window.addEventListener("load", () =>{
    updateExchangeRate();
});

// Symbols in msg 

;

// console.log(symbols);/
// let currencySymbols;
// console.log(toCurr.value[to])
swapArro();