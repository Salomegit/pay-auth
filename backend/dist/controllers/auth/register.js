import argon2 from "argon2";
import { db } from "../../model/config.js";
// Register route
export const createUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = await db.user.create({
            data: { email, password: hashedPassword, username },
        });
        res.status(201).json({ user: newUser });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
