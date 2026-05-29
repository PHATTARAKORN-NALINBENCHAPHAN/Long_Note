<script setup lang="ts">
defineProps<{
  title: string;
  content: string;
  category: string;
}>();
</script>

<template>
  <div class="card dark-glass">
    <div class="badge-container">
      <span class="category-badge">{{ category }}</span>
    </div>

    <h3>{{ title }}</h3>

    <p class="content-preview">
      {{ content }}
    </p>
  </div>
</template>

<style scoped>
.card {
  padding: 24px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

/* 🔥 เอฟเฟกต์ตอน Hover ให้กระจกสว่างวาบและขยายออร่าม่วงฟุ้ง */
.card:hover {
  transform: translateY(-4px);
  background: var(--glass-bg-hover);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 12px 28px -5px rgba(99, 102, 241, 0.2);
}

.badge-container {
  margin-bottom: 14px;
}

/* 💠 เปลี่ยนตลับป้ายหมวดหมู่ให้เป็นป้ายไฟนีออนฟ้าสว่างสู้ความมืด */
.category-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.2);
  padding: 5px 12px;
  border-radius: 999px;
  letter-spacing: 0.5px;
}

h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.4;
  margin-bottom: 10px;
}

/* 💬 ตัวอย่างจุดที่ปรับปรุงเพิ่มมาตรฐาน line-clamp ให้ปลอดภัยยิ่งขึ้น */
.content-preview {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  
  /* ✂️ ดักตัดข้อความตามมาตรฐานสากล */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* สำหรับเอนจิน Webkit (Chrome, Safari, Edge) */
  line-clamp: 3;         /* คุณสมบัติมาตรฐาน (Standard Property) */
}
</style>