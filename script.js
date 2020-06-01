const cardDiv = document.getElementById('cards');
const time = document.getElementById('time');
const secondsEl = document.getElementById('seconds');
const minutesEl = document.getElementById('minutes');
const winWindow = document.getElementById('winWindow');
const playBtn = document.getElementById('playBtn');
const start = document.getElementById('start');

const images = [];
let cards = [];
let triedCards = [];
let pictures = [];
let seconds = 0;
let cardsGone = 0;

// Start Game
function startGame() {
  createImageArray();
  cards = shuffle(images);
  createCards();
  const timer = setInterval(startTimer, 1000);
  start.style.display = 'none';
  window.removeEventListener('click', startGame);
}


// Create array of image names
function createImageArray () {
  for(let i = 1; i < 11; i++) {
    let thisImage = `pic${i}.jpg`;
    images.push(thisImage);
    images.push(thisImage);
  }
}

// Shuffle the image array
function shuffle(array) {
  for(let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create cards and place into the DOM and add EventListener to each card
function createCards() {
  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.innerHTML = `
      <img src = './img/${card}' id = '${index + 1}'>
      <img src = './img/cardBack.png' class = 'back' id = 'back${index + 1}'>
      `;
      cardEl.addEventListener('click', flipCard, true);
    cardDiv.appendChild(cardEl);
  });
}

// Flip a card
function flipCard(e) {
  triedCards.push(e.target);
  e.target.style.opacity = 0;
  pictures.push(e.target.previousElementSibling);
  // When two cards are selected..
  if(triedCards.length === 2) {

    // Are the two cards the same
    if(pictures[0].src === pictures[1].src) {
      setTimeout(() => {
        document.getElementById(`${pictures[0].id}`).style.visibility = 'hidden';
        document.getElementById(`${pictures[1].id}`).style.visibility = 'hidden';
        cardsGone += 2;

        // Are all the cards gone?
        if(cardsGone === 20) {
          winWindow.innerHTML = `
            <h1>You Won!</h1>
            <p>In ${minutesEl.innerText}:${secondsEl.innerText}</p>
            <button id = 'playBtn' class = 'playBtn'>Play Again?</button>
          `;
          winWindow.style.display = 'flex';
          clearInterval(timer);
        }
        triedCards = [];
        pictures = [];
      }, 500);
    } else {
      // Cards not all gone
      setTimeout(replaceCards, 500);
    } 
  }
} 

// Replace 2 card backs if no match
function replaceCards() {
  document.getElementById(`${triedCards[0].id}`).style.opacity = 1;
  document.getElementById(`${triedCards[1].id}`).style.opacity = 1;
  triedCards = [];
  pictures = [];
}

// The seconds counter
function startTimer() {
  seconds++;
  secondsEl.innerHTML = pad(seconds % 60);
  minutesEl.innerHTML = pad(parseInt(seconds / 60));
}

// Pad out the seconds counter with 0's
function pad(val) {
  let valString = val + "";
  if(valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Event Listeners

// Play again button eventlistener
winWindow.addEventListener('click', (e) => {
  if(e.target.className === 'playBtn') {
    window.location.reload();
  } 
});

window.addEventListener('click', startGame);

