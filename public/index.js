const investmentForm = document.querySelector("#investment-form");
const closeButton = document.querySelector("#close-button");
const dialog = document.querySelector("dialog");
investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dialog.showModal();
  console.log("You invested!");
});

closeButton.addEventListener("click", () => {
  console.log("Test 1.");
  dialog.close();
});
