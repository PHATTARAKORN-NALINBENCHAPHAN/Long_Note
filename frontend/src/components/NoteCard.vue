<script setup lang="ts">
defineProps<{
  title: string;

  content: string;

  category: string;
}>();
</script>

<template>
  <div class="card">
    <div class="badge">
      {{ category }}
    </div>

    <h3>
      {{ title }}
    </h3>

    <p>
      {{ content }}
    </p>
  </div>
</template>

<style scoped>
.card {
  padding: 20px;

  border: 1px solid #eee;

  border-radius: 16px;

  background: white;

  cursor: pointer;

  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.badge {
  display: inline-block;

  padding: 6px 10px;

  background: #f4f4f5;

  border-radius: 999px;

  font-size: 12px;

  margin-bottom: 12px;
}

p {
  color: #666;

  margin-top: 10px;
}
</style>
