import express from "express";
import Store from "../models/Store.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create new store
router.post("/", async (req, res) => {
  try {
    const { name, location, owner } = req.body;
    if (!name || !location || !owner) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const store = new Store({ name, location, owner });
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all stores
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find().populate("owner", "name email");
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add review to store
router.post("/:id/reviews", authMiddleware, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    if (!comment || !rating) {
      return res.status(400).json({ message: "Comment and rating are required" });
    }

    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    store.reviews.push({ user: req.user._id, comment, rating });
    await store.save();
    await store.populate("reviews.user", "username email");

    res.status(201).json({ message: "Review added", reviews: store.reviews });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
