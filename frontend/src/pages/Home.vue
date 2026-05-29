<script setup lang="ts">
import NoteCard from "../components/NoteCard.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../lib/api";
import { useNotificationStore } from "../stores/notificationStore"; // 1. นำเข้า notificationStore

const router = useRouter();
const notificationStore = useNotificationStore(); // 2. เรียกใช้งาน Store

const search = ref("");
const notes = ref<any[]>([]);
const loading = ref(false); // เพิ่มสถานะ Loading เผื่อเล่น UI เพิ่มเติมได้

const fetchNotes = async () => {
  try {
    loading.value = true;
    const response = await api.get("/notes");
    
    // ดึง Array ข้อมูลจาก response.data.data ตามโครงสร้างที่ Backend ส่งมา
    notes.value = response.data.data || [];
  } catch (error) {
    console.log(error);
    // ❌ แจ้งเตือนเมื่อไม่สามารถดึงข้อมูลได้
    notificationStore.showNotification("เกิดข้อผิดพลาดในการโหลดข้อมูลโน้ต กรุณาลองใหม่อีกครั้ง", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNotes();
});

const openNote = (id: number) => {
  router.push(`/note/${id}`);
};

const filteredNotes = computed(() => {
  if (!search.value.trim()) {
    return notes.value;
  }

  const keyword = search.value.toLowerCase();

  return notes.value.filter((note) => {
    // 🛠️ ใส่ ?. และ || "" เพื่อดักบั๊กกรณีข้อมูลในฐานข้อมูลบางคอลัมน์เป็นค่าว่าง (null/undefined)
    const title = note?.title?.toLowerCase() || "";
    const content = note?.content?.toLowerCase() || "";
    const category = note?.category?.toLowerCase() || "";

    return (
      title.includes(keyword) ||
      content.includes(keyword) ||
      category.includes(keyword)
    );
  });
});
</script>

<template>

<section class="hero">

<h1>

Your Ideas,
Notes & Stories

</h1>

<p>

Simple note and
blogging platform

</p>

</section>

<section
class="search-section"
>

<SearchBar

v-model="search"

placeholder="
Search articles...
"

/>

</section>

<section class="notes">

<NoteCard

v-for="
note
in filteredNotes
"

:key="
note.id
"

:title="
note.title
"

:content="
note.content
"

:category="
note.category
"

@click="
openNote(note.id)
"

/>

</section>

</template>

<style scoped>

.hero{

text-align:center;

padding:80px 20px;

}

.hero h1{

font-size:54px;

margin-bottom:16px;

}

.hero p{

color:#666;

}

.search-section{

max-width:700px;

margin:

0 auto 40px;

padding:

0 20px;

}

.notes{

display:grid;

grid-template-columns:

repeat(
auto-fit,
minmax(
280px,
1fr
)

);

gap:24px;

padding:0 40px 40px;

}

@media(
max-width:768px
){

.hero h1{

font-size:40px;

}

.notes{

padding:

0 20px 40px;

}

}

</style>