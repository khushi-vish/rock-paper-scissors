let playerText = document.querySelector(".playerText");
let computerText = document.querySelector(".computerText");
let resultText = document.querySelector(".resultText");
let scoreText = document.querySelector(".scoreText");
let choiceBtn = document.querySelectorAll(".choiceBtn");
let resetBtn = document.querySelector(".reset");
let player;
let computer;
let result;
let score = {
  win: 0,
  lose: 0,
  tie: 0,
};

let storedscore = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};
scoreText.textContent =
  `Win:${score.win} | Lose:${score.lose} | Tie:${score.tie}` || storedscore;

//--------------------------actual happening -----------------------

choiceBtn.forEach((button) => {
  button.addEventListener("click", () => {
    player = button.getAttribute("choice");
    computer = computerturn();
    playerText.textContent = `Player : ${player}`;
    computerText.textContent = `Computer : ....`;
    resultText.textContent = `Result : `;

    setTimeout(() => {
      computerText.textContent = `Computer : ${computer}`;
      resultText.textContent = `Result : ....`;
    }, 2000);

    result = checkresult();
    keepTrack(result);
    localStorage.setItem("score", JSON.stringify(score));

    setTimeout(() => {
      resultText.textContent = result;
      scoreText.textContent =
        `Win:${score.win} | Lose:${score.lose} | Tie:${score.tie}` || score;
    }, 2500);
  });
});

// -----------------------------------reset function

resetBtn.addEventListener("click", () => {
  score = {
    win: 0,
    lose: 0,
    tie: 0,
  };
  scoreText.textContent =
    `Win:${score.win} | Lose:${score.lose} | Tie:${score.tie}` || score;
  localStorage.setItem("score", JSON.stringify(score));

  location.reload();
});

//---------------------------computer function-----------------------
function computerturn() {
  let randnum = Math.floor(Math.random() * 3) + 1;
  switch (randnum) {
    case 1:
      return "Rock";
      break;

    case 2:
      return "Paper";
      break;

    case 3:
      return "Scissor";
      break;
  }
}

//----------------------check function-----------------------------------
function checkresult() {
  if (player === computer) {
    return "TIE !";
  } else if (computer === "Rock") {
    return player === "Paper" ? "You Win!" : "You Lose!";
  } else if (computer === "Paper") {
    return player === "Scissor" ? "You Win!" : "You Lose!";
  } else if (computer === "Scissor") {
    return player === "Rock" ? "You Win!" : "You Lose!";
  }
}

//-----------------keep track function ---------------------------------
function keepTrack(result) {
  if (result === "You Win!") {
    score.win++;
  } else if (result === "You Lose!") {
    score.lose++;
  } else {
    score.tie++;
  }
}

//------------------ refresh with R function----------------------------
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is 'R' or 'r'
  if (event.key === "R" || event.key === "r") {
    // Reload the page
    location.reload();
  }
});

// ------------------button disable-----------------

choiceBtn.forEach((button) => {
  button.addEventListener("click", () => {
    choiceBtn.forEach((button) => {
      button.disabled = true;
    });

    setTimeout(() => {
      choiceBtn.forEach((button) => {
        button.disabled = false;
      });
    }, 2600);
  });
});
