import { Request, Response, NextFunction } from "express";
import pool from "../config/db";

// ==========================================
// CREATE: Owner only (คงเดิม ล็อกสิทธิ์ด้วย user.userId)
// ==========================================
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, category } = req.body;
    const user = (req as any).user; // ต้องผ่าน Auth Middleware มาก่อน

    await pool.query(
      `
      INSERT INTO notes (title, content, category, user_id)
      VALUES (?, ?, ?, ?)
      `,
      [title, content, category, user.userId]
    );

    res.status(201).json({ message: "Note created" });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// READ ALL (Home): ทุกคนเห็นทุก note (เอา WHERE user_id ออก)
// ==========================================
export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // ดึงโน้ตทั้งหมดของทุกคน
    const [notes] = await pool.query(
      `
      SELECT * FROM notes
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    // นับจำนวนโน้ตทั้งหมดในระบบ
    const [totalResult]: any = await pool.query(`SELECT COUNT(*) as total FROM notes`);
    const total = totalResult[0].total;

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: notes
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE: Owner only (เช็คสิทธิ์ว่าเป็นเจ้าของไหมก่อนอัปเดต)
// ==========================================
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const user = (req as any).user;

    // 1. ค้นหาโน้ตด้วย id อย่างเดียว เพื่อเช็คว่ามีโน้ตนี้อยู่จริงไหม
    const [notes]: any = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
    const note = notes[0];

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 2. ตรวจสอบว่าผู้ใช้งานปัจจุบัน เป็นเจ้าของโน้ตตัวนี้จริงหรือไม่
    if (note.user_id !== user.userId) {
      return res.status(403).json({ message: "Forbidden: You are not the owner of this note" });
    }

    // 3. ถ้าผ่านเงื่อนไข ให้ทำการอัปเดต
    await pool.query(
      `
      UPDATE notes
      SET title = ?, content = ?, category = ?
      WHERE id = ?
      `,
      [title, content, category, id]
    );

    res.json({ message: "Note updated" });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE: Owner only (เช็คสิทธิ์ว่าเป็นเจ้าของไหมก่อนลบ)
// ==========================================
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // 1. ค้นหาโน้ตตัวนั้นก่อน
    const [notes]: any = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
    const note = notes[0];

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 2. ตรวจสอบสิทธิ์ความเป็นเจ้าของ
    if (note.user_id !== user.userId) {
      return res.status(403).json({ message: "Forbidden: You are not the owner of this note" });
    }

    // 3. ทำการลบ
    await pool.query(`DELETE FROM notes WHERE id = ?`, [id]);

    res.json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SEARCH: ค้นหาในทุก note (เอา WHERE user_id ออก)
// ==========================================
export const searchNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    const keyword = `%${q}%`;

    // ค้นหาจากโน้ตทั้งหมดที่มีในระบบ
    const [notes] = await pool.query(
      `
      SELECT * FROM notes
      WHERE title LIKE ? OR content LIKE ? OR category LIKE ?
      ORDER BY created_at DESC
      `,
      [keyword, keyword, keyword]
    );

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET BY CATEGORY: ดูตามหมวดหมู่ของทุก note (เอา WHERE user_id ออก)
// ==========================================
export const getNotesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;

    // ค้นหาด้วย category โดยไม่สนว่าเป็นของ user คนไหน
    const [notes] = await pool.query(
      `
      SELECT * FROM notes
      WHERE category = ?
      ORDER BY created_at DESC
      `,
      [category]
    );

    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Get category notes failed" });
  }
};

// ==========================================
// READ SINGLE: เปิดได้ทุก note (แก้จากเช็ค user_id เป็นเช็คแค่ id)
// ==========================================
export const getSingleNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // ค้นหาจาก ID ตรงๆ ใครขอดูก็ส่งให้
    const [notes]: any = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
    const note = notes[0];

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};