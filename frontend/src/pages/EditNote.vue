<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore";

const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();

const title = ref("");
const category = ref("");
const content = ref("");
const loading = ref(false);
const isFetching = ref(true);

const fetchNote = async () => {
  try {
    isFetching.value = true;
    const response = await api.get(`/notes/${route.params.id}`);
    const note = response.data;

    title.value = note.title;
    category.value = note.category;
    content.value = note.content;
  } catch (error: any) {
    console.log(error);
    notificationStore.showNotification("ไม่สามารถโหลดข้อมูลโน้ตได้ หรือคุณไม่มีสิทธิ์แก้ไขโน้ตนี้", "error");
    router.push("/dashboard");
  } finally {
    isFetching.value = false;
  }
};

const handleUpdate = async () => {
  if (!title.value.trim() || !category.value || !content.value.trim()) {
    notificationStore.showNotification("กรุณากรอกข้อมูลให้ครบทุกช่อง", "error");
    return;
  }

  try {
    loading.value = true;

    await api.put(`/notes/${route.params.id}`, {
      title: title.value,
      category: category.value,
      content: content.value,
    });

    notificationStore.showNotification("อัปเดตโน้ตเรียบร้อยแล้ว ✨", "success");
    router.push("/dashboard");
  } catch (error: any) {
    console.log(error);
    if (error.response?.data?.message) {
      notificationStore.showNotification(error.response.data.message, "error");
    } else {
      notificationStore.showNotification("เกิดข้อผิดพลาดในการอัปเดตโน้ต", "error");
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNote();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Edit Note</h1>
      <p>แก้ไขข้อมูล Note ของคุณ</p>
    </div>

    <div v-if="isFetching" class="loading-state dark-glass">
      <span class="spinner">⏳</span> กำลังโหลดข้อมูลโน้ต...
    </div>

    <form v-else class="form dark-glass" @submit.prevent="handleUpdate">
      <div class="group">
        <label>Title</label>
        <input v-model="title" placeholder="หัวข้อโน้ต" :disabled="loading" />
      </div>

      <div class="group">
        <label>Category</label>
        <select v-model="category" :disabled="loading">
          <option value="" disabled>เลือกหมวดหมู่</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>DevOps</option>
          <option>Programming</option>
        </select>
      </div>

      <div class="group">
        <label>Content</label>
        <textarea rows="12" v-model="content" placeholder="พิมพ์เนื้อหาที่นี่..." :disabled="loading" />
      </div>

      <div class="actions">
        <button type="submit" class="update-btn" :disabled="loading">
          {{ loading ? "Updating..." : "Update Note" }}
        </button>
        
        <button type="button" class="cancel-btn" @click="router.push('/dashboard')" :disabled="loading">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 48px 24px;
}

.header {
  margin-bottom: 32px;
}

h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

p {
  color: var(--text-muted);
  font-size: 15px;
  margin: 0;
}

/* 🧱 กล่องฟอร์มกระจกฝ้าแผ่นใหญ่ */
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  letter-spacing: 0.3px;
}

/* 💎 ช่องอินพุตกระจกรมควันแบบโปร่งแสง */
input,
select,
textarea {
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  color: var(--text-main);
  outline: none;
  transition: all 0.25s ease;
}

textarea {
  resize: none;
}

select option {
  background-color: var(--bg-main);
  color: var(--text-main);
}

input:hover,
select:hover,
textarea:hover {
  background: rgba(15, 23, 42, 0.55);
  border-color: rgba(255, 255, 255, 0.18);
}

/* ⚡ เอฟเฟกต์สว่างวาบเรืองแสงม่วงตอนโฟกัสพิมพ์ */
input:focus,
select:focus,
textarea:focus {
  background: rgba(15, 23, 42, 0.75);
  border-color: var(--primary);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
}

button {
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;
}

/* 🟣 ปุ่มอัปเดตนีออนม่วงเรืองแสง */
.update-btn {
  background: var(--primary);
  color: var(--text-main);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.update-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55);
}

/* 🔘 ปุ่มยกเลิกกระจกใสโปร่งแสง */
.cancel-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
}

.cancel-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.2);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ⏳ ปรับแต่งดีไซน์ช่วงกำลังดึงข้อมูลดั้งเดิม */
.loading-state {
  text-align: center;
  padding: 48px;
  color: var(--text-muted);
  font-size: 15px;
  border-radius: 16px;
}

.spinner {
  display: inline-block;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@media (max-width: 768px) {
  .form {
    padding: 24px;
  }
}
</style>