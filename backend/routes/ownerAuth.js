import express from "express";
import jwt from "jsonwebtoken";
import StoreOwner from "../models/StoreOwner.js"; // ✅ ensure filename is lowercase
import { registerOwner, loginOwner } from "../controllers/shopOwnerController.js";

const router = express.Router();

/**
 * Owner Signup
 * POST /api/auth/owner/signup
 */
router.post("/signup", registerOwner);

/**
 * Owner Login
 * POST /api/auth/owner/login
 */
router.post("/login", loginOwner);

/**
 * Middleware to protect routes
 */
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    const owner = await StoreOwner.findById(decoded.id);
    if (!owner) return res.status(401).json({ msg: "Owner not found" });

    req.owner = owner;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ msg: "Token invalid" });
  }
};

/**
 * GET Owner Profile (Protected)
 * GET /api/auth/owner/profile
 */
router.get("/profile", authMiddleware, async (req, res) => {
  res.json({ owner: req.owner });
});

export default router;
