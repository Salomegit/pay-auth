import express from "express";
import { Request, Response } from 'express';
import argon2 from "argon2";
import  prisma  from "../../model/config.js";  

// Register route
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ error: "User already exists" });
            return;
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, username },
        });

        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


