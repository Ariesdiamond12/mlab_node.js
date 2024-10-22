const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Charles Scribner's Sons",
    year: 1925,
    isbn: "978-0743273565",
  },

  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publisher: "Meghan.M",
    year: 1960,
    isbn: "978-0061120084",
  },

  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    publisher: "George  Orwell",
    year: 1949,
    isbn: "978-0451524935",
  },
  {
    id: 4,
    title: "CHANEL",
    author: "Daniele Bott",
    publisher: "Thames  & Hudson",
    year: 2019,
    isbn: "978-0500519904",
  },
  {
    id: 5,
    title: "It Ends With Us",
    author: "Colleen Hoover",
    publisher: "Atria Books",
    year: 2016,
    isbn: "978-1501161930",
  },
];

// GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET a single book by ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

// POST a new book
app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update an existing book
app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// DELETE a book
app.delete("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Book not found");

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
