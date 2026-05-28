import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import { hashPassword } from "../utils/hash";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
   next: NextFunction
) => {
  try {
    const { username, email, password } =
      req.body;

    const [users]: any =
  await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email]
  );

if (users.length > 0) {

  return res.status(400).json({
    message:
      "Email already exists"
  });

}

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

  next(error);

}
};

export const login = async (
  req: Request,
  res: Response,
 next: NextFunction
) => {
  try {
    const { email, password } =
      req.body;

    const [users]: any =
      await pool.query(
        `
        SELECT * FROM users
        WHERE email = ?
        `,
        [email]
      );

    const user = users[0];

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await comparePassword(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    const token =
      generateToken(user.id);

    res.json({
      token,
    });
  } catch (error) {

  next(error);

}
};