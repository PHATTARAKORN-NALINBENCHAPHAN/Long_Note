<script setup lang="ts">
const features = [
  "Create Note",
  "Edit Note",
  "Delete Note",
  "Search Note",
  "Category System",
];

const techStack = [
  "Vue 3 + TypeScript",
  "Node.js + Express",
  "MySQL",
  "Docker",
  "Render / Vercel",
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
        สำหรับสร้าง จัดการ และอ่าน บทความหรือบันทึกต่าง ๆ แนวคิดหลักคือ Minimal
        Design และ Focus ที่ Content
      </p>
    </section>

    <section class="section">
      <h2>Features</h2>

      <div class="grid">
        <div v-for="feature in features" :key="feature" class="card">
          {{ feature }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Tech Stack</h2>

      <div class="grid">
        <div v-for="tech in techStack" :key="tech" class="card">
          {{ tech }}
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

  margin-bottom: 22px;
}

.section p {
  line-height: 2;

  color: #4b5563;

  max-width: 700px;
}

.grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  gap: 18px;

  margin-top: 24px;
}

.card {
  padding: 22px;

  background: white;

  border: 1px solid #ececec;

  border-radius: 18px;

  font-weight: 600;

  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
}
</style>
