const startButton = document.querySelector("#start");
const pg2 = document.querySelector(".pg2");
const pg1 = document.querySelector(".pg2");
const header = document.querySelector(".header");
const images = document.querySelectorAll(".image");
const bg = document.querySelectorAll(".bg");
const music = new Audio("./assets/music.mp3");
const musicbtn = document.querySelector(".fa-music");
const navDesk = document.querySelector(".nav-desk");
let first = true;
let playing = false;
let isInProject = false;

console.log(images);

startButton.addEventListener("click", () => {
  pg2.style.top = "0";
  header.classList.remove("hidden");
  console.log(pg2);
});

const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  musicbtn.classList.remove("hidden");
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

function showBackground(id) {
  bg[id].style.opacity = "1";
  track.style.opacity = "0";
  navDesk.style.opacity = "0";
  setTimeout(() => {
    track.style.display = "none";
  }, 700);

  isInProject = true;
}

for (let i = 0; i < images.length; i++) {
  const image = images[i]; //template string
  const id = i;
  image.onclick = function () {
    showBackground(id);
  };
}

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

musicbtn.addEventListener("click", playMusic);

function playMusic() {
  if (first === true) {
    music.play();
    music.currentTime = 10;
    first = false;
    playing = true;
  } else if (playing === true) {
    music.pause();
    playing = false;
  } else {
    music.play();
    playing = true;
  }
}
