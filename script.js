'use strict';



const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const scoreCurrent0 = document.querySelector("#current--0");
const scoreCurrent1 = document.querySelector("#current--1");



let scores, scoreCurrent, activePlayer, playing;

const init = function () {
    scoreCurrent = 0
    activePlayer = 0
    playing = true;
    scores = [0,0]

    score0El.textContent = 0;
    score1El.textContent = 0;
    scoreCurrent0.textContent = 0;
    scoreCurrent1.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    scoreCurrent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function(){
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `dice/dice-${dice}.png`    
        if(dice != 1) {
            scoreCurrent += dice;
            document.getElementById(`current--${activePlayer}`).textContent = scoreCurrent;
    
        }else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener("click", function(){
    if (playing) {
        scores[activePlayer] += scoreCurrent;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            alert("Score: " + scores[activePlayer])

        }else {
            switchPlayer();
        }   
    }
});
btnNew.addEventListener("click", function(){
    init()
})

