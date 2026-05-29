import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

// 1. ขยาย Interface ของ Request เพื่อให้ TypeScript รู้จัก req.user
declare global {
  namespace Express {
    interface Request {
      user?: { userId: number };
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. ตรวจสอบและ Casting ให้เป็น Type ที่เราต้องการ
    const decoded = jwt.verify(token, SECRET) as { userId: number };
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};