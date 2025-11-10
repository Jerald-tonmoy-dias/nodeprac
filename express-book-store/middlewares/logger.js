const fs = require("node:fs");

exports.loggerMiddleware = function (req, res, next) {
  const log = `\n[${Date.now().toString()}] ${req.method} ${req.path}`;
  fs.appendFileSync("logs.txt", log, "utf-8");
  console.log("hello");
  next();
};
