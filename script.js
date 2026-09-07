let game_container = document.querySelector(".game-container");
let scoreElement = document.querySelector(".score h1");
let finalScore = document.querySelector(".final-score");

let mario = document.querySelector(".mario");
let obstacle = document.querySelector(".obstacle");

let gameOverScreen = document.querySelector(".game-over");

let marioPosition = 0;

let isJumping = false;
let gameOver = false;

let score = 0;

let obstaclePosition;

let obstacleInterval;

// JUMP FUNCTION

function jump() {
  if (isJumping || gameOver) return;

  isJumping = true;

  let startPosition = 0;
  let endPosition = 300;

  let jumpInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(jumpInterval);
      return;
    }

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
    if (gameOver) {
      clearInterval(fallInterval);
      return;
    }

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

// MOVE MARIO

function moveMario(direction) {
  if (gameOver) return;

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

// CHECK COLLISION

function checkCollision() {
  let marioRect = mario.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();

  if (
    marioRect.left < obstacleRect.right - 10 &&
    marioRect.right > obstacleRect.left + 10 &&
    marioRect.top < obstacleRect.bottom &&
    marioRect.bottom > obstacleRect.top
  ) {
    endGame();
  }
}

// MOVE OBSTACLE

function moveObstacle() {
  obstaclePosition = game_container.offsetWidth;

  obstacle.style.left = obstaclePosition + "px";

  obstacleInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(obstacleInterval);
      return;
    }

    obstaclePosition -= 10;

    obstacle.style.left = obstaclePosition + "px";

    // collision check

    checkCollision();

    // pipe crossed mario

    if (obstaclePosition + obstacle.offsetWidth < marioPosition) {
      score++;

      scoreElement.innerText = "Score : " + score;

      clearInterval(obstacleInterval);

      moveObstacle();
    }

    // pipe went outside screen

    if (obstaclePosition < -obstacle.offsetWidth) {
      clearInterval(obstacleInterval);

      moveObstacle();
    }
  }, 20);
}

// GAME OVER

function endGame() {
  if (gameOver) return;

  gameOver = true;

  clearInterval(obstacleInterval);

  finalScore.innerText = "Score : " + score;

  gameOverScreen.style.display = "block";
}

// RESTART GAME

function restartGame() {
  gameOver = false;

  isJumping = false;

  score = 0;

  marioPosition = 0;

  // reset score

  scoreElement.innerText = "Score : 0";

  // reset mario

  mario.style.left = "0px";
  mario.style.bottom = "0px";

  // hide game over

  gameOverScreen.style.display = "none";

  // reset obstacle

  clearInterval(obstacleInterval);

  obstaclePosition = game_container.offsetWidth;

  obstacle.style.left = obstaclePosition + "px";

  moveObstacle();
}

// KEYBOARD CONTROLS

window.addEventListener("keydown", function (e) {
  if (gameOver) {
    if (e.key === "r" || e.key === "R") {
      restartGame();
    }

    return;
  }

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

// START GAME

setTimeout(() => {
  moveObstacle();
}, 1000);
