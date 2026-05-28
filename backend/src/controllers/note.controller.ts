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

export const updateNote = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const {
      title,
      content,
      category
    } = req.body;

    const user =
      (req as any).user;

    const [notes]: any =
      await pool.query(
        `
        SELECT *
        FROM notes
        WHERE id = ?
        AND user_id = ?
        `,
        [
          id,
          user.userId
        ]
      );

    const note = notes[0];

    if (!note) {

      return res.status(404).json({
        message:
          "Note not found"
      });

    }

    await pool.query(
      `
      UPDATE notes
      SET
        title = ?,
        content = ?,
        category = ?
      WHERE id = ?
      `,
      [
        title,
        content,
        category,
        id
      ]
    );

    res.json({
      message:
        "Note updated"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Update note failed"
    });

  }

};