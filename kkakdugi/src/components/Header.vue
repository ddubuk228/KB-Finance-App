<template>
  <header>
    <h1><router-link to="/" style="text-decoration: none; color: black;">kkakdugi</router-link></h1>
    <select class="form-select form-select-lg mb-3" aria-label="Large select example" v-model="selectMonth">
      <option value=1>1</option>
      <option value=2>2</option>
      <option value=3>3</option>
      <option value=4>4</option>
      <option value=5>5</option>
      <option value=6>6</option>
      <option value=7>7</option>
      <option value=8>8</option>
      <option value=9>9</option>
      <option value=10>10</option>
      <option value=11>11</option>
      <option value=12>12</option>
    </select>
    <button class="settings-button" @click="openSettings">
      <i class="fas fa-cog"></i>
    </button>
  </header>
</template>

<script>
import { useEntriesStore } from "../store/entries";
import { computed, ref, onMounted } from "vue";

export default {
  methods: {
    openSettings() {
      // 설정 버튼 클릭 시 실행할 로직 구현
      console.log("Settings button clicked");
    }
  },
  setup() {
    const store = useEntriesStore();
    const currentMonth = new Date().getMonth() + 1; // getMonth()는 0-11을 반환하므로 +1
    const selectMonth = ref(currentMonth);

    onMounted(() => {
      store.selectMonth = currentMonth;
      store.setMonth(selectMonth);
    });

    const computedSelectMonth = computed({
      get() {
        return store.selectMonth;
      },
      set(value) {
        store.selectMonth = value;
        selectMonth.value = value;
      },
    });

    return {
      selectMonth: computedSelectMonth,
    };
  },
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

.form-select {
  padding: 5px;
  width: 100px;
  text-align: center;
  background-image: none;
}
</style>