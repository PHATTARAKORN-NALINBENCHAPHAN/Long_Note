<script setup lang="ts">
import { useNotificationStore } from "../stores/notificationStore";
const notificationStore = useNotificationStore();
</script>

<template>
  <Transition name="slide">
    <div 
      v-if="notificationStore.isVisible" 
      :class="['toast-notification', notificationStore.type]"
    >
      <div class="toast-icon">
        <span v-if="notificationStore.type === 'success'">✅</span>
        <span v-if="notificationStore.type === 'error'">❌</span>
        <span v-if="notificationStore.type === 'info'">ℹ️</span>
      </div>
      <p>{{ notificationStore.message }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 16px;
  z-index: 999;
  
  /* 💎 เบสหลักเป็นเนื้อกระจกฝ้าเทาดำโปร่งแสง */
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: var(--text-main);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/* 🟢 แยกเงาและขอบตามประเภทเนื้อหา เพื่อให้เรืองแสงสู้ความมืด */
.success { 
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(16, 185, 129, 0.15);
}
.error { 
  border: 1px solid rgba(239, 68, 68, 0.3);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(239, 68, 68, 0.15);
}
.info { 
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(56, 189, 248, 0.15);
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
}

.toast-notification p {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 1.4;
}

/* 🎢 Animation เด้งนุ่มนวลแบบ Spring (Cubic-bezier) */
.slide-enter-from, .slide-leave-to {
  transform: translateX(140%) scale(0.9);
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0) scale(1);
  opacity: 1;
}
.slide-enter-active {
  transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
</style>