let totalWords = 16; // set number of words to guess.
let totalGuesses = 21; // set number of guesses.
let totalLetters = 5; // set number of letters per word.

let guessesRemaining = totalGuesses;
let currentGuess = [];
let nextLetter = 0;
let answers = [];

let groups = document.querySelectorAll('.word-group');

for (i = 0; i < totalWords; i++) {
  answers[i] = WORDS[Math.floor(Math.random() * WORDS.length)];
}

console.log(answers);

const board = document.querySelector('.game-board');
populateBoard();



function insertLetter (pressedKey) {
  if (nextLetter === totalLetters) return;
  pressedKey = pressedKey.toLowerCase();

  for (n = 0; n < answers.length; n ++) {
    let row = groups[n].getElementsByClassName("word")[totalGuesses - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
  }
  currentGuess.push(pressedKey);
  nextLetter += 1;
}


function deleteLetter () {
  for (n = 0; n < answers.length; n ++) {
    let row = groups[n].getElementsByClassName("word")[totalGuesses - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
  }
  currentGuess.pop();
  nextLetter -= 1;
}


function checkGuess () {
  for (n = 0; n < answers.length; n ++) {

    let row = groups[n].getElementsByClassName("word")[totalGuesses - guessesRemaining];
    let guessString = '';
    let rightGuess = Array.from(answers[n]);

    for (const val of currentGuess) guessString += val;
    console.log(guessString)    

    if (guessString.length != totalLetters) {
      toastr.error("Not enough letters!");
      return;
    }

    if (!WORDS.includes(guessString)) {
      toastr.error("Word not in list!");
      return;
    }

    for (let i = 0; i < totalLetters; i++) {
      let letterColor = '';
      let box = row.children[i];
      let letter = currentGuess[i];
      
      let letterPosition = rightGuess.indexOf(currentGuess[i]);
      if (letterPosition === -1) {
        letterColor = 'grey';
      } else {
        if (currentGuess[i] === rightGuess[i]) {
          letterColor = 'green';
        } else {
          letterColor = 'orange';
        }

        rightGuess[letterPosition] = "#";
      }

      let delay = 150 * i;
      setTimeout(()=> {
        box.style.backgroundColor = letterColor;
        shadeKeyBoard(letter, letterColor);
      }, delay);
    }

    if (guessString === answers[n]) {
      toastr.success("You guessed right! Game over!");
      guessesRemaining = 0;
      return;
    } else {
      guessesRemaining -= 1;
      currentGuess = [];
      nextLetter = 0;

      if (guessesRemaining === 0) {
        toastr.error("You've run out of guesses! Game over!");
        toastr.info(`The right word was: "${answers}"`);
      }
    }
  }
}


function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {

      let oldColor = elem.style.backgroundColor

      if (oldColor === 'green') return; 

      if (oldColor === 'yellow' && color !== 'green') return;

      elem.style.backgroundColor = color;
      break;
    }
  }
}