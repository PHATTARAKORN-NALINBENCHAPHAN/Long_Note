import jwt from "jsonwebtoken";

const SECRET =
  process.env.JWT_SECRET || "secret";

export const generateToken = (
  userId: number
) => {
  return jwt.sign(
    { userId },
    SECRET,
    { expiresIn: "7d" }
  );
};