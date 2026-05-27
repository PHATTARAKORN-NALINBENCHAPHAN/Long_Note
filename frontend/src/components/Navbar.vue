<template>

<nav class="navbar">

  <router-link
    to="/"
    class="logo"
  >

    NoteSpace

  </router-link>

  <div class="nav-center">

    <router-link to="/">
      Home
    </router-link>

    <router-link to="/about">
      About
    </router-link>

    <router-link to="/dashboard">
      Dashboard
    </router-link>

  </div>

  <div class="nav-right">

    <router-link
      to="/login"
      class="login-btn"
    >

      Login

    </router-link>

    <router-link
      to="/register"
      class="register-btn"
    >

      Register

    </router-link>

  </div>

</nav>

</template>

<style scoped>

.navbar{

display:flex;

justify-content:space-between;

align-items:center;

padding:18px 48px;

background:white;

border-bottom:

1px solid #ECECEC;

position:sticky;

top:0;

z-index:100;

}

.logo{

font-size:24px;

font-weight:700;

text-decoration:none;

color:#4F46E5;

letter-spacing:-0.5px;

}

.nav-center{

display:flex;

gap:32px;

}

.nav-center a{

text-decoration:none;

color:#52525B;

font-size:15px;

font-weight:500;

padding:8px 0;

position:relative;

transition:.2s;

}

.nav-center a:hover{

color:#4F46E5;

}

.nav-center a::after{

content:"";

position:absolute;

left:0;

bottom:-2px;

width:0;

height:2px;

background:#4F46E5;

transition:.25s;

}

.nav-center a:hover::after{

width:100%;

}

.nav-right{

display:flex;

gap:12px;

}

.login-btn{

padding:10px 18px;

border:

1px solid #E4E4E7;

border-radius:999px;

text-decoration:none;

color:#111827;

font-weight:500;

transition:.2s;

}

.login-btn:hover{

background:#F4F4F5;

}

.register-btn{

padding:10px 18px;

background:#4F46E5;

color:white;

border-radius:999px;

text-decoration:none;

font-weight:500;

transition:.25s;

box-shadow:

0 4px 14px
rgba(79,70,229,.25);

}

.register-btn:hover{

background:#4338CA;

transform:

translateY(-2px);

}

@media(max-width:768px){

.navbar{

padding:16px 24px;

}

.nav-center{

gap:16px;

}

.logo{

font-size:20px;

}

.login-btn,
.register-btn{

padding:8px 14px;

}

}

</style>