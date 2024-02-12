'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const scoreEl = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];
const currentScoreEl = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];
const playerEl = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

let currentScore, scores, activePlayer;

const switchPlayer = () => {
  playerEl[0].classList.toggle('player--active');
  playerEl[1].classList.toggle('player--active');
};

const displayWinner = () => {
  playerEl[activePlayer].classList.add('player--winner');
  diceEl.classList.add('hidden');
  btnRoll.disabled = true;
  btnHold.disabled = true;
};

const initGame = () => {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  scoreEl[0].textContent = 0;
  scoreEl[1].textContent = 0;
  currentScoreEl[0].textContent = 0;
  currentScoreEl[1].textContent = 0;
  playerEl[0].classList.remove('player--winner');
  playerEl[1].classList.remove('player--winner');
  playerEl[0].classList.add('player--active');
  playerEl[1].classList.remove('player--active');
  diceEl.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

btnRoll.addEventListener('click', () => {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    diceEl.classList.remove('hidden');
    currentScore += dice;
    currentScoreEl[activePlayer].textContent = currentScore;
  } else {
    currentScore = 0;
    currentScoreEl[activePlayer].textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  scoreEl[activePlayer].textContent = scores[activePlayer];
  currentScore = 0;
  currentScoreEl[activePlayer].textContent = 0;

  if (scores[activePlayer] >= 100) {
    displayWinner();
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    switchPlayer();
  }
});

btnNew.addEventListener('click', initGame);

initGame(); // Memulai permainan saat memuat halaman
