const express = require("express");
const { loggerMiddleware } = require("./middlewares/logger");
const bookRouter = require("./routes/book.routes");

const app = express();
const port = 8000;

// Middleware (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`);
});
