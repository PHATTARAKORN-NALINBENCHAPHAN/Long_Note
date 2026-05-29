<script setup lang="ts">
import DashboardCard from "../components/DashboardCard.vue";
import SearchBar from "../components/SearchBar.vue";

import {
  ref,
  computed,
  onMounted
} from "vue";

import api from "../lib/api";

const notes = ref<any[]>([]);

const search = ref("");

const fetchNotes = async () => {
  try {
    // ✅ เปลี่ยนเป็นเส้นสำหรับดึงเฉพาะโน้ตของฉัน (Dashboard ส่วนตัว)
    const response = await api.get("/notes/me"); 

    notes.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {

  fetchNotes();

});

const filteredNotes = computed(() => {

  if (!search.value.trim()) {

    return notes.value;

  }

  const keyword =
    search.value.toLowerCase();

  return notes.value.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(keyword)
      ||
      note.category
        .toLowerCase()
        .includes(keyword)
  );

});

const deleteNote = async (
  id: number
) => {

  try {

    await api.delete(
      `/notes/${id}`
    );

    notes.value =
      notes.value.filter(
        (note) =>
          note.id !== id
      );

  } catch (error) {

    console.log(error);

  }

};
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <div>
        <h1>Dashboard</h1>

        <p>จัดการ Notes ของคุณ</p>
      </div>

      <router-link to="/create">
        <button>+ Create Note</button>
      </router-link>
    </div>

    <div class="search-section">
      <SearchBar
        v-model="search"
        placeholder="
Search notes...
"
      />
    </div>

    <section>
      <h2>My Notes</h2>

      <div class="notes">
        <DashboardCard
          v-for="note in filteredNotes"
          :key="note.id"
          :id="note.id"
          :title="note.title"
          :category="note.category"
          @delete="deleteNote"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1100px;

  margin: auto;

  padding: 40px;
}

.header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 28px;

  gap: 20px;
}

.search-section {
  margin-bottom: 36px;
}

h1 {
  font-size: 40px;

  margin-bottom: 8px;
}

p {
  color: #6b7280;
}

button {
  padding: 14px 20px;

  background: #4f46e5;

  color: white;

  border: none;

  border-radius: 12px;

  font-size: 15px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  white-space: nowrap;
}

button:hover {
  background: #4338ca;
}

h2 {
  margin-bottom: 24px;
}

.notes {
  display: flex;

  flex-direction: column;

  gap: 18px;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 24px;
  }

  .header {
    flex-direction: column;

    align-items: flex-start;
  }

  .header a {
    width: 100%;
  }

  button {
    width: 100%;
  }

  h1 {
    font-size: 34px;
  }
}
</style>
