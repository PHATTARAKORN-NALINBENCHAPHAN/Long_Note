<script setup lang="ts">
import { ref } from "vue";

import {
  useRouter
} from "vue-router";

import api from "../lib/api";

const router = useRouter();

const username = ref("");

const email = ref("");

const password = ref("");

const confirmPassword =
  ref("");

const error = ref("");

const loading =
  ref(false);

const handleRegister =
  async () => {

    error.value = "";

    if (
      password.value !==
      confirmPassword.value
    ) {

      error.value =
        "Password ไม่ตรงกัน";

      return;

    }

    try {

      loading.value = true;

      await api.post(
        "/auth/register",
        {
          username:
            username.value,
          email:
            email.value,
          password:
            password.value,
        }
      );

      router.push(
        "/login"
      );

    } catch (err: any) {

      error.value =
        err.response?.data
          ?.message
        ||
        "Register failed";

    } finally {

      loading.value =
        false;

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

          <input v-model="username" type="text" placeholder="your username" />
        </div>

        <div class="input-group">
          <label> Email </label>

          <input v-model="email" type="email" placeholder="example@email.com" />
        </div>

        <div class="input-group">
          <label> Password </label>

          <input v-model="password" type="password" placeholder="••••••••" />
        </div>

        <div class="input-group">
          <label> Confirm Password </label>

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <button class="register-btn">Create Account</button>
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
