const authorsTable = require("../models/author.model");
const booksTable = require("../models/book.model");
const db = require("../db");

const { eq, sql } = require("drizzle-orm");

exports.getAllAuthors = async function (req, res) {
  const authors = await db.select().from(authorsTable);
  res.json(authors);
};

exports.getAuthorById = async function (req, res) {
  id = req.params.id;

  const [author] = await db
    .select()
    .from(authorsTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!author) {
    return res.status(404).send(`Author with id ${id} does not exiest!`);
  }
  return res.json(author);
};

exports.createAuthor = async function (req, res) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || firstName == "") {
    return res.status(400).send("firstName is required");
  }
  if (!email || email == "") {
    return res.status(400).send("email is required");
  }

  const [result] = await db
    .insert(authorsTable)
    .values({
      firstName,
      lastName,
      email,
    })
    .returning({ id: authorsTable.id });

  return res.status(201).json({
    message: "Author created successfully!",
    id: result.id,
  });
};

exports.getBooksAuthorById = async function (req, res) {
  id = req.params.id;

  const books = await db
    .select()
    .from(booksTable)
    .where( eq(booksTable.authorId, id));

  // if (!author) {
  //   return res.status(404).send(`Author with id ${id} does not exiest!`);
  // }
  return res.json(books);
};

// exports.deleteAuthorById = async function (req, res) {
//   id = req.params.id;

//   await db.delete(authorsTable).where(eq(authorsTable.id, id));

//   return res.status(200).json({
//     message: "Author deleted successfully!",
//   });
// };
