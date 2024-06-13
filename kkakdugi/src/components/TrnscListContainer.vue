<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center mb-4">
          <input type="date" v-model="selectedDate" class="form-control mb-2" />
        </h2>
        <div class="button">
            <button
              class="btn btn-warning mr-2"
              @click="selectedType = 'income'"
            >
            {{ t('income') }}
            </button>
            <button
             :class="{ 'btn': true, 'btn-Light': userTheme, 'btn-light': !userTheme }"
              class="btn btn-Light mr-2"
              @click="selectedType = 'expense'"
            >
            {{ t('expense') }}
            </button>

          <select v-model="selectedCategory" class="form-control mb-2">
            <option value="">{{ t('category') }}</option>
            <option value="식비">{{ t('food') }}</option>
            <option value="교통비">{{ t('transportation') }}</option>
            <option value="통신비">{{ t('communication') }}</option>
            <option value="기타">{{ t('etc') }}</option>
          </select>
        </div>
      </div>
    </div>
    <TrnscList />
    <div class="row mt-4">
      <div class="col-12 text-center">
        <router-link to="/" class="btn btn-secondary"
          >{{ t('mainPage') }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useEntriesStore } from "../store/entries";
import { computed, ref, onMounted } from "vue";
import TrnscList from "./TrnscList.vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/store/user';

export default {
  name: "TrnscListContainer",
  components: {
    TrnscList,
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
      editEntry,
      deleteEntry,
      userTheme: localStorage.getItem('userTheme') === 'false',
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
@font-face {
  font-family: "MangoDdobak-B";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2")
    format("woff2");
  font-weight: 700;
  font-style: normal;
}

button {
    width:70px;
    margin-left: 10px;
}
select {
    width :120px;
    margin-left: 10px;;
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

</style>
