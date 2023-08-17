const startButton = document.querySelector("#start");
const pg2 = document.querySelector(".pg2");

startButton.addEventListener("click", () => {
  pg2.style.animation = "page 2s 2s forwards";
  console.log(pg2);
});
