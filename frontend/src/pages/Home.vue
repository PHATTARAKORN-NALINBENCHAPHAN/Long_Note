<script setup lang="ts">
import NoteCard from "../components/NoteCard.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore";
import AmbientSpaceObject from "../components/AmbientSpaceObject.vue";

const router = useRouter();
const notificationStore = useNotificationStore();

const search = ref("");
const selectedCategory = ref("All");
const notes = ref<any[]>([]);
const loading = ref(false);

const popularCategories = ["All", "Programming", "Design", "Ideas", "General"];

// 🌌 อ้างอิงตารางจุด Stitch Canvas
const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

const fetchNotes = async () => {
  try {
    loading.value = true;
    const response = await api.get("/notes");
    notes.value = response.data.data || [];
  } catch (error) {
    console.log(error);
    notificationStore.showNotification("เกิดข้อผิดพลาดในการโหลดข้อมูลโน้ต กรุณาลองใหม่อีกครั้ง", "error");
  } finally {
    loading.value = false;
  }
};

// 🔮 ฟังก์ชันสร้างเมทริกซ์จุดล้ำยุคแบบดักจับทิศทางเคอร์เซอร์ (Stitch Pattern Engine)
const initStitchBackground = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let dots: Array<{ x: number; y: number; baseX: number; baseY: number }> = [];
  const mouse = { x: -1000, y: -1000, radius: 110 }; // รัศมีวงพลังงานดักจับเมาส์

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupDots();
  };

  // คำนวณระยะห่างเพื่อวางพิกัดจุดให้สมมาตรเต็มจอ
  const setupDots = () => {
    dots = [];
    const spacing = 32; // ระยะห่างระหว่างแต่ละจุดในหน้าจอ
    for (let x = spacing / 2; x < canvas.width; x += spacing) {
      for (let y = spacing / 2; y < canvas.height; y += spacing) {
        dots.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
        });
      }
    }
  };

  // ดักจับเหตุการณ์ขยับเคอร์เซอร์
  const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
  };

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);

  resizeCanvas();

  // 🔄 วงรอบการประมวลผลวาดแอนิเมชันความเร็วสูง
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      
      // คำนวณหาเวกเตอร์ระยะห่างระหว่างจุดกับจุดที่เมาส์อยู่
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // เอฟเฟกต์การผลัก/ขยับหลบหนี หรือเร่งความสว่างเมื่อเมาส์เข้าใกล้
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        // ทิศทางการหลบเมาส์มุมเอียง
        const forceX = (dx / distance) * force * 12;
        const forceY = (dy / distance) * force * 12;

        // ค่อยๆ เปลี่ยนตำแหน่งหลบเคอร์เซอร์อย่างเป็นธรรมชาติ
        dot.x -= forceX;
        dot.y -= forceY;
        
        // วาดจุดที่เรืองแสงวาบขึ้นเมื่อใกล้เมาส์
        ctx.fillStyle = `rgba(56, 189, 248, ${0.15 + force * 0.75})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.8 + force * 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // ดึงจุดกลับเข้าสู่สภาวะและพิกัดเดิม (Elastic Return)
        dot.x += (dot.baseX - dot.x) * 0.08;
        dot.y += (dot.baseY - dot.y) * 0.08;

        // จุดธรรมดาสีสลัวมินิมอลไม่รบกวนสายตา
        ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  // ทำลาย Event Listener เพื่อคืนแรมระบบเมื่อย้ายหน้า
  return () => {
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
    cancelAnimationFrame(animationFrameId);
  };
};

let cleanupStitch: (() => void) | null | undefined = null;

onMounted(() => {
  fetchNotes();
  cleanupStitch = initStitchBackground();
});

onUnmounted(() => {
  if (cleanupStitch) cleanupStitch();
});

const openNote = (id: number) => {
  router.push(`/note/${id}`);
};

const countByCategory = (cat: string) => {
  if (cat === "All") return notes.value.length;
  return notes.value.filter(n => (n.category || "General").toLowerCase() === cat.toLowerCase()).length;
};

const filteredNotes = computed(() => {
  let result = notes.value;

  if (selectedCategory.value !== "All") {
    result = result.filter(
      (note) => (note.category || "General").toLowerCase() === selectedCategory.value.toLowerCase()
    );
  }

  if (search.value.trim()) {
    const keyword = search.value.toLowerCase();
    result = result.filter((note) => {
      const title = note?.title?.toLowerCase() || "";
      const content = note?.content?.toLowerCase() || "";
      const category = note?.category?.toLowerCase() || "";
      return title.includes(keyword) || content.includes(keyword) || category.includes(keyword);
    });
  }

  return result;
});
</script>

<template>
  <div class="home-container">
    <canvas ref="canvasRef" class="stitch-canvas-mesh"></canvas>

<div class="ambient-space-layer">
      <AmbientSpaceObject 
        emoji="🪐" 
        glowColor="cyan" 
        speed="slow" 
        :size="70"
        style="top: 14%; left: 5%;" 
      />
      <AmbientSpaceObject 
        emoji="🚀" 
        glowColor="purple" 
        speed="normal" 
        :size="60"
        style="top: 25%; right: 6%;" 
      />
      <AmbientSpaceObject 
        emoji="👽" 
        glowColor="pink" 
        speed="fast" 
        :size="55"
        style="bottom: 35%; left: 4%;" 
      />
      <AmbientSpaceObject 
        emoji="✨" 
        glowColor="amber" 
        speed="slow" 
        :size="50"
        style="bottom: 20%; right: 8%;" 
      />
    </div>

    <div class="aurora-glow field-1"></div>
    <div class="aurora-glow field-2"></div>
    <div class="aurora-glow field-3"></div>

    <div class="content-view">
      <section class="hero">
        <h1 class="gradient-text">Your Ideas,<br />Notes & Stories</h1>
        <p class="subtitle">Simple note and blogging platform</p>
        
        <div class="hero-stats animate-fade">
          <div class="stat-item"><span>✨ {{ notes.length }}</span> Total Notes</div>
          <div class="stat-divider"></div>
          <div class="stat-item"><span>🚀 Active</span> Knowledge Base</div>
        </div>
      </section>

      <section class="search-section">
        <SearchBar
          v-model="search"
          placeholder="Search articles, docs, or thoughts..."
        />

        <div class="category-chips">
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
      </section>

      <section class="notes-wrapper">
        <div v-if="loading" class="loading-state">
          <span class="spinner">⏳</span> กำลังเปิดคลังไอเดียทั้งหมด...
        </div>

        <div v-else-if="filteredNotes.length === 0" class="empty-state dark-glass">
          🔍 ไม่พบบันทึกหรือบทความในหมวดหมู่ที่คุณกำลังตามหา
        </div>

        <div v-else class="notes-grid">
          <NoteCard
            v-for="note in filteredNotes"
            :key="note.id"
            :title="note.title"
            :content="note.content"
            :category="note.category"
            @click="openNote(note.id)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* 🕹️ ปรับแต่งเลเยอร์ Canvas ให้อยู่เบื้องหลังสุดแบบล็อกตำแหน่งขยับตามจอ */
.stitch-canvas-mesh {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none; /* ยอมให้เมาส์คลิกทะลุไปโดนปุ่มหรือการ์ดข้างล่างได้ปกติ */
}

/* ครอบกล่องคอนเทนต์ให้อยู่เหนือผืนผ้าใบ Canvas */
.content-view {
  max-width: 1200px;
  margin: auto;
  padding-bottom: 80px;
  position: relative;
  z-index: 1;
}

/* 🌀 คลื่นแสงออโรร่าลอยฟุ้งกระจายตัวช้าๆ */
.aurora-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.2;
}

.field-1 {
  top: 5%;
  left: 15%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 80%);
  animation: floatAround 20s infinite ease-in-out;
}

.field-2 {
  top: 22%;
  right: 8%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 80%);
  animation: floatAround 26s infinite ease-in-out reverse;
}

.field-3 {
  bottom: 10%;
  left: 30%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%);
  animation: floatAround 15s infinite linear;
}

.hero {
  text-align: center;
  padding: 90px 20px 40px;
  position: relative;
}

.gradient-text {
  font-size: 62px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1.8px;
  background: linear-gradient(135deg, #ffffff 20%, #c7d2fe 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  animation: textShine 7s ease infinite;
  background-size: 200% auto;
}

.subtitle {
  font-size: 19px;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.2px;
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
  padding: 6px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 100px;
  font-size: 13px;
  color: var(--text-muted);
}

.hero-stats span {
  color: var(--text-main);
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.15);
}

.search-section {
  max-width: 700px;
  margin: 0 auto 50px;
  padding: 0 20px;
  position: relative;
}

.category-chips {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.chip-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(30, 41, 59, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.25s ease;
}

.chip-count {
  opacity: 0.5;
  font-size: 11px;
}

.chip-btn:hover {
  color: var(--text-main);
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.chip-btn.active {
  color: var(--accent);
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.35);
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.15);
}

.chip-btn.active .chip-dot {
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.chip-btn.active .chip-count {
  color: var(--text-main);
  opacity: 0.7;
}

.notes-wrapper {
  padding: 0 40px;
  position: relative;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 26px;
}

.loading-state {
  text-align: center;
  padding: 60px;
  color: var(--text-muted);
  font-size: 15px;
}

.spinner {
  display: inline-block;
  animation: pulse 1.5s infinite ease-in-out;
}

.empty-state {
  text-align: center;
  padding: 50px;
  color: var(--text-muted);
  border-style: dashed;
  font-size: 15px;
}

/* 🎬 คีย์เฟรมอนิเมชันลอยนวล */
@keyframes floatAround {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, 35px) scale(1.1); }
  66% { transform: translate(-30px, 60px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes textShine {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.animate-fade {
  animation: fadeIn 1.2s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero { padding: 70px 20px 32px; }
  .gradient-text { font-size: 42px; letter-spacing: -1px; }
  .notes-wrapper { padding: 0 20px; }
  .notes-grid { grid-template-columns: 1fr; gap: 18px; }
  .field-1, .field-2, .field-3 { display: none; } /* ซ่อนออร่าบนมือถือเพื่อประสิทธิภาพที่ดีขึ้น */
}
</style>