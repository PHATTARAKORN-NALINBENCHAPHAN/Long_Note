<script setup lang="ts">

import Navbar from "./components/Navbar.vue"

import { useRoute } from "vue-router"

const route = useRoute()

const hideNavbarPages = [

"/login",
"/register"

]

</script>

<template>

<Navbar
v-if="
!hideNavbarPages.includes(
route.path
)
"
/>

<router-view/>

</template>