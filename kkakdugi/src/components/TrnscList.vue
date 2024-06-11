<template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center mb-4">
            <input type="date" v-model="selectedDate" class="form-control mb-2" />
          </h2>
          <div class="button">
            <button class="btn btn-warning mr-2" @click="selectedType = 'income'">
              수입
            </button>
            <button class="btn btn-Light mr-2" @click="selectedType = 'expense'">
              지출
            </button>
  
            <select v-model="selectedCategory" class="form-control mb-2">
              <option value="">모든 카테고리</option>
              <option value="식비">식비</option>
              <option value="교통비">교통비</option>
              <option value="통신비">통신비</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div v-for="(entry, index) in paginatedEntries" :key="index">
            <div class="transaction-item">
              <TrnscListItem
                :entry="entry"
                @edit-entry="editEntry"
                @delete-entry="deleteEntry"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center mt-4">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="prevPage">이전</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="nextPage">다음</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import { useEntriesStore } from "../store/entries";
  import { computed, ref } from "vue";
  import TrnscListItem from "./TrnscListItem.vue";
  
  export default {
    name: "TrnscList",
    components: {
      TrnscListItem,
    },
    setup() {
      const store = useEntriesStore();
  
      const selectedDate = computed({
        get: () => store.selectedDate,
        set: (value) => store.setSelectedDate(value),
      });
  
      const selectedType = computed({
        get: () => store.selectedType,
        set: (value) => store.setSelectedType(value),
      });
  
      const selectedCategory = computed({
        get: () => store.selectedCategory,
        set: (value) => store.setSelectedCategory(value),
      });
  
      const filteredEntries = computed(() => store.filteredEntries);
  
      // Pagination
      const itemsPerPage = 5;
      const currentPage = ref(1);
  
      const totalEntries = computed(() => filteredEntries.value.length);
      const totalPages = computed(() => Math.ceil(totalEntries.value / itemsPerPage));
      const paginatedEntries = computed(() => {
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = currentPage.value * itemsPerPage;
        return filteredEntries.value.slice(startIndex, endIndex);
      });
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
  
      const goToPage = (page) => {
        currentPage.value = page;
      };
  
      const editEntry = (id) => {
        console.log("Edit entry", id);
      };
  
      const deleteEntry = async (id) => {
        await store.deleteEntry(id);
      };
  
      store.fetchEntries();
  
      return {
        selectedDate,
        selectedType,
        selectedCategory,
        filteredEntries,
        paginatedEntries,
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        goToPage,
        editEntry,
        deleteEntry,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
    font-family: "MangoDdobak-B";
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .button {
    display: flex;
  }
  
  button {
    width: 70px;
    margin-left: 10px;
  }
  
  select {
    width: 120px;
    margin-left: 10px;
  }
  
  h2 {
    width: 300px;
  }
  
  .transaction-item {
    margin-top: 20px;
    font-family: "MangoDdobak-B";
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pagnation {
    color :  rgb(243, 208, 91);
  }
  .page-link {
    color : black;
    background-color: rgb(243, 208, 91);
    border: rgb(243, 208, 91);
  }
  </style>
  