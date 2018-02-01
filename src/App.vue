<template>
  <div id="app">
    <!-- Menu -->
    <nav class="nav">
      <ul class="nav__ul">
        <li class="nav__li">
          <router-link class="nav__href" exact to="/" active-class="active">Главная</router-link>
        </li>
        <li class="nav__li">
          <router-link class="nav__href" to="/fivedays" active-class="active">Погода на 5 дней.</router-link>
        </li>
      </ul>
    </nav>
    <!-- Main content -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  position: relative;
  width: inherit;
  height: inherit;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: inherit;
  // height: inherit;
}
html, body{
  	position: relative;
    box-sizing: border-box;
    width: 100%;
    // height: 100%;
}
h1,h2,h3{
  color: #eff1f3;
  margin: 0;
}
ul{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  display: block;
  height: 100%;
  cursor: pointer;
}
li{
  list-style: none;
}
// table style
table{
  font-size: 1.3em;
  table-layout: fixed;
   tr{
    display: flex;
    flex-flow: wrap;
    border-bottom: 1px solid grey;
    td{
      flex: 1;
      padding: 0.5em;
    }
   }
}
/* menu*/
.nav{
  position: relative;
  display: flex;
  z-index: 2;
  width: 100%;
  height: 70px;
  background: #282C34;
}
.nav__ul{
  display: flex;
  width: 100%;
  height: 100%;
}
.nav__li{
  flex: 1;
  a{
    color: #61DAFB;
    line-height: 50px;
  }
}
.active{
  border-top: 5px solid red;
}
</style>
