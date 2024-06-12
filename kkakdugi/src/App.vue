<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  export default {
    name: "App",
    components: { Header }
  }
</script>

<style>
#app {
  background-color: #fff0c7; /* Set main background color */
  display: flex;
  min-height: 100vh; 
  align-items: center;
  justify-content: center;
  display: block;
}



</style>