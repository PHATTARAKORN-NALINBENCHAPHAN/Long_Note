<script setup lang="ts">
import DashboardCard from "../components/DashboardCard.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref, computed, onMounted } from "vue";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore";

const notificationStore = useNotificationStore();

const notes = ref<any[]>([]);
const search = ref("");
const selectedCategory = ref("All"); // 👈 เพิ่มตัวแปรฟิลเตอร์หมวดหมู่ส่วนตัว
const loading = ref(false);

// รายการหมวดหมู่ยอดนิยมสำหรับช่วยดักกรองความฉลาดใน Dashboard
const popularCategories = ["All", "Programming", "Design", "Ideas", "General"];

const fetchNotes = async () => {
  try {
    loading.value = true;
    const response = await api.get("/notes/me"); 
    notes.value = response.data.data || [];
  } catch (error) {
    console.log("Error fetching user notes:", error);
    notificationStore.showNotification("ไม่สามารถดึงข้อมูลโน้ตของคุณได้ กรุณาลองใหม่อีกครั้ง", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNotes();
});

// ⚡ นับจำนวนโน้ตจริงแยกตามหมวดหมู่เพื่อโชว์บนป้ายชิปส่วนตัว
const countByCategory = (cat: string) => {
  if (cat === "All") return notes.value.length;
  return notes.value.filter(n => (n.category || "General").toLowerCase() === cat.toLowerCase()).length;
};

// ⚙️ ระบบคัดกรองแบบ 2 ชั้น: ค้นหาคำ และกรองด้วยป้ายหมวดหมู่
const filteredNotes = computed(() => {
  let result = notes.value;

  // ชั้นที่ 1: กรองตามป้ายหมวดหมู่ที่กดเลือก
  if (selectedCategory.value !== "All") {
    result = result.filter(
      (note) => (note.category || "General").toLowerCase() === selectedCategory.value.toLowerCase()
    );
  }

  // ชั้นที่ 2: กรองตามคำค้นหาที่พิมพ์เข้ามา
  if (search.value.trim()) {
    const keyword = search.value.toLowerCase();
    result = result.filter((note) => {
      const title = note?.title?.toLowerCase() || "";
      const category = note?.category?.toLowerCase() || "";
      return title.includes(keyword) || category.includes(keyword);
    });
  }

  return result;
});

const deleteNote = async (id: number) => {
  if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโน้ตนี้?")) {
    return;
  }

  try {
    await api.delete(`/notes/${id}`);
    notes.value = notes.value.filter((note) => note.id !== id);
    notificationStore.showNotification("ลบโน้ตเรียบร้อยแล้ว", "success");
  } catch (error) {
    console.log(error);
    notificationStore.showNotification("ไม่สามารถลบโน้ตได้ กรุณาลองใหม่อีกครั้ง", "error");
  }
};
</script>

<template>
  <div class="dashboard-container">
    <div class="cyber-mesh"></div>

    <div class="nebula-glow zone-1"></div>
    <div class="nebula-glow zone-2"></div>

    <div class="dashboard">
      <div class="header">
        <div class="header-title">
          <h1 class="gradient-title">Dashboard</h1>
          <p class="subtitle">จัดการ Notes ส่วนตัวของคุณได้อย่างอิสระ</p>
        </div>

        <router-link to="/create" class="create-link">
          <button class="create-btn">
            <span class="btn-glow"></span>
            <span class="btn-text">+ Create Note</span>
          </button>
        </router-link>
      </div>

      <div class="search-section">
        <SearchBar
          v-model="search"
          placeholder="Search your notes by title or category..."
        />

        <div class="dashboard-chips">
          <button
            v-for="cat in popularCategories"
            :key="cat"
            class="chip-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            <span class="chip-dot"></span>
            {{ cat }}
            <span class="chip-count">({{ countByCategory(cat) }})</span>
          </button>
        </div>
      </div>

      <section class="notes-section">
        <div class="section-title-bar">
          <h2>My Notes</h2>
          <span class="results-badge" v-if="!loading">{{ filteredNotes.length }} items found</span>
        </div>

        <div v-if="loading" class="loading-state">
          <span class="spinner">⏳</span> กำลังโหลดข้อมูลบันทึกความทรงจำ...
        </div>

        <div v-else-if="filteredNotes.length === 0" class="empty-state dark-glass">
          📄 ไม่พบข้อมูลบันทึกที่คุณต้องการในขณะนี้
        </div>

        <div v-else class="notes animate-fade-in">
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
  </div>
</template>

<style scoped>
.dashboard-container {
  position: relative;
  width: 100%;
  min-height: 90vh;
}

/* 🕸️ ฉากหลังลายตารางบางๆ เพิ่มมิติเชิงลึก */
.cyber-mesh {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  pointer-events: none;
}

/* 🌌 ก้อนแสงเนบิวลารมควันสีสวย ชวนหลงใหล */
.nebula-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.22;
}

.zone-1 {
  top: -5%;
  right: 5%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 85%);
  animation: wander 22s infinite ease-in-out;
}

.zone-2 {
  bottom: 10%;
  left: -5%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 80%);
  animation: wander 18s infinite ease-in-out reverse;
}

.dashboard {
  max-width: 1100px;
  margin: auto;
  padding: 54px 24px;
  position: relative;
  z-index: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
  gap: 20px;
}

/* 🎨 ขัดเกลาตัวหนังสือหัวข้อใหญ่ให้ไล่เฉดเงางามแบบกระจกคริสตัล */
.gradient-title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -1.2px;
  background: linear-gradient(135deg, #ffffff 40%, #c7d2fe 80%, #a5b4fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 15px;
}

/* 🟣 ปุ่มสร้างโน้ตใหม่สไตล์กระจกนีออนสว่างวาบลอยขึ้นมา */
.create-btn {
  position: relative;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%);
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.55),
              0 0 14px rgba(99, 102, 241, 0.3);
}

.create-btn:active {
  transform: translateY(0);
}

.search-section {
  margin-bottom: 44px;
}

/* 🏷️ การจัดระเบียบป้ายสวิตช์ฟิลเตอร์หมวดหมู่ */
.dashboard-chips {
  display: flex;
  gap: 10px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.chip-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(30, 41, 59, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.25s ease;
}

.chip-count {
  opacity: 0.4;
  font-size: 11px;
}

.chip-btn:hover {
  color: var(--text-main);
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.12);
}

/* 🔮 เมื่อป้ายชิปหมวดหมู่ของแดชบอร์ดถูกเลือกใช้งาน */
.chip-btn.active {
  color: var(--accent);
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.1);
}

.chip-btn.active .chip-dot {
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}

.chip-btn.active .chip-count {
  color: var(--text-main);
  opacity: 0.6;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 22px;
}

.notes-section h2 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
}

.results-badge {
  font-size: 13px;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ⏳ สถานะตัวหน่วงเวลา */
.loading-state {
  text-align: center;
  padding: 50px;
  color: var(--text-muted);
  font-size: 15px;
}

.spinner {
  display: inline-block;
  animation: pulse 1.5s infinite ease-in-out;
}

/* 📭 กล่องสไตล์ประแจ้งเตือน */
.empty-state {
  text-align: center;
  padding: 54px;
  color: var(--text-muted);
  font-size: 15px;
  border-style: dashed;
}

/* 🎬 แอนิเมชันเคลื่อนไหวลอยตัวอย่างสมูท */
@keyframes wander {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 40px) scale(1.08); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.animate-fade-in {
  animation: slideUp 0.4s ease forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 36px 20px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .create-link,
  .create-btn {
    width: 100%;
  }

  .gradient-title {
    font-size: 34px;
  }
}
</style>