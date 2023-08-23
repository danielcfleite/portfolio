const startButton = document.querySelector("#start");
const pg2 = document.querySelector(".pg2");
const pg1 = document.querySelector(".pg2");
const header = document.querySelector(".header");

startButton.addEventListener("click", () => {
  pg2.style.top = "0";
  header.classList.remove("hidden");
  console.log(pg2);
});
