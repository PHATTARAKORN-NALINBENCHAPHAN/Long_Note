import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_cyber_secret_key_123';

// ปรับให้รับค่าเป็น Object { userId: number }
export const generateToken = (payload: { userId: number }): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
};