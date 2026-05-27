<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const mockNotes = [
  {
    id: 1,

    title: "Docker Setup",

    category: "DevOps",

    content: `
Docker ช่วยให้เราสร้าง
Container สำหรับ Deploy
Application ได้ง่ายขึ้น

เหมาะกับงาน Backend
และ Production Environment
`,

    createdAt: "2025-07-18",
  },

  {
    id: 2,

    title: "Vue Tips",

    category: "Frontend",

    content: `
Vue Composition API
ช่วยให้การจัดการ Logic
สะอาดและ Reuse ได้ง่าย

เหมาะกับโปรเจกต์ขนาดใหญ่
`,

    createdAt: "2025-07-19",
  },

  {
    id: 3,

    title: "MySQL Guide",

    category: "Database",

    content: `
MySQL เป็น Relational Database

เหมาะกับระบบ Blog
และ CRUD Application
`,

    createdAt: "2025-07-20",
  },
];

const note = computed(() => {
  return mockNotes.find((note) => note.id === Number(route.params.id));
});
</script>

<template>
  <div class="container" v-if="note">
    <div class="top">
      <span>
        {{ note.category }}
      </span>

      <p>
        {{ note.createdAt }}
      </p>
    </div>

    <h1>
      {{ note.title }}
    </h1>

    <article>
      {{ note.content }}
    </article>
  </div>

  <div v-else class="empty">
    <h2>Note Not Found</h2>

    <p>ไม่พบบทความนี้</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;

  margin: auto;

  padding: 60px 24px;
}

.top {
  display: flex;

  gap: 14px;

  align-items: center;

  margin-bottom: 18px;
}

span {
  background: #eef2ff;

  color: #4f46e5;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 13px;

  font-weight: 600;
}

.top p {
  color: #6b7280;
}

h1 {
  font-size: 42px;

  line-height: 1.2;

  margin-bottom: 32px;
}

article {
  line-height: 2;

  font-size: 17px;

  color: #374151;

  white-space: pre-line;
}

.empty {
  text-align: center;

  padding: 120px 24px;
}

.empty p {
  margin-top: 10px;

  color: #6b7280;
}
</style>
