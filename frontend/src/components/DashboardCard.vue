<script setup lang="ts">
defineProps<{
  title: string;

  category: string;
}>();
</script>

<template>
  <div class="card">
    <div>
      <h3>
        {{ title }}
      </h3>

      <p>
        {{ category }}
      </p>
    </div>

    <div class="actions">
      <button class="edit">Edit</button>

      <button class="delete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;

  padding: 24px;

  border: 1px solid #ececec;

  border-radius: 18px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  transition: 0.2s;
}

.card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

h3 {
  font-size: 18px;

  margin-bottom: 8px;
}

p {
  color: #6b7280;

  font-size: 14px;
}

.actions {
  display: flex;

  gap: 10px;
}

button {
  padding: 8px 14px;

  border: none;

  border-radius: 10px;

  font-weight: 500;

  cursor: pointer;
}

.edit {
  background: #eef2ff;

  color: #4f46e5;
}

.delete {
  background: #fee2e2;

  color: #dc2626;
}
</style>
