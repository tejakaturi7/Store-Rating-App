import express from "express";
import Store from "../models/Store.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Add review
router.post("/:storeId/reviews", auth, async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) return res.status(404).json({ msg: "Store not found" });

    const { comment, rating } = req.body;
    store.reviews.push({ user: req.userId, comment, rating });
    await store.save();

    res.json({ msg: "Review added successfully", store });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
