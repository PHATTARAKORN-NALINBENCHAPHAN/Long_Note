<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // เพิ่ม useRouter เผื่อใช้ดีดผู้ใช้กลับ
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore"; // 1. นำเข้า notificationStore

const route = useRoute();
const notificationStore = useNotificationStore(); // 2. เรียกใช้งาน Store

const note = ref<any>(null);
const loading = ref(true); // เพิ่มตัวแปรสถานะการโหลดเพื่อทำ UX ที่ดีขึ้น

const fetchNote = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/notes/${route.params.id}`);
    note.value = response.data;
  } catch (error: any) {
    console.log(error);
    // ❌ แจ้งเตือนเมื่อไม่พบโน้ต หรือเกิด Error
    notificationStore.showNotification("ไม่พบบทความหรือโน้ตที่คุณต้องการ", "error");
    
    // ออพชันเสริม: ดีดผู้ใช้กลับหน้า Dashboard ทันทีถ้าไม่เจอโน้ต (เปิดคอมเมนต์ใช้งานได้ครับ)
    // router.push("/dashboard"); 
  } finally {
    loading.value = false;
  }
};

// ฟังก์ชันแปลงวันที่ให้อ่านง่ายสไตล์ไทย (เช่น 29 พ.ค. 2026)
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
    <div class="top">
      <span>
        {{ note.category || "ทั่วไป" }}
      </span>
      <p>
        📅 {{ formatDate(note.created_at) }}
      </p>
    </div>

    <h1>
      {{ note.title }}
    </h1>

    <article>
      {{ note.content }}
    </article>
  </div>

  <div v-else-if="loading" class="empty">
    <h2>Loading...</h2>
    <p>กำลังดึงข้อมูลโน้ตของคุณ</p>
  </div>

  <div v-else class="empty">
    <h2>Note Not Found</h2>
    <p>ไม่พบบทความนี้ในระบบ</p>
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
