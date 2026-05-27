<script setup lang="ts">
import DashboardCard from "../components/DashboardCard.vue";

const notes = [
  {
    id: 1,

    title: "Docker Setup",

    category: "DevOps",
  },

  {
    id: 2,

    title: "Vue Tips",

    category: "Frontend",
  },

  {
    id: 3,

    title: "MySQL Guide",

    category: "Database",
  },
];
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <div>
        <h1>Dashboard</h1>

        <p>จัดการ Notes ของคุณ</p>
      </div>

      <button>+ Create Note</button>
    </div>

    <section>
      <h2>My Notes</h2>

      <div class="notes">
        <DashboardCard
          v-for="note in notes"
          :key="note.id"
          :title="note.title"
          :category="note.category"
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

  margin-bottom: 50px;
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

    gap: 20px;
  }
}
</style>
