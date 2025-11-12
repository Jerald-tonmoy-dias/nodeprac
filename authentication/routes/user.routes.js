import express from "express";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
const router = express();

// update user
router.patch("/", async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "You are not logged in!" });
  }
  const { name } = req.body;
  await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id));

  return res.status(200).json({ status: "success", user });
});
// returns current logged in user
router.get("/", async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "You are not logged in!" });
  }
  return res.status(200).json({ user });
});

// sign up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const [exiestingUser] = await db
    .select()
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (exiestingUser) {
    return res.status(400).json({
      error: `user with email ${email} already exiests!`,
    });
  }

  const salt = randomBytes(256).toString("hex");
  const hasedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hasedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({
    status: "success",
    data: { userId: user.id },
  });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [exiestingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!exiestingUser) {
    return res.status(404).json({
      error: `user with email ${email} doest not exiests!`,
    });
  }

  const salt = exiestingUser.salt;
  const exiestingHash = exiestingUser.password;

  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== exiestingHash) {
    return res.status(400).json({
      error: `Incorrect password!`,
    });
  }

  const payload = {
    id: exiestingUser.id,
    email: exiestingUser.email,
    name: exiestingUser.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.json({ status: "success", token });
});

export default router;
