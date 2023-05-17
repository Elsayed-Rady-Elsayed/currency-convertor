let tags = [];
let allRates;
let getSelectInputOfFrom = document.querySelector("#from select");
let getSelectInputOfTo = document.querySelector("#to select");
let amount = document.getElementById("amount");
let convert = document.getElementById("convert");
let card = document.getElementById("res");
fetch(
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=6d943396acb94906a742502c44b5e167"
)
  .then((res) => res.json())
  .then((currency) => {
    allRates = currency.rates;
    for (let c in allRates) {
      tags.push(c);
    }
  })
  .then((r) => {
    tags.sort();
    let curFrom, curTo;
    tags.forEach((el) => {
      let tagElement = document.createElement("option");
      let tagElement1 = document.createElement("option");
      tagElement.innerText = el;
      tagElement1.innerText = el;
      tagElement.value = el;
      tagElement1.value = el;
      tagElement.classList = "tag-el";
      if (el != "00" && el != "1INCH") {
        getSelectInputOfFrom.appendChild(tagElement);
        getSelectInputOfTo.appendChild(tagElement1);
      }
    });
    window.addEventListener("click", (evt) => {
      let from = getSelectInputOfFrom.value;
      let to = getSelectInputOfTo.value;
      if (evt.target.id == "convert") {
        console.log(to);
        card.style.display = "flex";
        document.querySelector(".res #from").innerHTML = "USD";
        document.querySelector(".res #to").innerHTML = to;
        evt.preventDefault();
        if (!isNaN(+amount.value)) {
          document.querySelector(".res #amount").innerHTML = amount.value;
          document.querySelector(".res #rate").innerHTML = (
            amount.value * allRates[to]
          ).toFixed(5);
        }
      }
      if (evt.target.id == "close-res") {
        card.style.display = "none";
      }
      curFrom = allRates[from];
      curTo = allRates[to];
    });
  })
  .catch((error) => console.error(error));
