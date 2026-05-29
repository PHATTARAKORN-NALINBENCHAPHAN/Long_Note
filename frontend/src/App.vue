<script setup lang="ts">
import Navbar from "./components/Navbar.vue";

import { useRoute } from "vue-router";
import Toast from "./components/Toast.vue";

const route = useRoute();

const hideNavbarPages = ["/login", "/register"];
</script>

<template>
  <Toast />
  <Navbar v-if="!hideNavbarPages.includes(route.path)" />

  <router-view />
</template>
