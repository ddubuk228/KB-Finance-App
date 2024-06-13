<template>
  <div class="wrap">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title mb-0">{{ t('addTransaction') }}</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="date">{{ t('date') }}</label>
            <input type="date" class="form-control" id="date" v-model="newEntry.date" required />
          </div>
          <div class="form-group">
            <label for="type">{{ t('category') }}</label>
            <div class="d-flex">
              <select class="form-control mr-2" id="category" v-model="newEntry.category" required>
                <option value="식비">{{ t('food') }}</option>
                <option value="교통비">{{ t('transportation') }}</option>
                <option value="통신비">{{ t('communication') }}</option>
                <option value="기타">{{ t('etc') }}</option>
              </select>
              <button
                type="button"
                class="btn"
                :class="{'btn-warning': newEntry.type === 'income', 'btn-outline-warning': newEntry.type !== 'income'}"
                @click="newEntry.type = 'income'"
              >
              {{ t('income') }}
              </button>
              <button
                type="button"
                class="btn"
                :class="{'btn-warning': newEntry.type === 'expense', 'btn-outline-warning': newEntry.type !== 'expense'}"
                @click="newEntry.type = 'expense'"
              >
              {{ t('expense') }}
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="description">{{ t('history') }}</label>
            <input type="text" class="form-control" id="description" v-model="newEntry.account"
              placeholder="거래내역을 입력하세요" required />
          </div>
          <div class="form-group">
            <label for="amount">{{ t('amount') }}</label>
            <input type="number" class="form-control" id="amount" v-model="newEntry.amount" placeholder="금액을 입력하세요"
              required />
          </div>
          <div class="form-group">
            <label for="memo">{{ t('memo') }}</label>
            <input type="text" class="form-control" id="memo" v-model="newEntry.memo" placeholder="메모를 입력하세요" />
          </div>
          <br />
          <div class="button-group">
            <button type="submit" class="btn btn-outline-warning">{{ t('registration') }}</button>
            <button type="button" class="btn btn-outline-warning" @click="submitForm">{{ t('edit') }}</button>
            <button type="button" class="btn btn-outline-warning" @click="cancelEntry">{{ t('cancle') }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useEntriesStore } from "../store/entries";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const { t, locale } = useI18n();
    const userInfo = ref({ language: 'ko' });

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

    return { t, locale, userInfo };
  },
  props: {
    id: String,
  },
  data() {
    return {
      newEntry: {
        id: null,
        type: "expense",
        category: "식비",
        account: "",
        amount: null,
        memo: "",
        date: "",
      },
    };
  },
  async created() {
    if (this.id) {
      const store = useEntriesStore();
      const entry = await store.getEntryById(this.id);
      if (entry) {
        this.newEntry = { ...entry };
      }
    }
  },
  methods: {
    async submitForm() {
      const store = useEntriesStore();
      try {
        if (this.newEntry.id) {
          await axios.put(`http://localhost:3000/transaction/${this.newEntry.id}`, this.newEntry);
          console.log("Entry edited successfully");
        } else {
          const newId = await store.getNextId();
          this.newEntry.id = newId;
          await axios.post("http://localhost:3000/transaction", this.newEntry);
          console.log("Entry added successfully");
        }
        this.$router.push("/trnsc");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    cancelEntry() {
      this.newEntry = {
        id: null,
        type: "expense",
        category: "식비",
        account: "",
        amount: null,
        memo: "",
        date: "",
      };
      this.$router.push("/trnsc");
    },
  },
};
</script>

<style scoped>
.card {
  margin: 41  px auto 38px auto;
  font-family: "MangoDdobak-B";
  font-size: 20px;
  border-radius: 15px;
  border: 5px solid rgb(255, 232, 157);
  font-family: "MangoDdobak-B";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 630px;
}

.card-body {
  width: 400px
}

label {
  padding: 7px;
}

input,
select {
  border: 2px solid rgb(243, 208, 91);
}

@font-face {
  font-family: "MangoDdobak-B";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
}

button {
  width: 70px;
  margin-left: 10px;
}

.wrap {
    width: 100%;
    height: 670px;
    display: flex;
    align-items: center;
}


</style>
