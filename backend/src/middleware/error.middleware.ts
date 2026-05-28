import {
  Request,
  Response,
  NextFunction
} from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log(error);

  const status =
    error.status || 500;

  const message =
    error.message ||
    "Internal Server Error";

  res.status(status).json({
    success: false,
    message
  });

};