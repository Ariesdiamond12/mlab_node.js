"use strict";

const tilesContainer = document.querySelector(".tiles");
let lettersPickList = [];
let tileCount = 36;

// Game State
let firstCard = null;
let awaitingEndOfMove = false;

// Select all tiles
const tiles = document.querySelectorAll(".tile");

// Add event listener to each tile
tiles.forEach(tile => {
  tile.addEventListener("click", flipCard);
});

function flipCard() {
  const currentCard = this; // 'this' refers to the clicked card

  // Prevent flipping if awaiting end of move or if the same card is clicked
  if (awaitingEndOfMove || currentCard === firstCard) return;

  currentCard.classList.add("flipped");
  currentCard.style.backgroundColor = "#967aa1";

  if (!firstCard) {
    firstCard = currentCard; // Set the first card
    return;
  }

  awaitingEndOfMove = true;

  // Check for a match
  if (
    firstCard.getAttribute("data-letter") ===
    currentCard.getAttribute("data-letter")
  ) {
    // It's a match!
    setTimeout(() => {
      firstCard.classList.add("matched");
      currentCard.classList.add("matched");
      resetCards();
      checkWinCondition();
    }, 500);
  } else {
    // Not a match
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      currentCard.classList.remove("flipped");
      firstCard.style.backgroundColor = "";
      currentCard.style.backgroundColor = "";
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  awaitingEndOfMove = false;
}

//check whether the game has been won after each successful match
function checkWinCondition() {
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === tileCount) {
    document.getElementById("message-area").textContent = "Congratulations! You've won!";
  }
}

// Select the reset button
const resetButton = document.getElementById("reset-button");

// Add click event listener to reload the page
resetButton.addEventListener("click", () => {
  window.location.reload(); // Reloads the page
});

