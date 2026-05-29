<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore"; // 1. นำเข้า notificationStore

const router = useRouter();
const notificationStore = useNotificationStore(); // 2. เรียกใช้งาน Store

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);

const handleRegister = async () => {
  // ตรวจสอบความถูกต้องของรหัสผ่านก่อนยิง API
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

    // 🎉 แจ้งเตือนเมื่อสมัครสมาชิกสำเร็จ
    notificationStore.showNotification("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ", "success");

    // เด้งผู้ใช้ไปหน้าล็อกอิน
    router.push("/login");

  } catch (err: any) {
    // ❌ แจ้งเตือนกรณีเกิด Error จาก Backend
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
    <div class="register-card">
      <h1>Create Account</h1>
      <p>สมัครสมาชิกเพื่อเริ่มสร้าง Notes ของคุณ</p>

      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label> Username </label>
          <input v-model="username" type="text" placeholder="your username" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label> Email </label>
          <input v-model="email" type="email" placeholder="example@email.com" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label> Password </label>
          <input v-model="password" type="password" placeholder="••••••••" required :disabled="loading" />
        </div>

        <div class="input-group">
          <label> Confirm Password </label>
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
        <span> มีบัญชีแล้ว ? </span>
        <router-link to="/login"> Login </router-link>
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
  padding: 40px;
  background: #fafafb;
}

.register-card {
  width: 100%;
  max-width: 460px;
  padding: 40px;
  background: white;
  border: 1px solid #ececec;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

p {
  color: #6b7280;
  margin-bottom: 28px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 500;
}

input {
  padding: 14px 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
}

.error {
  margin: 0;
  font-size: 14px;
  color: #dc2626;
}

.register-btn {
  margin-top: 8px;
  padding: 14px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.register-btn:hover {
  background: #4338ca;
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.footer {
  margin-top: 24px;
  text-align: center;
  color: #6b7280;
}

.footer a {
  margin-left: 6px;
  text-decoration: none;
  font-weight: 600;
  color: #4f46e5;
}
</style>