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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.error("❌ Server failed to start:", err);
  } else {
    console.log(`✅ Server running on http://localhost:${port}`);
  }
});
