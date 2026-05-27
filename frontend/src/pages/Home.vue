<script setup lang="ts">
import NoteCard from "../components/NoteCard.vue";
import SearchBar from "../components/SearchBar.vue";

import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();

const search = ref("");

const openNote = (id:number) => {
  router.push(`/note/${id}`);
};

const notes = [
  {
    id:1,
    title:"Docker Setup",
    content:"Learn Docker for deployment",
    category:"DevOps",
  },

  {
    id:2,
    title:"Vue Tips",
    content:"Useful Vue patterns",
    category:"Frontend",
  },

  {
    id:3,
    title:"MySQL Guide",
    content:"Database basics",
    category:"Database",
  },
];

const filteredNotes = computed(()=>{

  if(!search.value.trim()){

    return notes;

  }

  const keyword =
    search.value.toLowerCase();

  return notes.filter(note=>{

    return(

      note.title
      .toLowerCase()
      .includes(keyword)

      ||

      note.content
      .toLowerCase()
      .includes(keyword)

      ||

      note.category
      .toLowerCase()
      .includes(keyword)

    );

  });

});
</script>

<template>

<section class="hero">

<h1>

Your Ideas,
Notes & Stories

</h1>

<p>

Simple note and
blogging platform

</p>

</section>

<section
class="search-section"
>

<SearchBar

v-model="search"

placeholder="
Search articles...
"

/>

</section>

<section class="notes">

<NoteCard

v-for="
note
in filteredNotes
"

:key="
note.id
"

:title="
note.title
"

:content="
note.content
"

:category="
note.category
"

@click="
openNote(note.id)
"

/>

</section>

</template>

<style scoped>

.hero{

text-align:center;

padding:80px 20px;

}

.hero h1{

font-size:54px;

margin-bottom:16px;

}

.hero p{

color:#666;

}

.search-section{

max-width:700px;

margin:

0 auto 40px;

padding:

0 20px;

}

.notes{

display:grid;

grid-template-columns:

repeat(
auto-fit,
minmax(
280px,
1fr
)

);

gap:24px;

padding:0 40px 40px;

}

@media(
max-width:768px
){

.hero h1{

font-size:40px;

}

.notes{

padding:

0 20px 40px;

}

}

</style>