<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/couchboat.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Couchboat Menu</h1>
    </div>
  </div>
  <div class="content">
    <button>
      <router-link to="/">Home</router-link>
    </button>
    <button>
      <router-link to="/addRecipe">Add a recipe!</router-link>
    </button>
    <button>
      <router-link to="/edit">Edit/Delete a recipe!</router-link>
    </button>
    <router-view />
  </div>
  <div class="footer">
    <br>
    <a href="https://github.com/BYUCS260/museum-searleja.git">Github Repo</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

img {
  max-height: 100px;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #f7cb08;
  color: #f8f7f6;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
