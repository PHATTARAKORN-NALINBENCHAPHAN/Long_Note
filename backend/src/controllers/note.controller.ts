import { Request, Response } from "express";
import pool from "../config/db";

export const createNote = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      title,
      content,
      category
    } = req.body;

    const user =
      (req as any).user;

    await pool.query(
      `
      INSERT INTO notes
      (title, content, category, user_id)
      VALUES (?, ?, ?, ?)
      `,
      [
        title,
        content,
        category,
        user.userId
      ]
    );

    res.status(201).json({
      message: "Note created"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Create note failed"
    });

  }

};

export const getNotes = async (
  req: Request,
  res: Response
) => {

  try {

    const user =
      (req as any).user;

    const [notes] =
      await pool.query(
        `
        SELECT *
        FROM notes
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [user.userId]
      );

    res.json(notes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Get notes failed"
    });

  }

};