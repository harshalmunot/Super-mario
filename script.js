let game_container = document.querySelector(".game-container");
let score = document.querySelector(".score h1");
let mario = document.querySelector(".mario");
let obstacle = document.querySelector(".obstacle");

let marioPosition = 0;
let isJumping = false;

// JUMP FUNCTION
function jump() {
  if (isJumping) return;

  isJumping = true;

  let startPosition = 0;
  let endPosition = 300;

  let jumpInterval = setInterval(() => {
    if (startPosition < endPosition) {
      startPosition += 10;
      mario.style.bottom = startPosition + "px";
    } else {
      clearInterval(jumpInterval);
      fall();
    }
  }, 20);
}

// FALL FUNCTION
function fall() {
  let startPosition = 300;
  let endPosition = 0;

  let fallInterval = setInterval(() => {
    if (startPosition > endPosition) {
      startPosition -= 10;
      mario.style.bottom = startPosition + "px";
    } else {
      clearInterval(fallInterval);
      mario.style.bottom = "0px";
      isJumping = false;
    }
  }, 20);
}

// MOVE MARIO FUNCTION
function moveMario(direction) {
  let activePos;

  if (direction === "left") {
    activePos = marioPosition - 10;
    mario.classList.add("flipped");
  } else {
    activePos = marioPosition + 10;
    mario.classList.remove("flipped");
  }

  if (
    activePos >= 0 &&
    activePos <= game_container.offsetWidth - mario.offsetWidth
  ) {
    marioPosition = activePos;
    mario.style.left = marioPosition + "px";
  }
}

// MOVE OBSTACLE FUNCTION
function moveObstacle() {
  let obstaclePosition = game_container.offsetWidth + 50;

  obstacle.style.display = "block";
  obstacle.style.left = obstaclePosition + "px";

  let obstacleInterval = setInterval(() => {
    obstaclePosition -= 10;

    obstacle.style.left = obstaclePosition + "px";

    if (obstaclePosition < -obstacle.offsetWidth) {
      clearInterval(obstacleInterval);
      moveObstacle();
    }
  }, 250);
}

// KEYBOARD CONTROLS
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case " ":
      e.preventDefault();
      jump();
      break;

    case "ArrowLeft":
    case "a":
    case "A":
      moveMario("left");
      break;

    case "ArrowRight":
    case "d":
    case "D":
      moveMario("right");
      break;
  }
});

// START OBSTACLE
setTimeout(() => {
  moveObstacle();
}, 1000);
