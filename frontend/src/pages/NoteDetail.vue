<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore";

const route = useRoute();
const notificationStore = useNotificationStore();

const note = ref<any>(null);
const loading = ref(true);

const fetchNote = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/notes/${route.params.id}`);
    note.value = response.data;
  } catch (error: any) {
    console.log(error);
    notificationStore.showNotification("ไม่พบบทความหรือโน้ตที่คุณต้องการ", "error");
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

onMounted(() => {
  fetchNote();
});
</script>

<template>
  <div class="container" v-if="note">
    <div class="note-paper dark-glass">
      <div class="top">
        <span class="category-badge">
          {{ note.category || "ทั่วไป" }}
        </span>
        <p class="date-text">
          📅 {{ formatDate(note.created_at) }}
        </p>
      </div>

      <h1>{{ note.title }}</h1>

      <article>
        {{ note.content }}
      </article>
    </div>
  </div>

  <div v-else-if="loading" class="empty-container">
    <div class="empty-card dark-glass">
      <h2 class="spinner">⏳</h2>
      <p>กำลังดึงข้อมูลโน้ตของคุณ...</p>
    </div>
  </div>

  <div v-else class="empty-container">
    <div class="empty-card dark-glass">
      <h2>Note Not Found</h2>
      <p>ไม่พบบทความนี้ในระบบ</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 850px;
  margin: auto;
  padding: 48px 24px;
}

/* 🧱 แผ่นรองกระจกฝ้าขนาดใหญ่ของตัวโน้ต */
.note-paper {
  padding: 48px;
  border-radius: 24px;
}

.top {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}

/* 💠 ป้ายบอกหมวดหมู่แบบนีออนฟ้าเรืองแสง */
.category-badge {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: var(--accent);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.date-text {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0;
}

/* ⚡ ตัวอักษรหัวข้อใหญ่ขาวนวลคมชัดสู้ความมืด */
h1 {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--text-main);
  margin: 0 0 32px 0;
  letter-spacing: -0.5px;
}

/* 📖 ส่วนเนื้อความบทความสีขาวเทาสว่าง ปรับให้อ่านง่ายไม่ล้าสายตา */
article {
  line-height: 2.1;
  font-size: 17px;
  color: var(--text-muted);
  white-space: pre-line;
  letter-spacing: 0.2px;
}

/* 🌫️ การจัดวางรูปแบบสถานะว่างเปล่า/กำลังโหลด */
.empty-container {
  max-width: 500px;
  margin: auto;
  padding: 120px 24px;
}

.empty-card {
  padding: 48px;
  text-align: center;
  border-radius: 20px;
}

.empty-card h2 {
  color: var(--text-main);
  margin-bottom: 12px;
  font-weight: 700;
}

.empty-card p {
  color: var(--text-muted);
  margin: 0;
}

.spinner {
  display: inline-block;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.15); opacity: 1; }
}

@media (max-width: 768px) {
  .container {
    padding: 24px 16px;
  }

  .note-paper {
    padding: 32px 20px;
  }

  h1 {
    font-size: 32px;
  }
  
  article {
    font-size: 16px;
    line-height: 1.9;
  }
}
</style>