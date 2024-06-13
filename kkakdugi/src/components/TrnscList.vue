<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-for="(entry, index) in paginatedEntries" :key="index">
          <div class="transaction-item">
            <TrnscListItem :entry="entry" @edit-entry="editEntry" @delete-entry="deleteEntry" />
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center mt-4">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <button class="page-link" @click="prevPage">{{ t('previous') }}</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <button class="page-link" @click="nextPage">{{ t('next') }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useEntriesStore } from "../store/entries";
import { computed, ref, onMounted } from "vue";
import TrnscListItem from "./TrnscListItem.vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/store/user';

export default {
  name: "TrnscList",
  components: {
    TrnscListItem,
  },
  setup() {
    const store = useEntriesStore();
    const { t, locale } = useI18n();
    const userInfo = ref({ language: 'ko' });
    const userStore = useUserStore();

    const fetchUserData = async () => {
      try {
        const user = await userStore.fetchUser();
        if (user) {
          userInfo.value = { ...user };
        }
      } catch (error) {
        console.error('데이터를 가져오는 도중 에러 발생:', error);
      }
    };
    onMounted(() => {
      fetchUserData();
      userInfo.value.language = localStorage.getItem('userLanguage') === 'true';
      locale.value = userInfo.value.language ? 'en' : 'ko';
    });


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
      t,
      locale,
      userInfo,
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
  color: rgb(243, 208, 91);
}

.page-link {
  color: black;
  background-color: rgb(243, 208, 91);
  border: rgb(243, 208, 91);
  width: 60px;
}
</style>
