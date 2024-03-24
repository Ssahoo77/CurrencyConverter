const base_URL="https://api.exchangerate-api.com/v4/latest";

const dropdowns= document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg=document.querySelector(".msg")

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText= currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected= "selected";

        }

        else if(select.name === "to" && currCode === "INR"){
            newOption.selected= "selected";
            
        }

        select.append(newOption);

    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });

};

const updateFlag = (Element) =>{
    let currCode= Element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= Element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount= document.querySelector("form input");
    let amtVal= amount.value;
    
    if(amtVal === "" || amtVal < 1){
        amtVal =1;
        amount.value=1;
    }

    //console.log(fromCurr.value, toCurr.value);
    const URL=`${base_URL}/${fromCurr.value.toLowerCase()}`;
    const toURL=`${base_URL}/${toCurr.value.toLowerCase()}`;

    let responsefrom = await fetch(URL);
    let datafrom= await responsefrom.json();

    let responseto= await fetch(toURL)
    let datato= await responseto.json();
    
    const toRate= datafrom.rates[toCurr.value];


    const convertedAmt= (amtVal) * toRate;
    console.log(convertedAmt);

    msg.innerText=`${amtVal} ${fromCurr.value} = ${convertedAmt} ${toCurr.value}`;
});