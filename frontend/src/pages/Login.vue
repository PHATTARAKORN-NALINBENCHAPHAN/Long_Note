<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log({
    email: email.value,
    password: password.value,
  });
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

        <button class="login-btn">Login</button>
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
</style>
