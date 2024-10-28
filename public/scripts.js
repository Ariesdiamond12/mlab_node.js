"use strict";

const tilesContainer = document.querySelector(".tiles");
let lettersPickList = [];
let tileCount = 36;

// Game State
let firstCard = null;
let awaitingEndOfMove = false;

// Fetch card letters from the server
// fetch("/api/cards")
//   .then((response) => response.json())
//   .then((cards) => {
//     lettersPickList = cards;
//     buildCards();
//   })
//   .catch((error) => console.error("Error fetching cards:", error));

// Create each card element with a click event
function buildCard(letter) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-letter", letter);

  element.addEventListener("click", flipCard);

  return element;
}

// Build up the card grid
function buildCards() {
  lettersPickList.forEach((letter) => {
    const tile = buildCard(letter);
    tilesContainer.appendChild(tile);
  });
}

// Flip card functionality
function flipCard() {
  if (awaitingEndOfMove || this === firstCard) return;

  this.classList.add("flipped");
  this.style.backgroundColor = "#bf0603";

  if (!firstCard) {
    firstCard = this;
    return;
  }

  awaitingEndOfMove = true;

  if (
    firstCard.getAttribute("data-letter") === this.getAttribute("data-letter")
  ) {
    // It's a match!
    setTimeout(() => {
      firstCard.classList.add("matched");
      this.classList.add("matched");
      resetCards();
    }, 500);
  } else {
    // Not a match
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      this.classList.remove("flipped");
      firstCard.style.backgroundColor = "";
      this.style.backgroundColor = "";
      resetCards();
    }, 1000);
  }
}

// Reset cards
function resetCards() {
  awaitingEndOfMove = false;
  firstCard = null;
}
