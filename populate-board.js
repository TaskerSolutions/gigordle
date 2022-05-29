function populateBoard() {
  // set values based on user input
  totalWords = document.getElementById('words-select').value;
  totalGuesses = document.getElementById('guesses-select').value;
  guessesRemaining = totalGuesses;
  nextLetter = 0;

  // delete old game board
  board.innerHTML = '';

  // create new game board
  for (i = 0; i < totalWords; i++) {
    const newGroup = document.createElement('div');
    newGroup.classList.add('word-group', 'col-lg-3');
    board.appendChild(newGroup);
  }

  groups = document.querySelectorAll('.word-group');
  groups.forEach(group => populateGroup(group));

  const words = document.querySelectorAll('.word');
  words.forEach(word => populateWord(word));

  function populateGroup(group) {
    for (i = 0; i < totalGuesses; i++) {
      const word = document.createElement('div');
      word.classList.add('word');
      group.appendChild(word);
    }
  }

  function populateWord(word) {
    for (i = 0; i < totalLetters; i++) {
      const letter = document.createElement('div');
      letter.classList.add('letter');
      word.appendChild(letter);
    }
  }

  generateAnswers();
  defineCurrentRows();
}