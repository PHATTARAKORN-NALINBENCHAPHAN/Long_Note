<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const mockNotes = [
  {
    id: 1,

    title: "Docker Setup",

    category: "DevOps",

    content: "Learn Docker deployment",
  },

  {
    id: 2,

    title: "Vue Tips",

    category: "Frontend",

    content: "Useful Vue patterns",
  },

  {
    id: 3,

    title: "MySQL Guide",

    category: "Database",

    content: "MySQL basics",
  },
];

const note = mockNotes.find((item) => item.id === Number(route.params.id));

const title = ref(note?.title || "");

const category = ref(note?.category || "");

const content = ref(note?.content || "");

const handleUpdate = () => {
  if (!title.value || !category.value || !content.value) {
    alert("กรอกข้อมูลให้ครบ");

    return;
  }

  const updatedNote = {
    id: route.params.id,

    title: title.value,

    category: category.value,

    content: content.value,
  };

  console.log(updatedNote);

  router.push("/dashboard");
};
</script>

<template>
  <div class="container">
    <h1>Edit Note</h1>

    <p>แก้ไขข้อมูล Note</p>

    <form @submit.prevent="handleUpdate">
      <div class="group">
        <label> Title </label>

        <input v-model="title" />
      </div>

      <div class="group">
        <label> Category </label>

        <select v-model="category">
          <option>Frontend</option>

          <option>Backend</option>

          <option>Database</option>

          <option>DevOps</option>
        </select>
      </div>

      <div class="group">
        <label> Content </label>

        <textarea rows="10" v-model="content" />
      </div>

      <button>Update Note</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;

  margin: auto;

  padding: 48px 24px;
}

h1 {
  font-size: 34px;

  margin-bottom: 8px;
}

p {
  color: #6b7280;

  margin-bottom: 32px;
}

form {
  display: flex;

  flex-direction: column;

  gap: 24px;
}

.group {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

input,
select,
textarea {
  padding: 14px;

  border: 1px solid #e5e7eb;

  border-radius: 12px;

  font-family: inherit;

  font-size: 15px;

  outline: none;
}

textarea {
  resize: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #4f46e5;
}

button {
  width: fit-content;

  padding: 14px 20px;

  background: #4f46e5;

  color: white;

  border: none;

  border-radius: 12px;

  cursor: pointer;

  font-weight: 600;
}
</style>
