<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="search-container">
    <input
      class="search-input"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder || 'Search notes...'"
    />
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 14px 20px;
  
  /* 💎 เสกให้ช่อง Input เป็นเนื้อกระจกแก้วรมควันโปร่งแสง */
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  
  /* 💬 เซ็ตสีตัวหนังสือของดาร์กโทน */
  color: var(--text-main);
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

/* ⚡️ ตอนเอาเมาส์มาวาง (Hover) ให้เนื้อกระจกตื่นตัวขึ้นจืด ๆ */
.search-input:hover {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
}

/* 🔥 ไฮไลต์เด็ด: ตอนคลิกพิมพ์ (Focus) ให้กระจกสว่างวาบและขอบเรืองแสงม่วงนีออนฟุ้ง */
.search-input:focus {
  background: rgba(15, 23, 42, 0.8);
  border-color: var(--primary);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
}

/* 🎨 สีตัวหนังสือจาง ๆ ตอนยังไม่ได้พิมพ์ (Placeholder) */
.search-input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .search-input {
    padding: 12px 16px;
    font-size: 14px;
  }
}
</style>