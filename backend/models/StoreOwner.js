import mongoose from "mongoose";

const StoreOwnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 60 },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true, maxlength: 400 },
    password: { type: String, required: true },
    role: { type: String, enum: ["storeowner"], default: "storeowner" },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError by reusing existing model
export default mongoose.models.StoreOwner ||
  mongoose.model("StoreOwner", StoreOwnerSchema);
