//const URL="https://cat-fact.herokuapp.com/facts";
// let f=document.querySelector("#fact");
// let b=document.querySelector("#bt");
// //---------------------------Async Await-------------------------
// // const getData=async()=>{
// //     console.log("getting dataa....");
// //     let response=await fetch(URL);
// //     //console.log(response);
// //     let Data=await response.json();
// //     console.log(Data[0]);
// //     for (const i of Data) {
// //      f.innerHTML=i.text;   
// //      console.log(i.text);
// //     }

// // };
// //-----------------------Promise--------------------
// function fetchdata(){
// fetch(URL).then((response)=>{
//     return response.json();
// }).then((data)=>{
//     f.innerHTML=data[0].text;
// console.log(data[0].text);
// });
// }
//b.addEventListener("click",fetchdata);










//----------------------------Currency Converter-------------------------------------------------------

const B_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#submit");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const result=document.querySelector(".result span");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
          } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
          }
        select.append(newOption);
    }
    //jb bi apan na kuch change kara to kaha change aaya isko btana k liya target hota h
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate=async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        alert("Enter a valid Number");
        result.innerHTML=0;
    } 

    const URL = `${B_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;   
    console.log(data);
    console.log(rate);
    console.log(toCurr.value);
    console.log(finalAmount);
        result.innerHTML=finalAmount;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
   updateExchangeRate();
});

// window.addEventListener("load",()=>{
//     updateExchangeRate();
// });
