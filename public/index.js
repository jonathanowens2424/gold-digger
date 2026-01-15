const investmentForm = document.querySelector("#investment-form");
const dialog = document.querySelector("dialog");
investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dialog.show();
  console.log("You invested!");
});
