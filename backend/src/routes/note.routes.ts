import express from "express";

import { verifyToken }
from "../middleware/auth.middleware";

import {
  createNote,
  getNotes
} from "../controllers/note.controller";

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

export default router;