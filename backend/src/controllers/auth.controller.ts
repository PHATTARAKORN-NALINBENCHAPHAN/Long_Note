import { Request, Response } from "express";
import pool from "../config/db";
import { hashPassword } from "../utils/hash";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, email, password } =
      req.body;

    const hashedPassword =
      await hashPassword(password);

    await pool.query(
      `
      INSERT INTO users
      (username,email,password)
      VALUES (?,?,?)
      `,
      [
        username,
        email,
        hashedPassword,
      ]
    );

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Register failed",
    });
  }
};