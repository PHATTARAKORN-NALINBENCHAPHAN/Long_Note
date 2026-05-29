<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore"; // 1. นำเข้า notificationStore

const router = useRouter();
const notificationStore = useNotificationStore(); // 2. เรียกใช้งาน Store

const title = ref("");
const category = ref("");
const content = ref("");
const loading = ref(false); // เพิ่มสถานะ Loading ป้องกันการกดบันทึกซ้ำ

const handleSubmit = async () => {
  // 🛠️ เปลี่ยนจาก alert ไปใช้ Toast แจ้งเตือนสีแดงแทน
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

    // 🎉 แจ้งเตือนเมื่อสร้างโน้ตสำเร็จ
    notificationStore.showNotification("สร้างโน้ตใหม่เรียบร้อยแล้ว 📑", "success");

    // วิ่งกลับไปหน้า dashboard
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

    <form class="form" @submit.prevent="handleSubmit">
      <div class="group">
        <label> Title </label>
        <input
          v-model="title"
          placeholder="เขียนหัวข้อโน้ต"
          :disabled="loading"
        />
      </div>

      <div class="group">
        <label> Category </label>
        <select v-model="category" :disabled="loading">
          <option disabled value="">เลือกหมวดหมู่</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>DevOps</option>
          <option>Programming</option>
        </select>
      </div>

      <div class="group">
        <label> Content </label>
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
  max-width: 900px;
  margin: auto;
  padding: 48px 24px;
}

.header {
  margin-bottom: 40px;
}

h1 {
  font-size: 36px;
  margin-bottom: 8px;
}

p {
  color: #6b7280;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-size: 14px;
  font-weight: 600;
}

input,
select,
textarea {
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: 0.2s;
  background: white;
}

textarea {
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

button {
  padding: 14px 22px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.save-btn {
  background: #4f46e5;
  color: white;
}

.save-btn:hover {
  background: #4338ca;
}

.cancel-btn {
  background: #f3f4f6;
  color: #4b5563;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>