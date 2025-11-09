const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = req.url;

  const log = `\n${new Date().toISOString()} - ${method} ${path}\n`;
  fs.appendFileSync("log.txt", log, "utf8");

  switch (method) {
    case "GET":
      {
        switch (path) {
          case "/":
            return res
              .writeHead(200, { "Content-Type": "text/plain" })
              .end("Hello, World!");
          case "/contact":
            return res
              .writeHead(200, { "Content-Type": "text/plain" })
              .end("Contact us at");
        }
      }
      break;

    case "POST": {
      switch (path) {
        case "/tweet":
          return res
            .writeHead(200, { "Content-Type": "text/plain" })
            .end("tweet submitted!");
      }
    }
    default:
      res.statusCode = 404;
  }

  return res
    .writeHead(404, { "Content-Type": "text/plain" })
    .end("You are lost!");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
