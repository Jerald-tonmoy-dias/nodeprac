import express from "express";
import userRouter from "./routes/user.routes.js";
import db from "./db/index.js";
import { userSessions, usersTable } from "./db/schema.js";
import { eq } from "drizzle-orm";
const app = express();

const PORT = process.env.PORT || 8000;
// Middleware (Plugins)
app.use(express.json());

// custom middleware for current user
app.use(async function (req, res, next) {
  try {
    const sessionId = req.headers["session-id"];
    if (!sessionId) return next();

    const [data] = await db
      .select({
        sessionId: userSessions.id,
        id: usersTable.id,
        userId: userSessions.userId,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(userSessions)
      .rightJoin(usersTable, eq(usersTable.id, userSessions.userId))
      .where(eq(userSessions.id, sessionId)); // fixed here

    if (data) req.user = data;

    next();
  } catch (err) {
    console.error("Session middleware error:", err);
    next();
  }
});

// Routes
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running" });
});
app.use("/user", userRouter);

app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error("❌ Server failed to start:", err);
  } else {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  }
});
