<script setup lang="ts">

defineProps<{

title:string

category:string

}>()

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

<button
class="edit"
>

Edit

</button>

<button
class="delete"
>

Delete

</button>

</div>

</div>

</template>

<style scoped>

.card{

background:white;

padding:24px;

border:

1px solid #ECECEC;

border-radius:18px;

display:flex;

justify-content:space-between;

align-items:center;

transition:.2s;

}

.card:hover{

box-shadow:

0 8px 20px
rgba(0,0,0,.05);

}

h3{

font-size:18px;

margin-bottom:8px;

}

p{

color:#6B7280;

font-size:14px;

}

.actions{

display:flex;

gap:10px;

}

button{

padding:8px 14px;

border:none;

border-radius:10px;

font-weight:500;

cursor:pointer;

}

.edit{

background:#EEF2FF;

color:#4F46E5;

}

.delete{

background:#FEE2E2;

color:#DC2626;

}

</style>