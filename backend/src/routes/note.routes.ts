import express from "express";

import { verifyToken }
from "../middleware/auth.middleware";

import { createNote }
from "../controllers/note.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createNote
);

export default router;