// Read from the .env file
require('dotenv').config();
const apiKey = process.env.api;

document.querySelectorAll(".expand-icon").forEach((button) => {
  button.addEventListener("click", () => {
    const stockCard = button.closest(".expandable-stock");
    stockCard.classList.toggle("open");
  });
});