import { createUser } from "../controllers/auth/register.js";
import express from "express";
const router = express.Router();
router.post("/register", createUser);
export default router;
