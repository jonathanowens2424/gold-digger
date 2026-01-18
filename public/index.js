const investmentForm = document.querySelector("#investment-form");
const closeButton = document.querySelector("#close-button");
const dialog = document.querySelector("dialog");
const investmentSummary = document.querySelector("#investment-summary");
const amountToInvest = document.querySelector("#investment-amount");

let purchasePrice = null;

//capture api purchases from JSON file:
try {
  const data = await fetch("/api");
  const response = await data.json();
  console.log(response);
} catch (err) {
  console.log(err);
}

//capture the amount to invest here

investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  purchasePrice = currentPrice.textContent;
  investmentSummary.textContent = `You just bought ${
    amountToInvest.value / purchasePrice
  } ounces (ozt) for $${purchasePrice}. \n You will receive
  documentation shortly.`;
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

const eventSource = new EventSource("/live-prices");
const currentPrice = document.getElementById("price-display");

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const goldPrice = data.goldPrice;
  currentPrice.textContent = goldPrice;
};
eventSource.onerror = (err) => {
  console.log(err);
};
