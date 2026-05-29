<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const isMenuOpen = ref(false); // 👈 ตัวแปรควบคุมการ เปิด-ปิด เมนูบนมือถือ

const isLoggedIn = computed(() => authStore.isAuthenticated);
const userEmail = computed(() => authStore.user?.email || "User");

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// ฟังก์ชันปิดเมนูอัตโนมัติเมื่อมีการเปลี่ยนหน้า
const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleLogout = () => {
  authStore.logout();
  closeMenu();
  router.push("/login");
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo" @click="closeMenu">NoteSpace</router-link>

      <div class="nav-center desktop-only">
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/about">About</router-link>
      </div>

      <div class="nav-right desktop-only">
        <template v-if="isLoggedIn">
          <div class="user-profile">
            <span class="user-icon">👤</span>
            <span class="user-email">{{ userEmail }}</span>
          </div>
          <button class="logout-btn" @click="handleLogout">
            Logout
          </button>
        </template>

        <template v-else>
          <router-link to="/login" class="login-btn">Login</router-link>
          <router-link to="/register" class="register-btn">Register</router-link>
        </template>
      </div>

      <button class="mobile-toggle" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <div class="mobile-menu dark-glass" :class="{ 'is-open': isMenuOpen }">
      <div class="mobile-nav-links">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/dashboard" @click="closeMenu">Dashboard</router-link>
        <router-link to="/about" @click="closeMenu">About</router-link>
      </div>
      
      <div class="mobile-divider"></div>

      <div class="mobile-auth-actions">
        <template v-if="isLoggedIn">
          <div class="mobile-user-profile">
            <span class="user-icon">👤</span>
            <span class="mobile-user-email">{{ userEmail }}</span>
          </div>
          <button class="logout-btn mobile-full-btn" @click="handleLogout">
            Logout
          </button>
        </template>

        <template v-else>
          <router-link to="/login" class="login-btn mobile-full-btn" @click="closeMenu">Login</router-link>
          <router-link to="/register" class="register-btn mobile-full-btn" @click="closeMenu">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  /* 💎 แผ่นกระจกเงารมควันโปร่งแสง */
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 800;
  text-decoration: none;
  color: var(--primary);
  letter-spacing: -0.5px;
  transition: 0.2s;
}

.logo:hover {
  text-shadow: 0 0 12px rgba(99, 102, 241, 0.6);
}

.nav-center {
  display: flex;
  gap: 32px;
}

.nav-center a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 15px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: 0.2s;
}

.nav-center a:hover,
.nav-center a.router-link-active {
  color: var(--text-main);
}

.nav-center a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
  transition: 0.25s;
}

.nav-center a:hover::after,
.nav-center a.router-link-active::after {
  width: 100%;
}

.nav-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

.login-btn {
  padding: 10px 22px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 999px;
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
  transition: 0.2s;
  text-align: center;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.register-btn {
  padding: 10px 22px;
  background: var(--primary);
  color: var(--text-main);
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  text-align: center;
}

.register-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.user-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 8px rgba(165, 180, 252, 0.5));
}

.logout-btn {
  padding: 10px 22px;
  background: rgba(239, 68, 68, 0.1); 
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover {
  background: #ef4444;
  color: var(--text-main);
  border-color: #f87171;
  transform: translateY(-1px);
  box-shadow: 0 0 16px rgba(239, 68, 68, 0.4), 0 4px 12px rgba(239, 68, 68, 0.2);
}

/* ==========================================================================
   📱 Responsive Mobile Custom CSS 
   ========================================================================== */

.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.mobile-toggle .bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-main);
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}

/* อนิเมชันแปลงร่างสามขีดเป็นกากบาท (Hamburger X Morph) */
.mobile-toggle.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
  background-color: var(--primary);
}
.mobile-toggle.is-active .bar:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
  background-color: var(--primary);
}

/* แผงดรอปดาวน์สำหรับมือถือสไตล์กระจกฝ้าหรูหรา */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateY(-20px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.is-open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-nav-links a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 16px;
  font-weight: 500;
  padding: 8px 4px;
  border-radius: 8px;
  transition: 0.2s;
}

.mobile-nav-links a:hover,
.mobile-nav-links a.router-link-active {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.04);
  padding-left: 12px;
}

.mobile-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.mobile-auth-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-main);
  font-size: 15px;
  padding: 4px 4px 12px;
}

.mobile-user-email {
  word-break: break-all; /* ป้องกันอีเมลยาวเกินล้นขอบจอ */
}

.mobile-full-btn {
  width: 100%;
  padding: 12px;
}

/* 🕹️ ตัวจัดการสลับมุมมองหน้าจอ Desktop กับ Mobile */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>