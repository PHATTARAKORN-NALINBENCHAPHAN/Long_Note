import express from "express";
import {
  register,
  login
} from "../controllers/auth.controller";
import {
  registerValidation
} from "../validators/auth.validator";

import {
  validate
} from "../middleware/validation.middleware";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);
router.post(
  "/login",
  login
);

export default router;