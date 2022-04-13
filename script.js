const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let currentScore, activePlayer, scores, playing;

const restart = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceImg.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
};
restart();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling the dice
rollDice.addEventListener("click", function () {
  if (playing) {
    // 1.generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // display the diceroll according to the dice no.
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;
    // check for rolled 1: true switchPlayer
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// hold button
holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //  add the current score to the total score of the active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // if totalscore is >=50
    if (scores[activePlayer] >= 50) {
      diceImg.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// reset the game
newGame.addEventListener("click", restart);
