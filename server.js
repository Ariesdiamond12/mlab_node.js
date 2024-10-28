const express = require("express");
const app = express();
const port = 3080;

// Setting up view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use("/public", express.static("public"));

// Array of card letters for matching pairs
const cardLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, 18).split("");
console.log(cardLetters);

const doubledLetters = [...cardLetters, ...cardLetters];
console.log(doubledLetters);

const shuffledCards = shuffle(doubledLetters);
console.log(shuffledCards);

// Shuffles an array and returns the shuffled array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Serve the main game page
app.get("/", (req, res) => {
  res.render("index", { title: "Card Guessing Game", shuffledCards });
});

// API endpoint to get shuffled card pairs
// app.get("/api/cards", (req, res) => {
//   const doubledLetters = [...cardLetters, ...cardLetters];
//   const shuffledCards = shuffle(doubledLetters);
//   res.json(shuffledCards);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
