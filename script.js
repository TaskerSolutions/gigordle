let totalWords = 16; // set number of words to guess.
let totalGuesses = 21; // set number of guesses.
let totalLetters = 5; // set number of letters per word.
let guessesRemaining = totalGuesses;
let currentGuess = [];
let nextLetter = 0;
let answers = [];
let groups = document.querySelectorAll('.word-group');
let rightGuess = [];
let currentRows = [];
let guessedAnswers = [];
let guessString = '';
const board = document.querySelector('.game-board');

populateBoard();


// generate answers
function generateAnswers() {
  answers = [];
  for (i = 0; i < totalWords; i++) {
    // create array of answers
    answers[i] = WORDS[Math.floor(Math.random() * WORDS.length)];
    // create letter array of each answer
    rightGuess[i] = Array.from(answers[i]);
  }
  console.log(answers)
}


// define current rows of words
function defineCurrentRows() {
  for (n = 0; n < totalWords; n++) {
    currentRows[n] = groups[n].getElementsByClassName("word")[totalGuesses - guessesRemaining];
  }   
  //console.log(currentRows)
}


// insert letter on keypress
function insertLetter (pressedKey) {
  if (nextLetter === totalLetters) return;
  pressedKey = pressedKey.toLowerCase();

  for (n = 0; n < answers.length; n ++) {
    // run only if answer is not already guessed
    if (guessedAnswers[n] != answers[n]) {
      let box = currentRows[n].children[nextLetter];
      box.textContent = pressedKey;
      box.classList.add("filled-box");
    }
  }
  currentGuess.push(pressedKey);
  nextLetter += 1;
}


// delete letter on keypress
function deleteLetter () {
  for (n = 0; n < answers.length; n ++) {
    let box = currentRows[n].children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
  }
  currentGuess.pop();
  nextLetter -= 1;
}


// check guess when submitted
function checkGuess () {
  // create new guessstring
  guessString = '';
  for (const val of currentGuess) guessString += val;
  //console.log(guessString)

  // check that current guess matches set word length
  if (guessString.length != totalLetters) {
    toastr.error("Not enough letters!");
    return;
  }

  // check that current guess matches word list
  if (!WORDS.includes(guessString)) {
    toastr.error("Word not in list!");
    return;
  }

  // shade letters in rows 
  shadeLettersInCurrentRows(); 
 
  // check if guesses are correct
  areGuessesCorrect();
}


// shade the on screen keyboard for correct letters, wrong place letters & incorrect letters
function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === 'green') return; 
      if (oldColor === 'yellow' && color !== 'green') return;
      elem.style.backgroundColor = color;
      break;
    }
  }
}

// clear the shading on the on screen keyboard
function clearKeyboardShading() {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    elem.style.backgroundColor = '';
  }
}


// Shade the letters in the current row for correct letters, wrong place letters & incorrect letters
function shadeLettersInCurrentRows() {
  //console.log(currentGuess)

  // loop for total number of answers
  for (n = 0; n < answers.length; n ++) {
    // run only if answer is not already guessed
    if (guessedAnswers[n] != answers[n]) {
      // loop for total number of letters per answer
      for (let i = 0; i < totalLetters; i++) {
        let letterColor = '';
        let box = currentRows[n].children[i];
        let letter = currentGuess[i];
        let letterPosition = rightGuess[n].indexOf(letter);

      // define colors to shade
        if (letterPosition === -1) {
          letterColor = 'grey';
        } else {
          if (currentGuess[i] === rightGuess[n][i]) {
            letterColor = 'green';
          } else {
            letterColor = 'orange';
          }
          //rightGuess[n][letterPosition] = "#";
        }

        // begin shading with delay between each letter
        let delay = 150 * i;
        setTimeout(()=> {
          box.style.backgroundColor = letterColor;
          shadeKeyBoard(letter, letterColor);
        }, delay);
      }
    }
  }
}

function areGuessesCorrect() {
  for (n = 0; n < answers.length; n ++) {
    if (guessString === answers[n]) {
      guessedAnswers[n] = answers[n];
  
      // shade group to mark completed
      groups[n].style.backgroundColor = 'rgb(42 161 42 / 15%)';
    }
  }
  //console.log(guessedAnswers)

  if (guessedAnswers.length == totalWords) {
    toastr.success("You guessed all the words right! Well done!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    
    // redefine rows for next guess
    defineCurrentRows();

    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      toastr.error("You've run out of guesses! Game over!");
      toastr.info(`The right words were: "${answers}"`);
    }
  }
}