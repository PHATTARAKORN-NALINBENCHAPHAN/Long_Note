<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  id: number;
  title: string;
  category: string;
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();

const openNote = () => {
  router.push(`/note/${props.id}`);
};

const goEdit = () => {
  router.push(`/edit/${props.id}`);
};

const handleDelete = () => {
  emit("delete", props.id);
};
</script>

<template>
  <div class="card dark-glass" @click="openNote">
    <div class="card-info">
      <h3>{{ title }}</h3>
      <span class="category-badge">{{ category }}</span>
    </div>

    <div class="actions">
      <button class="edit-btn" @click.stop="goEdit">Edit</button>
      <button class="delete-btn" @click.stop="handleDelete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* 🔥 ตอนเอาเมาส์วาง ให้กระจกสว่างขึ้น ขอบชัดขึ้น และมีออร่าม่วงฟุ้งเบาๆ */
.card:hover {
  background: var(--glass-bg-hover);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

/* 💠 ป้ายไฟหมวดหมู่โทนฟ้าสว่าง */
.category-badge {
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.15);
  padding: 4px 12px;
  border-radius: 999px;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* ม่วงโปร่งแสงเท่ๆ */
.edit-btn {
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
}

.edit-btn:hover {
  background: var(--primary);
  color: white;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
}

/* แดงโปร่งแสงเข้มๆ */
.delete-btn {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.delete-btn:hover {
  background: #dc2626;
  color: white;
  box-shadow: 0 0 12px rgba(220, 38, 38, 0.4);
}
</style>