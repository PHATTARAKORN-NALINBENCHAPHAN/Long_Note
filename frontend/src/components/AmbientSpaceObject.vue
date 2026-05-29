<script setup lang="ts">
interface Props {
  emoji?: string;
  glowColor?: 'purple' | 'cyan' | 'pink' | 'amber'; // เพิ่มสีเหลืองอำพันแบบดวงดาว
  speed?: 'slow' | 'normal' | 'fast';
  size?: number; // กำหนดขนาดพิกเซลได้เอง
}

withDefaults(defineProps<Props>(), {
  emoji: "🪐",
  glowColor: "purple",
  speed: "normal",
  size: 60
});
</script>

<template>
  <div 
    class="space-item" 
    :class="[speed, glowColor]"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <div class="space-glass">
      <span class="space-emoji" :style="{ fontSize: (size * 0.5) + 'px' }">
        {{ emoji }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.space-item {
  position: absolute;
  border-radius: 50%;
  padding: 2px;
  z-index: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.space-glass {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* 🪐 เมื่อเมาส์ผ่าน จะเรืองแสงวาบและขยายตัวรับเมาส์ */
.space-item:hover {
  transform: scale(1.15) translateY(-5px) !important;
}

/* ==========================================================================
   🎨 รังสีเรืองแสงรอบวัตถุอวกาศ (Space Aura)
   ========================================================================== */
.purple {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.15), inset 0 0 12px rgba(99, 102, 241, 0.1);
}
.cyan {
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.15), inset 0 0 12px rgba(56, 189, 248, 0.1);
}
.pink {
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.15), inset 0 0 12px rgba(236, 72, 153, 0.1);
}
.amber {
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.15), inset 0 0 12px rgba(245, 158, 11, 0.1);
}

/* ==========================================================================
   🎬 แอนิเมชันฟิสิกส์แรงโน้มถ่วงต่ำ (Float Physics)
   ========================================================================== */
.slow { animation: spaceFloatSlow 8s ease-in-out infinite; }
.normal { animation: spaceFloatNormal 6s ease-in-out infinite; }
.fast { animation: spaceFloatFast 4.5s ease-in-out infinite; }

@keyframes spaceFloatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

@keyframes spaceFloatNormal {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(-8deg); }
}

@keyframes spaceFloatFast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-7px) rotate(6deg); }
}
</style>