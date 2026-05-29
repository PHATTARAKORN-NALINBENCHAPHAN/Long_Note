<script setup lang="ts">
import DashboardCard from "../components/DashboardCard.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref, computed, onMounted } from "vue";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore"; // 1. นำเข้า notificationStore

const notificationStore = useNotificationStore(); // 2. เรียกใช้งาน Store

const notes = ref<any[]>([]);
const search = ref("");
const loading = ref(false); // เพิ่มสถานะการโหลดเผื่อใช้ควบคุมหน้าจอ

const fetchNotes = async () => {
  try {
    loading.value = true;
    // ยิงเข้าเส้น Protected Route สำหรับดึงโน้ตส่วนตัว
    const response = await api.get("/notes/me"); 

    // รับก้อน Array โน้ตที่ถูกกรองมาแล้วจากหลังบ้าน (ใส่ || [] เผื่อกรณีไม่มีข้อมูล)
    notes.value = response.data.data || [];
  } catch (error) {
    console.log("Error fetching user notes:", error);
    // ❌ แจ้งเตือนเมื่อดึงข้อมูลโน้ตส่วนตัวล้มเหลว
    notificationStore.showNotification("ไม่สามารถดึงข้อมูลโน้ตของคุณได้ กรุณาลองใหม่อีกครั้ง", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNotes();
});

const filteredNotes = computed(() => {
  if (!search.value.trim()) {
    return notes.value;
  }

  const keyword = search.value.toLowerCase();

  return notes.value.filter((note) => {
    // 🛠️ ใส่ ?. และ || "" ป้องกัน Error หากข้อมูลบางฟิลด์เป็น null/undefined
    const title = note?.title?.toLowerCase() || "";
    const category = note?.category?.toLowerCase() || "";

    return title.includes(keyword) || category.includes(keyword);
  });
});

const deleteNote = async (id: number) => {
  // ถามเพื่อยืนยันก่อนลบเพื่อความปลอดภัย (UX ที่ดี)
  if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโน้ตนี้?")) {
    return;
  }

  try {
    await api.delete(`/notes/${id}`);

    // อัปเดตข้อมูลบนหน้าจอทันทีหลังจากลบหลังบ้านสำเร็จ
    notes.value = notes.value.filter((note) => note.id !== id);

    // 🎉 แจ้งเตือนเมื่อลบโน้ตเรียบร้อยแล้ว
    notificationStore.showNotification("ลบโน้ตเรียบร้อยแล้ว", "success");
  } catch (error) {
    console.log(error);
    // ❌ แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการลบ
    notificationStore.showNotification("ไม่สามารถลบโน้ตได้ กรุณาลองใหม่อีกครั้ง", "error");
  }
};
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <div>
        <h1>Dashboard</h1>

        <p>จัดการ Notes ของคุณ</p>
      </div>

      <router-link to="/create">
        <button>+ Create Note</button>
      </router-link>
    </div>

    <div class="search-section">
      <SearchBar
        v-model="search"
        placeholder="
Search notes...
"
      />
    </div>

    <section>
      <h2>My Notes</h2>

      <div class="notes">
        <DashboardCard
          v-for="note in filteredNotes"
          :key="note.id"
          :id="note.id"
          :title="note.title"
          :category="note.category"
          @delete="deleteNote"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1100px;

  margin: auto;

  padding: 40px;
}

.header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 28px;

  gap: 20px;
}

.search-section {
  margin-bottom: 36px;
}

h1 {
  font-size: 40px;

  margin-bottom: 8px;
}

p {
  color: #6b7280;
}

button {
  padding: 14px 20px;

  background: #4f46e5;

  color: white;

  border: none;

  border-radius: 12px;

  font-size: 15px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  white-space: nowrap;
}

button:hover {
  background: #4338ca;
}

h2 {
  margin-bottom: 24px;
}

.notes {
  display: flex;

  flex-direction: column;

  gap: 18px;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 24px;
  }

  .header {
    flex-direction: column;

    align-items: flex-start;
  }

  .header a {
    width: 100%;
  }

  button {
    width: 100%;
  }

  h1 {
    font-size: 34px;
  }
}
</style>
