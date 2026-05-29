import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore"; 

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import About from "../pages/About.vue";
import CreateNote from "../pages/CreateNote.vue";
import NoteDetail from "../pages/NoteDetail.vue";
import EditNote from "../pages/EditNote.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  
  // หน้าสำหรับ Guest (คนยังไม่ได้ Login) ถ้า Login แล้วจะเข้าไม่ได้
  { path: "/login", component: Login, meta: { requiresGuest: true } },
  { path: "/register", component: Register, meta: { requiresGuest: true } },

  // หน้าที่ต้องล็อกไว้ (ต้อง Login เท่านั้น)
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/create", component: CreateNote, meta: { requiresAuth: true } },
  { path: "/note/:id", component: NoteDetail, meta: { requiresAuth: true } },
  { path: "/edit/:id", component: EditNote, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 ปรับปรุง Route Guard ใหม่ให้ปลอดภัยจากอาการ Pinia Initialize Error
router.beforeEach((to, _, next) => {
  // 🛠️ ย้ายการเรียกใช้ useAuthStore() มาอยู่ในฟังก์ชันนี้แทน 
  // เพื่อให้ทำงานหลังจาก Pinia ทำการสร้างระบบเสร็จสมบูรณ์ใน main.ts แล้ว
  const authStore = useAuthStore(); 

  // เช็คเงื่อนไขจาก meta ที่เราตั้งไว้ใน routes
  // (ตรวจสอบว่ามี token หรือเช็คจากสถานะ isAuthenticated ของ store คุณได้เลย)
  const isUserLoggedIn = !!authStore.token || authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isUserLoggedIn) {
    // ถ้าหน้านั้นต้อง Auth แต่ยังไม่ได้ Login -> ส่งไปหน้า Login
    next("/login");
  } else if (to.meta.requiresGuest && isUserLoggedIn) {
    // ถ้า Login แล้ว แต่จะพยายามเข้าหน้า Login/Register -> ส่งไปหน้า Dashboard
    next("/dashboard");
  } else {
    // นอกนั้นปล่อยผ่านปกติ
    next();
  }
});

export default router;