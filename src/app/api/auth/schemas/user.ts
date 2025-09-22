import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
