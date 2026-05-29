<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore"; // 1. นำเข้า notificationStore

const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore(); // 2. เรียกใช้งาน Store

const title = ref("");
const category = ref("");
const content = ref("");
const loading = ref(false);
const isFetching = ref(true); // สถานะตอนเริ่มโหลดดึงข้อมูลเดิมของโน้ต

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
    // ❌ แจ้งเตือนเมื่อดึงข้อมูลโน้ตไม่สำเร็จ หรือผู้ใช้ไม่มีสิทธิ์เข้าถึง
    notificationStore.showNotification("ไม่สามารถโหลดข้อมูลโน้ตได้ หรือคุณไม่มีสิทธิ์แก้ไขโน้ตนี้", "error");
    router.push("/dashboard");
  } finally {
    isFetching.value = false;
  }
};

const handleUpdate = async () => {
  // 🛠️ เปลี่ยนจาก alert ไปใช้ Toast แจ้งเตือนแทน
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

    // 🎉 แจ้งเตือนเมื่ออัปเดตโน้ตสำเร็จ
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
    <h1>Edit Note</h1>
    <p>แก้ไขข้อมูล Note ของคุณ</p>

    <div v-if="isFetching" class="loading-state">
      <p>กำลังโหลดข้อมูลโน้ต...</p>
    </div>

    <form v-else @submit.prevent="handleUpdate">
      <div class="group">
        <label> Title </label>
        <input v-model="title" placeholder="หัวข้อโน้ต" :disabled="loading" />
      </div>

      <div class="group">
        <label> Category </label>
        <select v-model="category" :disabled="loading">
          <option value="" disabled>เลือกหมวดหมู่</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>DevOps</option>
        </select>
      </div>

      <div class="group">
        <label> Content </label>
        <textarea rows="10" v-model="content" placeholder="พิมพ์เนื้อหาที่นี่..." :disabled="loading" />
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
  max-width: 900px;
  margin: auto;
  padding: 48px 24px;
}

h1 {
  font-size: 34px;
  margin-bottom: 8px;
}

p {
  color: #6b7280;
  margin-bottom: 32px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input,
select,
textarea {
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  outline: none;
}

textarea {
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

button {
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: 0.2s;
}

.update-btn {
  background: #4f46e5;
  color: white;
}

.update-btn:hover {
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

.loading-state {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
</style>