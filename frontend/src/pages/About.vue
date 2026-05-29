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
  <div class="about-container">
    <div class="cyber-mesh-layer"></div>

    <div class="about-flair flair-purple"></div>
    <div class="about-flair flair-cyan"></div>

    <div class="container animate-slide-up">
      <section class="hero">
        <h1 class="gradient-text">About NoteSpace</h1>
        <p class="subtitle">Simple Note & Blog Platform สำหรับจดบันทึก ไอเดีย และบทความของคุณ</p>
      </section>

      <section class="section intro-card dark-glass">
        <div class="intro-accent-line"></div>
        <h2>What is NoteSpace ?</h2>
        <p>
          NoteSpace คือระบบ Blog และ Note Application ที่ถูกออกแบบให้ใช้งานง่าย 
          สำหรับสร้าง จัดการ และอ่านบทความหรือบันทึกต่าง ๆ แนวคิดหลักคือ Minimal Design 
          เน้นความเรียบง่าย สบายตา และโฟกัสที่เนื้อหา (Content) ของคุณเป็นสำคัญ ผสมผสานสไตล์ 
          Dark Glassmorphism เพื่อประสบการณ์ทำงานที่สุนทรีย์ล้ำยุค
        </p>
      </section>

      <section class="section">
        <h2>Key Features</h2>
        <div class="grid">
          <div v-for="feature in features" :key="feature.title" class="card feature-card dark-glass">
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
          <div v-for="tech in techStack" :key="tech.name" class="card tech-card dark-glass">
            <div class="card-icon-wrap">
              <div class="card-icon">{{ tech.icon }}</div>
            </div>
            <div class="card-content">
              <h3>{{ tech.name }}</h3>
              <span class="tech-badge">{{ tech.type }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  position: relative;
  width: 100%;
  min-height: 90vh;
  overflow: hidden;
}

/* 🕸️ ฉากหลังลายเส้นตารางไซเบอร์สุดบางเบา */
.cyber-mesh-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 45px 45px;
  z-index: 0;
  pointer-events: none;
}

/* 🌌 คลื่นแสงออโรร่าลอยได้ เคลื่อนที่สวนทางกัน */
.about-flair {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.24;
}

.flair-purple {
  top: 15%;
  right: 15%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 80%);
  animation: driftAround 22s infinite ease-in-out;
}

.flair-cyan {
  bottom: 20%;
  left: 10%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 85%);
  animation: driftAround 28s infinite ease-in-out reverse;
}

.container {
  max-width: 1000px;
  margin: auto;
  padding: 60px 24px;
  position: relative;
  z-index: 1;
}

.hero {
  text-align: center;
  margin-bottom: 64px;
}

/* 🎨 อัปเกรดหัวข้อใหญ่ให้เป็น Text Gradient คริสตัลสะท้อนเงาแวววาว */
.gradient-text {
  font-size: 54px;
  margin-bottom: 18px;
  font-weight: 800;
  letter-spacing: -1.5px;
  background: linear-gradient(135deg, #ffffff 20%, #c7d2fe 60%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shineText 8s ease infinite;
  background-size: 200% auto;
}

.subtitle {
  font-size: 18px;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
}

.section {
  margin-bottom: 75px;
}

/* 🧱 แผ่นกระจกแนะนำระบบ เพิ่มดีเทลเส้นขอบไฟแนวตั้งซ้าย */
.intro-card {
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.intro-accent-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--primary), var(--accent));
  box-shadow: 0 0 10px var(--primary);
}

.section h2 {
  font-size: 28px;
  margin-bottom: 24px;
  color: var(--text-main);
  font-weight: 700;
  letter-spacing: -0.3px;
}

/* ⚡ เส้นขีดใต้หัวข้อย่อยสไตล์หลอดนีออนไฟนิ่ง */
.section h2::after {
  content: '';
  display: block;
  width: 45px;
  height: 4px;
  background: var(--primary);
  box-shadow: 0 0 10px var(--primary);
  border-radius: 2px;
  margin-top: 10px;
}

.section p {
  line-height: 1.9;
  color: var(--text-muted);
  max-width: 850px;
  font-size: 16px;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
  margin-top: 28px;
}

.card {
  display: flex;
  gap: 18px;
  padding: 26px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 🟣 เมาส์ชี้การ์ด Feature: เรืองออร่าสีม่วงอินดิโก้ */
.feature-card:hover {
  transform: translateY(-4px);
  background: rgba(99, 102, 241, 0.06);
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 12px 28px -5px rgba(99, 102, 241, 0.25),
              0 0 10px rgba(99, 102, 241, 0.1);
}

/* 🔵 เมาส์ชี้การ์ด Tech Stack: เรืองออร่าสีฟ้าไซเบอร์ */
.tech-card:hover {
  transform: translateY(-4px);
  background: rgba(56, 189, 248, 0.06);
  border-color: rgba(56, 189, 248, 0.35);
  box-shadow: 0 12px 28px -5px rgba(56, 189, 248, 0.25),
              0 0 10px rgba(56, 189, 248, 0.1);
}

.card-icon {
  font-size: 28px;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
  filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1));
}

.card-content h3 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: var(--text-main);
  font-weight: 600;
  letter-spacing: -0.2px;
}

.card-desc {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* 💠 ป้ายไฟสไตล์หลอดนีออนสว่างอมฟ้าคราม */
.tech-badge {
  display: inline-block;
  margin-top: 6px;
  font-size: 12px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: var(--accent);
  padding: 4px 14px;
  border-radius: 100px;
  font-weight: 600;
  letter-spacing: 0.2px;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.05);
}

/* 🎬 แอนิเมชันความสมูทในการเปลี่ยนผ่านเนื้อหา */
@keyframes driftAround {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -30px) scale(1.06); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes shineText {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-slide-up {
  animation: enterView 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes enterView {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero h1 { font-size: 38px; }
  .container { padding: 40px 20px; }
  .intro-card { padding: 26px; }
  .grid { grid-template-columns: 1fr; gap: 16px; }
  .flair-purple, .flair-cyan { width: 240px; height: 240px; }
}
</style>