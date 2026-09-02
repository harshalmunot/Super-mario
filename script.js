let game_container = document.querySelector(".game-container");
let score = document.querySelector(".score h1");
let mario = document.querySelector(".mario");
let obstacle = document.querySelector(".obstacle");
let marioPosition = 0;

function jump() {
  let startPosition = 0;
  let endPosition = 300;

  let jumpInterval = setInterval(() => {
    if (startPosition <= endPosition) {
      startPosition += 10;

      mario.style.bottom = startPosition + "px";
    } else {
      clearInterval(jumpInterval);
      fall();
    }
  }, 20);
}
function fall() {
  let startPosition = 300;
  let endPosition = 0;
  let fallInterval = setInterval(() => {
    if (startPosition >= 0) {
      startPosition -= 10;

      mario.style.bottom = startPosition + "px";
    } else {
      clearInterval(jumpInterval);
      fall();
    }
  }, 20);
}

function moveMario(direction) {
  let activePos;
  if (direction === "left") {
    activePos = marioPosition - 10;
    mario.classList.add("flipped");
  } else {
    mario.classList.remove("flipped");
    activePos = marioPosition + 10;
  }
  if (
    activePos >= 0 &&
    activePos <= game_container.offsetWidth - mario.offsetWidth
  ) {
    marioPosition = activePos;
    mario.style.left = marioPosition + "px";
  }
}
//move mario left/right
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case " ":
      jump();
      break;

    //left
    case "ArrowLeft":
    case "a":
    case "A":
      moveMario("left");

    //right
    case "ArrowRight":
    case "d":
    case "D":
      moveMario("right");
      break;
  }
});
