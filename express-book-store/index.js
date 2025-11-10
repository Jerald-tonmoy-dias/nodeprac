const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 8000;

// In-memory array to store books
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
];

// Middleware (Plugins)
app.use(express.json());

app.use(function (req, res, next) {
  const log = `\n[${Date.now().toString()}] ${req.method} ${req.path}`;
  fs.appendFileSync("logs.txt", log, "utf-8");
  console.log("hello");
  next();
});

// Routes
app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || title == "" || !author || author == "") {
    return res.status(400).send("Title and Author are required");
  }

  const id = books.length + 1;
  const newBook = {
    id,
    title,
    author,
  };
  books.push(newBook);
  return res.status(201).json(newBook);
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return res.status(200).json({ message: "Book delete succesfully!" }); // why this is not showing on postman though the data is deleted
  } else {
    return res.status(404).json({
      message: "Book not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`);
});
