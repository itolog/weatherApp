<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: relative;
  width: inherit;
  height: inherit;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eff1f3;
  width: inherit;
  height: inherit;
}
html, body{
  	position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
h1,h2,h3{
  color: #eff1f3;
  margin: 0;
}
a{
  text-decoration: none;
  display: block;
  cursor: pointer;
}
li{
  list-style: none;
}
</style>
