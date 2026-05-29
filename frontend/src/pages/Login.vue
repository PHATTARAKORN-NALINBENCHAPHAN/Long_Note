<script setup lang="ts">
import { ref } from "vue";
import api from "../lib/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useNotificationStore } from "../stores/notificationStore";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;

    const response = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;
    const user = response.data.user || { email: email.value };
    
    authStore.setToken(token, user);

    notificationStore.showNotification("เข้าสู่ระบบสำเร็จ ยินดีต้อนรับครับ!", "success");
    router.push("/dashboard");

  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "Invalid credentials" || error.response.data.message === "User not found") {
        notificationStore.showNotification("อีเมลหรือรหัสผ่านไม่ถูกต้อง", "error");
      } else {
        notificationStore.showNotification(error.response.data.message, "error");
      }
    } else {
      notificationStore.showNotification("การเชื่อมต่อล้มเหลว กรุณาลองใหม่อีกครั้ง", "error");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-card dark-glass">
      <h1>Welcome Back</h1>
      <p>เข้าสู่ระบบเพื่อจัดการ Notes ของคุณ</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="example@email.com" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required :disabled="loading" />
        </div>

        <button class="login-btn" :disabled="loading">
          {{ loading ? "Loading..." : "Login" }}
        </button>
      </form>

      <div class="footer">
        <span>ยังไม่มีบัญชี ?</span>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  /* 🌌 ปล่อยให้ฉากหลังโชว์วอลเปเปอร์มืดของบอดี้หลัก */
  background: transparent; 
}

/* 🧱 บล็อกกระจกฝ้าหน้าต่างล็อกอิน */
.login-card {
  width: 100%;
  max-width: 420px;
  padding: 48px 40px;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

p {
  color: var(--text-muted);
  font-size: 15px;
  margin-bottom: 32px;
  line-height: 1.6;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-main);
  letter-spacing: 0.3px;
}

/* 💎 ช่องกรอกข้อมูลเนื้อกระจกรมควันโปร่งแสง */
input {
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  font-size: 15px;
  color: var(--text-main);
  outline: none;
  transition: all 0.25s ease;
}

input:hover {
  background: rgba(15, 23, 42, 0.55);
  border-color: rgba(255, 255, 255, 0.18);
}

/* ⚡ ตอนเมาส์คลิกพิมพ์ ให้สว่างวาบพร้อมออร่าม่วงเรืองแสง */
input:focus {
  background: rgba(15, 23, 42, 0.75);
  border-color: var(--primary);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
}

input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

/* 🟣 ปุ่มล็อกอินสีม่วงนีออนเรืองแสงกระแทกตา */
.login-btn {
  margin-top: 8px;
  padding: 14px;
  background: var(--primary);
  color: var(--text-main);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.login-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55);
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer {
  margin-top: 28px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}

/* 💠 ไฮไลต์ลิงก์สีฟ้าเรืองแสงให้อ่านง่ายและเด่นชัด */
.footer a {
  margin-left: 6px;
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer a:hover {
  color: var(--accent-hover);
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
  }
}
</style>