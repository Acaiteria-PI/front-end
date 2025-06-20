<script setup></script>

<template>
  <header>
    <nav>
      <div class="nav-left">
        <img class="logo" src="/src/assets/img/logo.png" alt="" />
      </div>

      <ul class="nav-menu">
        <li class="nav-item">Início</li>
        <li class="nav-item">Menu de gerenciamento</li>
        <li class="nav-item">Cardápio</li>
      </ul>

      <div class="nav-right">
        <i class="fas fa-shopping-bag"></i>
        <RouterLink to="/Login"><button class="btn-login">LOGIN</button></RouterLink>

      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffbf4;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 80px;
  padding: 0 50px;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 64;
  height: 55px;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  gap: 30px;
  list-style: none;
  justify-content: center;
}

.nav-item {
  height: 19px;
  cursor: pointer;
  position: relative;
  transition: color 0.5s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%) scaleY(0);
  transform-origin: bottom;
  height: 1.5px;
  width: 100%;
  background-color: black;
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.3s ease;
}

.nav-item:hover::after {
  transform: translateX(-50%) scaleY(1);
  opacity: 1;
}

.btn-login {
  background-color: #682c48;
  color: #fff;
  border: none;
  width: 103px;
  height: 40px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-login:hover {
  background-color: #a3024d;
}

.fas.fa-shopping-bag {
  font-size: 20px;
  cursor: pointer;
}
</style>
