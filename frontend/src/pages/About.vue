<script setup lang="ts">
// ปรับปรุงฟีเจอร์โดยใส่คำอธิบายสั้น ๆ หรือจัดกลุ่มให้น่าสนใจขึ้น
const features = [
  { title: "Create Note", desc: "เขียนและบันทึกไอเดียใหม่ ๆ ได้ทันที", icon: "✍️" },
  { title: "Edit Note", desc: "แก้ไขเนื้อหาและปรับปรุงบันทึกได้ตลอดเวลา", icon: "📝" },
  { title: "Delete Note", desc: "ลบโน้ตที่ไม่ต้องการพร้อมระบบแจ้งเตือน", icon: "🗑️" },
  { title: "Search Note", desc: "ค้นหาโน้ตจากหัวข้อ หมวดหมู่ หรือเนื้อหาได้อย่างรวดเร็ว", icon: "🔍" },
  { title: "Category System", desc: "จัดระเบียบโน้ตแยกตามสายงานและหมวดหมู่", icon: "🏷️" },
  { title: "State Management", desc: "ระบบจัดการข้อมูลและแจ้งเตือนแบบ Real-time", icon: "🔔" },
];

// อัปเดต Tech Stack ให้ตรงกับระบบปัจจุบันที่มี Pinia เข้ามาเสริมทัพ
const techStack = [
  { name: "Vue 3 + TypeScript", type: "Frontend Framework", icon: "⚡" },
  { name: "Pinia", type: "State Management", icon: "🍍" },
  { name: "Node.js + Express", type: "Backend API", icon: "🟢" },
  { name: "MySQL", type: "Database", icon: "🐬" },
  { name: "Docker", type: "Containerization", icon: "🐋" },
  { name: "Render / Vercel", type: "Deployment Platforms", icon: "🚀" },
];
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1>About NoteSpace</h1>
      <p>Simple Note & Blog Platform สำหรับจดบันทึก ไอเดีย และบทความของคุณ</p>
    </section>

    <section class="section">
      <h2>What is NoteSpace ?</h2>
      <p>
        NoteSpace คือระบบ Blog และ Note Application ที่ถูกออกแบบให้ใช้งานง่าย 
        สำหรับสร้าง จัดการ และอ่านบทความหรือบันทึกต่าง ๆ แนวคิดหลักคือ Minimal Design 
        เน้นความเรียบง่าย สบายตา และโฟกัสที่เนื้อหา (Content) ของคุณเป็นสำคัญ
      </p>
    </section>

    <section class="section">
      <h2>Key Features</h2>
      <div class="grid">
        <div v-for="feature in features" :key="feature.title" class="card">
          <div class="card-icon">{{ feature.icon }}</div>
          <div class="card-content">
            <h3>{{ feature.title }}</h3>
            <p class="card-desc">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Tech Stack Backend & Frontend</h2>
      <div class="grid">
        <div v-for="tech in techStack" :key="tech.name" class="card tech-card">
          <div class="card-icon">{{ tech.icon }}</div>
          <div class="card-content">
            <h3>{{ tech.name }}</h3>
            <span class="tech-badge">{{ tech.type }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 60px 24px;
}

.hero {
  text-align: center;
  margin-bottom: 80px;
}

.hero h1 {
  font-size: 52px;
  margin-bottom: 18px;
  color: #111827;
}

.hero p {
  font-size: 18px;
  color: #6b7280;
  line-height: 1.8;
}

.section {
  margin-bottom: 70px;
}

.section h2 {
  font-size: 30px;
  margin-bottom: 24px;
  color: #1f2937;
  position: relative;
}

/* เพิ่มเส้นขีดใต้หัวข้อให้ดูมีดีไซน์ */
.section h2::after {
  content: '';
  display: block;
  width: 40px;
  height: 4px;
  background: #4f46e5;
  border-radius: 2px;
  margin-top: 8px;
}

.section p {
  line-height: 2;
  color: #4b5563;
  max-width: 750px;
  font-size: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.card {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: white;
  border: 1px solid #ececec;
  border-radius: 20px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  border-color: #4f46e5;
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.06);
}

.card-icon {
  font-size: 28px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.card-content h3 {
  font-size: 18px;
  margin: 0 0 6px 0;
  color: #111827;
  font-weight: 600;
}

.card-desc {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.tech-badge {
  display: inline-block;
  margin-top: 4px;
  font-size: 12px;
  background: #eef2ff;
  color: #4f46e5;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 38px;
  }
  
  .container {
    padding: 40px 20px;
  }
}
</style>