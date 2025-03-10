const lg = console.log;

// Selecting elements by their IDs
const container = document.getElementById("container");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const inputAmount = document.getElementById("toInput");
const outputAmount = document.getElementById("toOutput");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");
const rateDiv = document.getElementById("swap-and-rate-div");

const url =
  "https://v6.exchangerate-api.com/v6/5aa7bbef8b5cde5a3cf2cf4f/latest/USD";

fromCurrency.value = "NZD";
toCurrency.value = "NPR";
inputAmount.value = 1;

// currency Calculator function
function convertCurrency() {
  const fromCurrencyEL = fromCurrency.value;
  const toCurrencyEl = toCurrency.value;
  const inputCurrencyAmount = +inputAmount.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/5aa7bbef8b5cde5a3cf2cf4f/latest/${fromCurrencyEL}`
  )
    .then((res) => res.json())
    .then((data) => {
      lg(data);
      const todayRate = data.conversion_rates[`${toCurrencyEl}`];
      rate.innerHTML = `1 ${fromCurrencyEL} = ${todayRate} ${toCurrencyEl}  `;
      const total = todayRate * inputCurrencyAmount.toFixed(2);
      outputAmount.value = total;

    })
    .catch((error) => {
      lg("Data fetching error", error);
    });
}

// reversed currency
function reversedCurrency() {
  const fromCurrencyEL = fromCurrency.value;
  const toCurrencyEl = toCurrency.value;

  const outputCurrencyAmount = +outputAmount.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/5aa7bbef8b5cde5a3cf2cf4f/latest/${fromCurrencyEL}`
  )
    .then((res) => res.json())
    .then((data) => {
      const todayRate = data.conversion_rates[`${toCurrencyEl}`];
      rate.innerHTML = `1 ${fromCurrencyEL} = ${todayRate} ${toCurrencyEl}  `;
      const total = outputCurrencyAmount / todayRate;
      inputAmount.value = total;
    
    })
    .catch((error) => {
      lg("Data fetching error", error);
    });
}

// swap value function
function swapValue(){
//     const temp = outputAmount.value;
//     const tempb = inputAmount.value;
// //   ---- currency swap-----

// const sign = fromCurrency.value;
// const signb = toCurrency.value;
// toCurrency.value = sign;
// fromCurrency.value = signb;
//     //---------------currency amout swap----------
//    inputAmount.value = temp;
//    outputAmount.value = tempb;


   // Swap currency types
[fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];

// Swap currency amounts
[inputAmount.value, outputAmount.value] = [outputAmount.value, inputAmount.value];


   convertCurrency(); // this function is called to ensure upadated exchange rate

}



// functions
convertCurrency();

// event listiners
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);
inputAmount.addEventListener("input", convertCurrency);
outputAmount.addEventListener("input", reversedCurrency);
swap.addEventListener("click", swapValue)
