const { pgTable, uuid, varchar, text, index } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");
const { sql } = require("drizzle-orm");

const booksTable = pgTable(
  "books",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    authorId: uuid("author_id")
      .notNull()
      .references(() => authorsTable.id),
  },
  (table) => ({
    searchIndexOnTitle: index('title_index').using('gin', sql`to_tsvector('english', ${table.title})`),
  })
);

module.exports = booksTable;
