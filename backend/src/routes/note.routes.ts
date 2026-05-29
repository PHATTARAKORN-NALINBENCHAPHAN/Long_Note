import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
  getNotesByCategory,
  getSingleNote,
  getMyNotes
} from "../controllers/note.controller";

const router = express.Router();

// ==========================================
// 🔓 PUBLIC ROUTES (ทุกคนเห็น / ทุกคนค้นหาได้ - ไม่ต้องมี verifyToken)
// ==========================================

// ล็อกสิทธิ์ด้วย verifyToken เพื่อเอาไว้ดึงเฉพาะโน้ตของผู้ใช้คนนั้นๆ
router.get("/me", verifyToken, getMyNotes);

// 1. Home -> ทุกคนเห็นทุก note
router.get(
  "/", 
  getNotes
);

// 2. Search -> search ทุก note (อยู่ก่อน :id ถูกต้องแล้วครับ 👍)
router.get(
  "/search", 
  searchNotes
);

// 3. Category -> ดูตามหมวดหมู่ได้ทุกคน
router.get(
  "/category/:category", 
  getNotesByCategory
);

// 4. Single Note -> เปิดได้ทุก note
router.get(
  "/:id", 
  getSingleNote
);

// ==========================================
// 🔒 PROTECTED ROUTES (Owner Only - ต้องมี verifyToken)
// ==========================================

// Create -> owner only
router.post(
  "/", 
  verifyToken, 
  createNote
);

// Edit -> owner only
router.put(
  "/:id", 
  verifyToken, 
  updateNote
);

// Delete -> owner only
router.delete(
  "/:id", 
  verifyToken, 
  deleteNote
);

export default router;