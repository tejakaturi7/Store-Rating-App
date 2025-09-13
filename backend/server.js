import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";           // User auth
import ownerAuthRoutes from "./routes/ownerAuth.js"; // Shop owner auth
import storeRoutes from "./routes/store.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);             // User routes
app.use("/api/auth/owner", ownerAuthRoutes);  // Owner routes
app.use("/api/stores", storeRoutes);

// Test route
app.get("/api/test", (req, res) => res.send("Backend is running!"));

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5001, () =>
      console.log(`Server running on port ${process.env.PORT || 5001}`)
    )
  )
  .catch((err) => console.error(err));
