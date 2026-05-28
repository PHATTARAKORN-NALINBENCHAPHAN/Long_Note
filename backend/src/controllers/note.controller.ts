import {
  Request,
  Response,
  NextFunction
} from "express";
import pool from "../config/db";


export const createNote = async (
  req: Request,
  res: Response,
 next: NextFunction
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

  next(error);

}

};

export const getNotes = async (
  req: Request,
  res: Response,
 next: NextFunction
) => {

  try {

    const user =
      (req as any).user;

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const offset =
      (page - 1) * limit;

    const [notes] =
      await pool.query(
        `
        SELECT *
        FROM notes
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT ?
        OFFSET ?
        `,
        [
          user.userId,
          limit,
          offset
        ]
      );

    const [totalResult]: any =
      await pool.query(
        `
        SELECT COUNT(*) as total
        FROM notes
        WHERE user_id = ?
        `,
        [user.userId]
      );

    const total =
      totalResult[0].total;

    res.json({
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
      data: notes
    });

  } catch (error) {

  next(error);

}

};

export const updateNote = async (
  req: Request,
  res: Response,
 next: NextFunction
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

  next(error);

}

};

export const deleteNote = async (
  req: Request,
  res: Response,
 next: NextFunction
) => {

  try {

    const { id } = req.params;

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
      DELETE FROM notes
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      message:
        "Note deleted"
    });

  } catch (error) {

  next(error);

}

};

export const searchNotes = async (
  req: Request,
  res: Response,
 next: NextFunction
) => {

  try {

    const { q } = req.query;

    const user =
      (req as any).user;

    const keyword =
      `%${q}%`;

    const [notes] =
      await pool.query(
        `
        SELECT *
        FROM notes
        WHERE user_id = ?
        AND (
          title LIKE ?
          OR content LIKE ?
          OR category LIKE ?
        )
        ORDER BY created_at DESC
        `,
        [
          user.userId,
          keyword,
          keyword,
          keyword
        ]
      );

    res.json(notes);

  } catch (error) {

  next(error);

}

};

export const getNotesByCategory =
  async (
    req: Request,
    res: Response,
 next: NextFunction
  ) => {

    try {

      const { category } =
        req.params;

      const user =
        (req as any).user;

      const [notes] =
        await pool.query(
          `
          SELECT *
          FROM notes
          WHERE user_id = ?
          AND category = ?
          ORDER BY created_at DESC
          `,
          [
            user.userId,
            category
          ]
        );

      res.json(notes);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Get category notes failed"
      });

    }

};

export const getSingleNote = async (
  req: Request,
  res: Response,
 next: NextFunction
) => {

  try {

    const { id } =
      req.params;

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

    const note =
      notes[0];

    if (!note) {

      return res.status(404).json({
        message:
          "Note not found"
      });

    }

    res.json(note);

  } catch (error) {

  next(error);

}

};