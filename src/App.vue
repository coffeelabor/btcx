<template>
  <div id="app">
    <SideNav v-bind:viewType="Views" @update="setActiveView"/>
    <Block   v-bind:viewType="Views" v-bind:activeView="ActiveView" />
  </div>
</template>

<script>
import Block from './components/Block.vue'
import SideNav from './components/SideNav.vue'

export default {
  name: 'app',
  components: {
    Block,
    SideNav
  },
  data: function() {
    return {
      Views: Object.freeze({
            "Pretty": 1,
            "JSON": 2,
            "Hex": 3
      }),
      ActiveView: 1
    }
  },
  methods: {
    setActiveView(view) {
      this.ActiveView = view;
    }
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
