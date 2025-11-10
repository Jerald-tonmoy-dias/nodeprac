require("dotenv/config");
const express = require("express");
const { loggerMiddleware } = require("./middlewares/logger");
const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");

const app = express();
const port = 8000;

// Middleware (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`);
});
