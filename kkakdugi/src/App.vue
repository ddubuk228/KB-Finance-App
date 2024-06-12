<template>
  <div id="wrap">
    <Header />
    <div class="content-container" :class="{ 'dark-mode': userTheme }">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  export default {
    name: "App",
    components: { Header },
    data() {
      return {
        userTheme: localStorage.getItem('userTheme') === 'true'
      };
    },
};
</script>


<style>
#wrap {
  background-color: #fff0c7; /* Set main background color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh; 
}

.content-container {
  background-color: #ffffff; /* Card background color */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 20px;
  max-width: 500px; /* Max width for larger screens */
  margin-top: 20px;
}

.dark-mode {
  background-color: #333333; 
  color: #ffffff; 
}

</style>
