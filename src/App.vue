<template>
  <div id="app">
   
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
</style>
