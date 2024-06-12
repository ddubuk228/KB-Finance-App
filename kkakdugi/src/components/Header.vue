<template>
  <header>
    <h1><router-link to="/" style="text-decoration: none; color: black;">kkakdugi</router-link></h1>
    <div id="calendar" class="calendar">
      <div class="dropdown">
        <div class="dropdown-selected" @click="toggleDropdown">{{ months[selectMonth - 1] }}월</div>
        <div class="dropdown-options" v-if="dropdownOpen">
          <div class="dropdown-option" v-for="(month, index) in months" :key="index"
            @click.stop="selectOption(index + 1)">
            {{ month }}월
          </div>
        </div>
      </div>
    </div>
    <button class="settings-button" @click="openSettings">
      <i class="fas fa-cog"></i>
    </button>
  </header>
</template>

<script>
import { useEntriesStore } from "../store/entries"; // Store import
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const store = useEntriesStore(); // Store instance
    const currentMonth = new Date().getMonth() + 1; // Get current month
    const selectMonth = ref(currentMonth); // Reactive variable for selected month
    const dropdownOpen = ref(false); // Reactive variable for dropdown state
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    // Toggle dropdown visibility
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Select a month and close dropdown
    const selectOption = (month) => {
      selectMonth.value = month;
      dropdownOpen.value = false;
    };

    // Watch for changes in selected month and update the store
    watch(selectMonth, (newMonth) => {
      store.setMonth(newMonth);
    });

    // Initialize selected month in the store
    onMounted(() => {
      store.setMonth(currentMonth);
    });

    // Method for handling settings button click
    const openSettings = () => {
      console.log("Settings button clicked");
    };

    return {
      selectMonth,
      dropdownOpen,
      months,
      toggleDropdown,
      selectOption,
      openSettings
    };
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

.calendar {
  border-radius: 10px;
  /* overflow: hidden;  Removed this line */
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100px;
}

.dropdown-selected {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #fff;
  text-align: center;
  border-radius: 10px;
}

.dropdown-options {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  border: 1px solid #ccc;
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 1000;
  border-radius: 10px;
  background-color: #fff;
  /* Set background color */
}

.dropdown-option {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  background-color: #fff;
  /* Set background color */
  padding: 5px 10px;
}

.dropdown-option:hover {
  background-color: #f1f1f1;
}
</style>
