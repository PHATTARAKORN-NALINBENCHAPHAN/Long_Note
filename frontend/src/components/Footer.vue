<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer-container">
    <div class="footer-content">
      <!-- ฝั่งซ้าย: โลโก้และคำอธิบายสั้น -->
      <div class="footer-brand">
        <span class="footer-logo">NoteSpace</span>
        <p class="footer-desc">Simple note and blogging platform for creative minds.</p>
      </div>

      <!-- ฝั่งขวา: ลิงก์หรือโซเชียล (ปรับเปลี่ยนลิงก์ตามใจชอบได้เลยเพื่อน) -->
      <div class="footer-links">
        <a href="https://github.com/PHATTARAKORN-NALINBENCHAPHAN/Long_Note" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <!-- เส้นแบ่งและเครดิตลิขสิทธิ์ -->
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} NoteSpace. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  width: 100%;
  background: rgba(15, 23, 42, 0.4); /* กระจกฝ้ารมควันจางๆ */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--glass-border);
  padding: 40px 40px 24px;
  position: relative;
  z-index: 10;
  margin-top: auto; /* ดันลงล่างสุดถ้าใช้ Flexbox ในหน้าหลัก */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
}

.footer-brand {
  max-width: 360px;
}

.footer-logo {
  font-size: 20px;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -0.5px;
}

.footer-desc {
  margin-top: 10px;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--text-main);
}

.footer-divider {
  max-width: 1200px;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 32px auto 20px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

/* 📱 หน้าจอมือถือปรับให้เรียงเป็นแนวตั้งตรงกลาง ไม่เบียด */
@media (max-width: 768px) {
  .footer-container {
    padding: 32px 24px 20px;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }

  .footer-links {
    justify-content: center;
    gap: 20px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>