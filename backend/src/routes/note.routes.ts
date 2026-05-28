import express from "express";

import { verifyToken }
from "../middleware/auth.middleware";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes
}
from "../controllers/note.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createNote
);

router.get(
  "/",
  verifyToken,
  getNotes
);
//search ต้องอยู่ “ก่อน” ไม่งั้น Express จะคิดว่า "search" คือ id
router.get(
  "/search",
  verifyToken,
  searchNotes
);

router.put(
  "/:id",
  verifyToken,
  updateNote
);

router.delete(
  "/:id",
  verifyToken,
  deleteNote
);

export default router;