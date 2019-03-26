<template>
  <div id="app">
    <SideNav/>
    <router-view></router-view>
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue'

export default {
  name: 'app',
  components: {
    SideNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #262F36;
  display: flex;
  height:100vh;
}
.popover {
  max-width: 100%;
}
</style>
