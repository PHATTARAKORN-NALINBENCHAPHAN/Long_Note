<template>
  <nav class="navbar">

    <div class="logo">
      NoteSpace
    </div>

    <div class="menu">

      <button>Login</button>

      <button>Register</button>

      <button>About</button>

      <button>Dashboard</button>

    </div>

  </nav>
</template>

<style scoped>

.navbar{

display:flex;

justify-content:space-between;

align-items:center;

padding:18px 40px;

border-bottom:1px solid #eee;

background:white;

}

.logo{

font-size:22px;

font-weight:700;

cursor:pointer;

}

.menu{

display:flex;

gap:14px;

}

button{

background:none;

border:none;

padding:10px 14px;

border-radius:8px;

cursor:pointer;

font-size:14px;

}

button:hover{

background:#f5f5f5;

}

</style>