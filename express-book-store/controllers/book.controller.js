const { BOOKS } = require("../models/book");

exports.getAllBooks = function (req, res) {
  res.json(BOOKS);
};

exports.getBookById = function (req, res) {
  const bookId = parseInt(req.params.id);
  const book = BOOKS.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
};

exports.createBook = function (req, res) {
  const { title, author } = req.body;
  if (!title || title == "" || !author || author == "") {
    return res.status(400).send("Title and Author are required");
  }

  const id = BOOKS.length + 1;
  const newBook = {
    id,
    title,
    author,
  };
  BOOKS.push(newBook);
  return res.status(201).json(newBook);
};

exports.deleteBookById = function (req, res) {
  const bookId = parseInt(req.params.id);
  const bookIndex = BOOKS.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    BOOKS.splice(bookIndex, 1);
    return res.status(200).json({ message: "Book delete succesfully!" }); // why this is not showing on postman though the data is deleted
  } else {
    return res.status(404).json({
      message: "Book not found",
    });
  }
};
