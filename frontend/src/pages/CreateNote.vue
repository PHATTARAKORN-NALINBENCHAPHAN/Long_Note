<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore";

const router = useRouter();
const notificationStore = useNotificationStore();

const title = ref("");
const category = ref("");
const content = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  if (!title.value.trim() || !category.value || !content.value.trim()) {
    notificationStore.showNotification("กรุณากรอกข้อมูลให้ครบทุกช่อง", "error");
    return;
  }

  try {
    loading.value = true;

    await api.post("/notes", {
      title: title.value,
      category: category.value,
      content: content.value,
    });

    notificationStore.showNotification("สร้างโน้ตใหม่เรียบร้อยแล้ว 📑", "success");
    router.push("/dashboard");

  } catch (error: any) {
    console.log(error);
    if (error.response?.data?.message) {
      notificationStore.showNotification(error.response.data.message, "error");
    } else {
      notificationStore.showNotification("เกิดข้อผิดพลาดในการสร้างโน้ต กรุณาลองใหม่", "error");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Create Note</h1>
      <p>สร้างบทความหรือบันทึกใหม่ของคุณ</p>
    </div>

    <form class="form dark-glass" @submit.prevent="handleSubmit">
      <div class="group">
        <label>Title</label>
        <input
          v-model="title"
          placeholder="เขียนหัวข้อโน้ต"
          :disabled="loading"
        />
      </div>

      <div class="group">
        <label>Category</label>
        <div class="select-wrapper">
          <select v-model="category" :disabled="loading">
            <option disabled value="">เลือกหมวดหมู่</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>DevOps</option>
            <option>Programming</option>
          </select>
        </div>
      </div>

      <div class="group">
        <label>Content</label>
        <textarea
          v-model="content"
          placeholder="เริ่มเขียนโน้ตของคุณ..."
          rows="12"
          :disabled="loading"
        />
      </div>

      <div class="actions">
        <button type="submit" class="save-btn" :disabled="loading">
          {{ loading ? "Saving..." : "Save Note" }}
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
}

/* 🧱 ตัวกล่องฟอร์มกระจกฝ้า */
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px; /* เพิ่มความกว้างข้างในให้ดูหรูลอยเด่น */
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

/* 💎 เสกให้ช่อง Input, Select, Textarea เป็นแผ่นกระจกฝ้ารมควันโปร่งแสง */
input,
select,
textarea {
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  color: var(--text-main);
  outline: none;
  transition: all 0.25s ease;
}

textarea {
  resize: none;
}

/* ปรับแต่ง Dropdown Option สำหรับ Dark Mode เพื่อให้เห็นตัวหนังสือ */
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

/* ⚡ ตอนกดพิมพ์ (Focus) ให้กระจกสว่างวาบและขอบเรืองแสงม่วงฟุ้ง */
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
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 🟣 ปุ่มบันทึกม่วงนีออน */
.save-btn {
  background: var(--primary);
  color: var(--text-main);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.save-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

/* 🔘 ปุ่มยกเลิกกระจกใสขอบบาง */
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

@media (max-width: 768px) {
  .form {
    padding: 24px;
  }
  
  input, select, textarea {
    padding: 12px;
  }
}
</style>