require("dotenv/config");
const { drizzle } = require('drizzle-orm/node-postgres');

console.log('check db url::->>',process.env.DATABASE_URL );
// postgres://<username>:<password>@<host>:<port>/<db_name>
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
