<template>
    <header>
      <h1>kkakdugi</h1>
      <button class="settings-button" @click="openSettings">
        <i class="fas fa-cog"></i>
      </button>
    </header>
  </template>
  
  <script>
  export default {
    methods: {
      openSettings() {
        // Implement your logic to open settings here
        console.log("Settings button clicked");
      }
    }
  };
  </script>
  
  <style scoped>
  header {
    background-color: #ffd780;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .settings-button {
    background: none;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    outline: none;
  }
  
  .settings-button:hover {
    opacity: 0.8;
  }
  </style>
  