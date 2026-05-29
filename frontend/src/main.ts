import { createApp } from "vue";
import { createPinia } from "pinia"; // 1. นำเข้า Pinia
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia(); // 2. สร้าง instance ของ pinia

app.use(pinia);  // 🔥 สำคัญ: ต้อง use(pinia) ก่อน use(router)
app.use(router);

app.mount("#app");