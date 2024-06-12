<template>
  <header>
    <router-link to="/" style="text-decoration: none; ">
      <h1>KD</h1>
    </router-link>

    <div class="menu"><router-link to="/trnsc">거래 내역</router-link></div>

    <button class="settings-button" @click="openSettings">
      <router-link to="/profile" style="text-decoration: none; color: black; /"><i class="fas fa-cog"></i></router-link>
    </button>
  </header>
</template>

<script>
export default {
  setup() {

  },
};
</script>

<style scoped>
header {
  background-color: #ffd780;
  color: #000;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  border-radius: 5px;
  position: fixed;
  top: 0;
  z-index: 10;
  height: 80px;
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

h1 {
  color: #474745;
  margin: 0;
}

a {
  text-decoration: none;
  color: black;
  font-family: "MangoDdobak-B";
}

.menu a {
  font-size: 20px;
}
</style>
