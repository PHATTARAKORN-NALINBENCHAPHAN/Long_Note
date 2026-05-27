import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import About from "../pages/About.vue";
import CreateNote from "../pages/CreateNote.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/login",
    component: Login,
  },

  {
    path: "/register",
    component: Register,
  },

  {
    path: "/dashboard",
    component: Dashboard,
  },

  {
    path: "/about",
    component: About,
  },
  {
    path: "/create",

    component: CreateNote,
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
