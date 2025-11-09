const http = require("node:http");

const server = http.createServer((req, res) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/plain');
  //   res.end('Hello, World!\n');

  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Welcome to the Home Page!\n");
      break;
    case "/about":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("This is the About Page.\n");
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("404 Not Found\n");
      break;
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
