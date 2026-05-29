import './style.css' // 👈 เพิ่มบรรทัดนี้เข้าไปที่บนสุดของไฟล์
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')