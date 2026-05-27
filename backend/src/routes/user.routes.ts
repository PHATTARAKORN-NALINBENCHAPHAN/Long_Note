import express from "express";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/profile",
  verifyToken,
  (req, res) => {

    const user = (req as any).user;

    res.json({
      message: "Protected Route",
      user
    });

  }
);

export default router;