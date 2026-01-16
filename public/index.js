const investmentForm = document.querySelector("#investment-form");
const closeButton = document.querySelector("#close-button");
const dialog = document.querySelector("dialog");
const investmentSummary = document.querySelector("#investment-summary");

let purchasePrice = null;

investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  purchasePrice = currentPrice.textContent;
  investmentSummary.textContent = `You just bought some ounces (ozt) for $${purchasePrice}. \n You will receive
  documentation shortly.`;
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  console.log("Test 1.");
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
