import express from "express";
import pool from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import noteRoutes from "./routes/note.routes";
import {
  errorHandler
} from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Backend Running");
});

app.get("/db-test", async (_, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT 1 + 1 AS result"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
});

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/notes", noteRoutes);

app.use(errorHandler);

export default app;