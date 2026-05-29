<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import Toast from "./components/Toast.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

// หน้าที่ตกลงกันว่าจะซ่อนแผงเมนูด้านบน
const hideNavbarPages = ["/login", "/register"];
</script>

<template>
  <div class="app-layout">
    <Toast />
    
    <Navbar v-if="!hideNavbarPages.includes(route.path)" />

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-main);
  position: relative;
  overflow-x: hidden;
}

/* 🟣 เติมลูกเล่นออร่าแสงสีม่วงฟุ้งที่มุมซ้ายบนของจอภาพ */
.app-layout::before {
  content: "";
  position: fixed;
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

/* 🔵 เติมลูกเล่นออร่าแสงสีฟ้าฟุ้งที่มุมขวาล่างของจอภาพ */
.app-layout::after {
  content: "";
  position: fixed;
  bottom: -10%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

/* จัดให้ Router View อยู่บนเลเยอร์เหนือแสงแฟลร์หลังบ้าน */
.main-content {
  position: relative;
  z-index: 1;
  width: 100%;
}

/* 🎬 อนิเมชัน Transition เวลาเปลี่ยนหน้าเพจให้สมูทไม่กระตุกสายตา */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>