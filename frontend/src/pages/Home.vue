<script setup lang="ts">
import NoteCard from "../components/NoteCard.vue";

const notes = [
  {
    id: 1,
    title: "Docker Setup",
    content: "Learn Docker for deployment",
    category: "DevOps",
  },

  {
    id: 2,
    title: "Vue Tips",
    content: "Useful Vue patterns",
    category: "Frontend",
  },

  {
    id: 3,
    title: "MySQL Guide",
    content: "Database basics",
    category: "Database",
  },
];
</script>

<template>
  <section class="hero">
    <h1>Your Ideas, Notes & Stories</h1>

    <p>Simple note and blogging platform</p>
  </section>

  <section class="notes">
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :title="note.title"
      :content="note.content"
      :category="note.category"
    />
  </section>
</template>

<style scoped>
.hero {
  text-align: center;

  padding: 80px 20px;
}

.hero h1 {
  font-size: 54px;

  margin-bottom: 16px;
}

.hero p {
  color: #666;
}

.notes {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  gap: 24px;

  padding: 40px;
}
</style>
