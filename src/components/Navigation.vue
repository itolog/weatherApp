<template>
  <!-- Menu -->
  <nav class="nav">
    <ul class="nav__ul">
      <li class="nav__li">
        <router-link class="nav__href" exact to="/" active-class="active">Главная</router-link>
      </li>
      <li class="nav__li">
        <router-link class="nav__href" to="/fivedays" active-class="active">Погода на 7 дней.</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "app-nav"
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  display: flex;
  z-index: 2;
  width: 100%;
  height: 70px;
  background: #282c34;
}
.nav__ul {
  display: flex;
  width: 100%;
  height: 100%;
}
.nav__li {
  flex: 1;
  &:hover {
    background: #000;
    transition: 1s;
  }
  a {
    color: #61dafb;
    line-height: 50px;
  }
}
.active {
  border-top: 5px solid red;
}
</style>
