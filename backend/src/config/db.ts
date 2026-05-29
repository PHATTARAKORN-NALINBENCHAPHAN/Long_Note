import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // โหลดไฟล์ .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// เพิ่มฟังก์ชันเทสต์การเชื่อมต่อ (เอาไว้เรียกใน server.ts)
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected Successfully!");
    connection.release(); // ปล่อย connection คืน pool
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error);
    process.exit(1); // ปิดแอปถ้าต่อ DB ไม่ได้
  }
};

export default pool;