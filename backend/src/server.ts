import dotenv from "dotenv";
import app from "./app";
import { testConnection } from "./config/db";

// 1. โหลด config ครั้งเดียวพอ
dotenv.config();

// 2. ตั้งค่า Port พร้อม fallback เป็น 3000 เผื่อลืมกำหนดใน .env
const PORT = process.env.PORT || 3000;

// 3. ใช้ async function เพื่อรอเช็ค DB ก่อนเปิด Server
const startServer = async () => {
  try {
    await testConnection(); // เช็ค DB ก่อน
    
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();