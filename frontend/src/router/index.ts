import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore"; // 1. นำเข้า authStore

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

// 🔒 ปรับปรุง Route Guard ใหม่
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore(); // 2. เรียกใช้ Store ข้างใน guard

  // เช็คเงื่อนไขจาก meta ที่เราตั้งไว้ใน routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // ถ้าหน้านั้นต้อง Auth แต่ยังไม่ได้ Login -> ส่งไปหน้า Login
    next("/login");
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // ถ้า Login แล้ว แต่จะพยายามเข้าหน้า Login/Register -> ส่งไปหน้า Dashboard
    next("/dashboard");
  } else {
    // นอกนั้นปล่อยผ่านปกติ
    next();
  }
});

export default router;