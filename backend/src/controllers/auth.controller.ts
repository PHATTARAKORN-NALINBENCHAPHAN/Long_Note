import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { RowDataPacket } from "mysql2"; // เพิ่มตัวนี้มาเพื่อทำ Type ให้ดียิ่งขึ้น

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    // 1. เช็คว่ามีอีเมลนี้หรือยัง
    const [users] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?", 
      [email]
    );

    if (users.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. แฮชรหัสผ่าน
    const hashedPassword = await hashPassword(password);

    // 3. บันทึกข้อมูล
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1. ดึง user จาก DB
    const [users] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?", 
      [email]
    );

    const user = users[0];

    // 2. เช็คตัวตน
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. สร้าง Token (แก้จาก user.id เป็น { userId: user.id })
    const token = generateToken({ userId: user.id });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    next(error);
  }
};