require("dotenv/config");
const { drizzle } = require('drizzle-orm/node-postgres');
const db = drizzle(process.env.DATABASE_URL);
console.log('from config',process.env.DATABASE_URL);
module.exports = db;
