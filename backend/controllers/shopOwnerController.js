import StoreOwner from "../models/StoreOwner.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register owner
export const registerOwner = async (req, res) => {
  const { name, email, address, password } = req.body;

  if (!name || !email || !address || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const existingOwner = await StoreOwner.findOne({ email });
    if (existingOwner) return res.status(400).json({ msg: "Owner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = new StoreOwner({ name, email, address, password: hashedPassword });
    await owner.save();

    res.status(201).json({ msg: "Owner registered successfully", owner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login owner
export const loginOwner = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required" });

  try {
    const owner = await StoreOwner.findOne({ email });
    if (!owner) return res.status(400).json({ msg: "Owner not found" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: owner._id, role: owner.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({ token, owner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
