<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore";

const router = useRouter();
const notificationStore = useNotificationStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    notificationStore.showNotification("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน", "error");
    return;
  }

  try {
    loading.value = true;

    await api.post("/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    notificationStore.showNotification("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ", "success");
    router.push("/login");

  } catch (err: any) {
    if (err.response?.data?.message === "Email already exists") {
      notificationStore.showNotification("อีเมลนี้ถูกใช้งานในระบบแล้ว", "error");
    } else if (err.response?.data?.message) {
      notificationStore.showNotification(err.response.data.message, "error");
    } else {
      notificationStore.showNotification("เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่", "error");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="register-page">
    <div class="register-card dark-glass">
      <h1>Create Account</h1>
      <p>สมัครสมาชิกเพื่อเริ่มสร้าง Notes ของคุณ</p>

      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label>Username</label>
          <input v-model="username" type="text" placeholder="your username" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="example@email.com" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label>Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            :disabled="loading"
          />
        </div>

        <button class="register-btn" :disabled="loading">
          {{ loading ? "Creating Account..." : "Create Account" }}
        </button>
      </form>

      <div class="footer">
        <span>มีบัญชีแล้ว ?</span>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  background: transparent; /* โชว์พื้นหลังวอลเปเปอร์หลักของแอป */
}

/* 🧱 กล่องฟอร์มแผ่นแก้วกระจกฝ้า */
.register-card {
  width: 100%;
  max-width: 460px;
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

/* 💎 ช่องอินพุตผิวสัมผัสกระจกรมควันโปร่งแสง */
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

/* ⚡ เอฟเฟกต์ไฟสว่างวาบพร้อมขอบออร่าม่วงตอนกดพิมพ์ */
input:focus {
  background: rgba(15, 23, 42, 0.75);
  border-color: var(--primary);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
}

input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

/* 🟣 ปุ่มสมัครสมาชิกม่วงนีออนเรืองแสง */
.register-btn {
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

.register-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55);
}

.register-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer {
  margin-top: 28px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}

/* 💠 ปรับไฮไลต์ลิงก์สีฟ้าเรืองแสงให้อ่านง่ายคมชัด */
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
</style>