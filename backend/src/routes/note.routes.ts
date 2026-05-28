import express from "express";

import { verifyToken }
from "../middleware/auth.middleware";

import {
  createNote,
  getNotes,
  updateNote
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

router.put(
  "/:id",
  verifyToken,
  updateNote
);

export default router;