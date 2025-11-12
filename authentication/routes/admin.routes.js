import express from "express";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import {
  ensureAuthenticatedMiddleware,
  restrictedToRoleMiddleware,
} from "../middlewares/auth.middleware.js";
const router = express();

const adminRestrictMiddleware = restrictedToRoleMiddleware("ADMIN");

// middleware
router.use(ensureAuthenticatedMiddleware);
router.use(adminRestrictMiddleware);

// routes
router.get("/users", async (req, res) => {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable);

  return res.status(200).json({ users });
});

export default router;
