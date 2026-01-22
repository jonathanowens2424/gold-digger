const investmentForm = document.querySelector("#investment-form");
const closeButton = document.querySelector("#close-button");
const dialog = document.querySelector("dialog");
const investmentSummary = document.querySelector("#investment-summary");
const amountToInvest = document.querySelector("#investment-amount");

let purchasePrice = null;
let purchases = [];
//capture api purchases from JSON file:
try {
  const data = await fetch("/api");
  const response = await data.json();
  purchases = response;
} catch (err) {
  console.log(err);
}

//capture the amount to invest here

investmentForm.addEventListener("submit", async (e) => {
  console.log("submitted");
  e.preventDefault();
  purchasePrice = currentPrice.textContent;
  const d = new Date();
  const timeBought = d.getTime();
  const amountPaid = amountToInvest.value;
  const goldSold = amountPaid / purchasePrice;

  investmentSummary.textContent = `You just bought ${
    goldSold
  } ounces (ozt) for $${amountPaid}. \n You will receive
  documentation shortly.`;

  const goldReceipt = {
    timeStamp: timeBought,
    spentMoney: amountPaid,
    ouncesSold: goldSold,
    currentPrice: purchasePrice,
  };

  try {
    console.log("Post received");

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goldReceipt),
    });

    console.log("Response:", response); // 👈 Check the response too
  } catch (err) {
    console.log("Error caught:", err);
  }
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
eventSource.onerror = (err) => {};
