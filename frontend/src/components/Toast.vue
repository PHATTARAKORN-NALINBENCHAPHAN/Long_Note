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
      <span v-if="notificationStore.type === 'success'">✅</span>
      <span v-if="notificationStore.type === 'error'">❌</span>
      <span v-if="notificationStore.type === 'info'">ℹ️</span>
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
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.success { background-color: #10b981; }
.error { background-color: #ef4444; }
.info { background-color: #3b82f6; }

.toast-notification p {
  margin: 0;
  font-size: 14px;
}

/* Animation ขยับเข้า-ออก */
.slide-enter-from, .slide-leave-to {
  transform: translateX(120%);
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>