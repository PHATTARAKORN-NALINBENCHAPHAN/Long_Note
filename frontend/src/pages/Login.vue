<script setup lang="ts">
import { ref } from "vue";
import api from "../lib/api";
import { useRouter } from "vue-router"; // เปลี่ยนไปใช้ useRouter composable (ถ้าใช้ใน script setup แนะนำตัวนี้)
import { useAuthStore } from "../stores/authStore"; // 1. นำเข้า authStore

const router = useRouter();
const authStore = useAuthStore(); // 2. เรียกใช้งาน Store

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    // 3. เรียกใช้ setToken ของ Store แทนการใช้ localStorage ตรงๆ
    // (ส่งทั้ง token และข้อมูล user ที่ได้จาก backend เข้าไปเก็บ)
    const token = response.data.token;
    const user = response.data.user || { email: email.value }; // ป้องกันไว้เผื่อ backend ไม่ได้ส่งก้อน user มา
    
    authStore.setToken(token, user);

    // 4. วิ่งไปหน้า dashboard
    router.push("/dashboard");

  } catch (error: any) {
    // 5. ปรับให้ดึง Error Message จาก Backend มาแสดง (ถ้ามี) จะได้ยืดหยุ่นขึ้น
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Invalid email or password";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Welcome Back</h1>

      <p>เข้าสู่ระบบเพื่อจัดการ Notes ของคุณ</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label> Email </label>

          <input v-model="email" type="email" placeholder="example@email.com" />
        </div>

        <div class="input-group">
          <label> Password </label>

          <input v-model="password" type="password" placeholder="••••••••" />
        </div>

        <button
  class="login-btn"
  :disabled="loading"
>

  {{
    loading
      ? "Loading..."
      : "Login"
  }}

</button>
<p
  v-if="errorMessage"
  class="error"
>
  {{ errorMessage }}
</p>
      </form>

      <div class="footer">
        <span> ยังไม่มีบัญชี ? </span>

        <router-link to="/register"> Register </router-link>
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

  padding: 40px;

  background: #fafafb;
}

.login-card {
  width: 100%;

  max-width: 420px;

  background: white;

  padding: 40px;

  border-radius: 20px;

  border: 1px solid #ececec;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 32px;

  margin-bottom: 10px;

  color: #111827;
}

p {
  color: #6b7280;

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
  font-weight: 500;

  font-size: 14px;

  color: #374151;
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

.login-btn {
  margin-top: 10px;

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

.login-btn:hover {
  background: #4338ca;
}

.footer {
  margin-top: 24px;

  text-align: center;

  color: #6b7280;
}

.footer a {
  margin-left: 6px;

  color: #4f46e5;

  font-weight: 600;

  text-decoration: none;
}
.login-btn:disabled {
  opacity: 0.7;

  cursor: not-allowed;
}
.error {
  margin-top: 14px;

  color: #dc2626;

  font-size: 14px;

  font-weight: 500;
}
</style>
