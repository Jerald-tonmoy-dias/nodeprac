import express from "express";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";
const app = express();

const PORT = process.env.PORT || 8000;
// Middleware (Plugins)
app.use(express.json());

// custom middleware for current user
app.use(authenticationMiddleware);

// Routes
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running" });
});
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error("❌ Server failed to start:", err);
  } else {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  }
});
