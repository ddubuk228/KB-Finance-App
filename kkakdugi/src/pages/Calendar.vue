<template>
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
  }
}
</script>

<style scoped>
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
  cursor: pointer;
  background-color: #fff;
  text-align: center;
  border-radius: 0.375rem;
  background-color: rgb(255, 232, 157);
  font-family: "MangoDdobak-B";
}

.dropdown-options {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  border: 1px solid #ccc;
  position: absolute;
  width: 185px;
  background-color: white;
  z-index: 1000;
  border-radius: 0.375rem;
  background-color: #fff;
  /* Set background color */
  padding: 1px;
  font-family: "MangoDdobak-B";
  left: -40px;
  margin-top: 1px;
}

.dropdown-option {
  padding: 10px;
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