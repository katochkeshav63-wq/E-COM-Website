import express from "express";
import { signupUser, loginUser } from "../controllers/authcontroller.js";

const router = express.Router();

router.post ("/signup", signupUser);

router.post("/login", loginUser)
// routes/auth.js


export default router;