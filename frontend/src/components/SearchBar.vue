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
      :placeholder="placeholder || 'Search...'"
    />
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-input {
  width: 100%;

  padding: 14px 18px;

  border: 1px solid #e5e7eb;

  border-radius: 12px;

  font-size: 15px;

  outline: none;

  background: white;

  transition: 0.2s;

  box-sizing: border-box;
}

.search-input:focus {
  border-color: #4f46e5;

  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
}

.search-input::placeholder {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .search-input {
    padding: 12px 16px;

    font-size: 14px;
  }
}
</style>
