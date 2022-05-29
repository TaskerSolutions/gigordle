// listen for keyboard presses
document.addEventListener("keyup", (e) => {

  if (guessesRemaining === 0) return;

  let pressedKey = String(e.key)
  if (pressedKey === "Backspace" && nextLetter !== 0) {
      deleteLetter();
      return;
  }

  if (pressedKey === "Enter") {
      checkGuess();
      return;
  }

  let found = pressedKey.match(/[a-z]/gi)
  if (!found || found.length > 1) {
      return;
  } else {
      insertLetter(pressedKey);
  }
});

// listen for on screen keyboard presses
document.getElementById("keyboard-cont").addEventListener("click", (e) => {

  const target = e.target;
  
  if (!target.classList.contains("keyboard-button")) return;

  let key = target.textContent;

  if (key === "Del") key = "Backspace"; 

  document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}));

});


document.getElementById('reload-button').addEventListener('click', populateBoard);