import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controller/authController.js";
import { protect } from "../middleware/auth.js";

const authRouting = Router();

authRouting.post("/signup", registerUser);
authRouting.post("/login", loginUser);
authRouting.get("/logout", protect, logoutUser);

export default authRouting;