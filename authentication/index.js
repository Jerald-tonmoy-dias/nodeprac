import express from "express";
import userRouter from "./routes/user.routes.js";
import jwt from "jsonwebtoken";
const app = express();

const PORT = process.env.PORT || 8000;
// Middleware (Plugins)
app.use(express.json());

// custom middleware for current user
app.use(async function (req, res, next) {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) return next();
    if (!tokenHeader.startsWith("Bearer")) {
      return res.status(400).json({
        error: "authorization header must start with Bearer",
      });
    }

    const token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
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
