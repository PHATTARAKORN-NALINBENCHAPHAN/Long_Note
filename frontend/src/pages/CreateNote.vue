<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const title = ref("");
const category = ref("");
const content = ref("");

const handleSubmit = () => {
  if (!title.value || !category.value || !content.value) {
    alert("กรุณากรอกข้อมูลให้ครบ");

    return;
  }

  const note = {
    title: title.value,

    category: category.value,

    content: content.value,

    createdAt: new Date(),
  };

  console.log(note);

  router.push("/dashboard");
};
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Create Note</h1>

      <p>สร้างบทความหรือบันทึกใหม่</p>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="group">
        <label> Title </label>

        <input
          v-model="title"
          placeholder="
เขียนหัวข้อโน้ต
"
        />
      </div>

      <div class="group">
        <label> Category </label>

        <select v-model="category">
          <option disabled value="">เลือกหมวดหมู่</option>

          <option>Frontend</option>

          <option>Backend</option>

          <option>Database</option>

          <option>DevOps</option>

          <option>Programming</option>
        </select>
      </div>

      <div class="group">
        <label> Content </label>

        <textarea
          v-model="content"
          placeholder="
เริ่มเขียนโน้ตของคุณ...
"
          rows="12"
        />
      </div>

      <button>Save Note</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;

  margin: auto;

  padding: 48px 24px;
}

.header {
  margin-bottom: 40px;
}

h1 {
  font-size: 36px;

  margin-bottom: 8px;
}

p {
  color: #6b7280;
}

.form {
  display: flex;

  flex-direction: column;

  gap: 28px;
}

.group {
  display: flex;

  flex-direction: column;

  gap: 10px;
}

label {
  font-size: 14px;

  font-weight: 600;
}

input,
select,
textarea {
  padding: 14px;

  border: 1px solid #e5e7eb;

  border-radius: 12px;

  font-size: 15px;

  font-family: inherit;

  outline: none;

  transition: 0.2s;

  background: white;
}

textarea {
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4f46e5;

  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.08);
}

button {
  width: fit-content;

  padding: 14px 22px;

  background: #4f46e5;

  color: white;

  border: none;

  border-radius: 12px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

button:hover {
  background: #4338ca;
}
</style>
