<script setup lang="ts">
import {
  ref,
  onMounted
} from "vue";

import {
  useRoute,
  useRouter
} from "vue-router";

import api from "../lib/api";

const route = useRoute();

const router = useRouter();

const title = ref("");

const category = ref("");

const content = ref("");

const fetchNote = async () => {

  try {

    const response =
      await api.get(
        `/notes/${route.params.id}`
      );

    const note =
      response.data;

    title.value =
      note.title;

    category.value =
      note.category;

    content.value =
      note.content;

  } catch (error) {

    console.log(error);

  }

};

const handleUpdate =
  async () => {

    if (
      !title.value ||
      !category.value ||
      !content.value
    ) {

      alert(
        "กรอกข้อมูลให้ครบ"
      );

      return;

    }

    try {

      await api.put(
        `/notes/${route.params.id}`,
        {
          title: title.value,
          category:
            category.value,
          content:
            content.value,
        }
      );

      router.push(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

    }

};

onMounted(() => {

  fetchNote();

});
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
