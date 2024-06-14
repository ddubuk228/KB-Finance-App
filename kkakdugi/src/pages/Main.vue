<template>
  <div class="calendar-box">
    <Calendar />
  </div>
  <div class="summary">
    <div class="total card">
      <div class="card-body">
        {{ currentMonth }}{{ t('month') }}<br />
        {{ t('income') }}
      </div>
      <div class="amount" style="color: greenyellow;">
        {{ formatNumber(totalIncome) }}{{ t('won') }}
      </div>
    </div>
    <div class="total card">
      <div class="card-body">
        {{ currentMonth }}{{ t('month') }}<br />
        {{ t('expense') }}
      </div>
      <div class="amount" style="color: red;">
        {{ formatNumber(totalExpense) }}{{ t('won') }}
      </div>
    </div>
    <div class="total card">
      <div class="card-body">
        {{ currentMonth }} {{ t('month') }}<br />
        {{ t('netProfit') }}
      </div>
      <div class="amount" style="color: blue;">
        {{ formatNumber(netProfit) }}{{ t('won') }}
      </div>
    </div>
  </div>
  <div class="container">
    <div class="btnbox">
      <button class="btnlist">
        <router-link to="/trnsc" :style="{ color: userTheme ? 'white' : 'black', 'text-decoration': 'none' }">
          {{ t('listTransaction') }}</router-link>
      </button>
    </div>
    <div class="row">
      <div class="btnBox">
        <router-link to="/trnsc/add">
          <button class="addBtn">
            <i class="fa-solid fa-plus"></i>
          </button>
        </router-link>
      </div>
      <div class="col-12" v-for="(entry, index) in entries" :key="index">
        <div class="transaction-item">
          <TrnscListItem :entry="entry" @entry-deleted="fetchRecentEntries" />
        </div>
      </div>
    </div>
  </div>
  <div class="chartBox">
    <Chart />
  </div>
</template>
<script>
import { useEntriesStore } from "../store/entries";
import { ref, onMounted, watch } from 'vue';
import TrnscListItem from "@/pages/TrnscListItem.vue";
import Calendar from "@/pages/Calendar.vue";
import axios from "axios";
import Chart from './Chart.vue';
import { useI18n } from "vue-i18n";
import { useUserStore } from '@/store/user';
export default {
  components: { TrnscListItem, Chart, Calendar },
  setup() {
    const store = useEntriesStore();
    const totalIncome = ref(0);
    const totalExpense = ref(0);
    const netProfit = ref(0);
    const entries = ref([]);
    const currentMonth = ref();
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

    const fetchRecentEntries = async () => {
      try {
        await store.recentEntries();
        entries.value = store.entries;
      } catch (error) {
        console.error('Error fetching recent entries:', error);
      }
    };
    const formatNumber = (number) => {
      return number.toLocaleString('ko-KR');
    };

    watch(
      () => store.selectMonth,
      async (newMonth) => {
        currentMonth.value = newMonth;
        totalIncome.value = await store.getTotalIncome();
        totalExpense.value = await store.getTotalExpense();
        netProfit.value = totalIncome.value - totalExpense.value;
      }
    );

    onMounted(async () => {
      await fetchRecentEntries();
      totalIncome.value = await store.getTotalIncome();
      totalExpense.value = await store.getTotalExpense();
      netProfit.value = totalIncome.value - totalExpense.value;
      currentMonth.value = store.selectMonth;
    });
    return {
      totalIncome,
      totalExpense,
      netProfit,
      entries,
      currentMonth,
      formatNumber,
      userTheme: localStorage.getItem('userTheme') === 'true',
      t,
      locale,
      userInfo,
      fetchRecentEntries,
    };
  }
}
</script>

<style scoped>
.wrap {
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.summary {
  margin: 0 auto;
  width: 400px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 120px);
  justify-content: space-between;
}

.total {
  margin-top: 20px;
  border: 5px solid rgb(255, 232, 157);
  height: 120px;
  text-align: center;
  border-radius: 0.375rem;
  font-family: "MangoDdobak-B";
}

.card-body {
  font-size: 17px;
  font-weight: bold;
  flex: 0;
  padding: 0;
  margin-top: 15px;
}

.container {
  margin-top: 20px;
  font-family: "MangoDdobak-B";
  position: relative;
}

.transaction-item {
  display: flex;
  justify-content: center;
  width: 100%;
}

.btnbox {
  text-align: right;
  padding-right: 16px;
  margin-bottom: 5px;
}

.btnlist {
  border: none;
  border-radius: 5px;
  background-color: inherit;
}

.amount {
  margin: 5px 0 0 0;
  padding: 0;
}

.btnBox {
  position: fixed;
  text-align: right;
  width: 489px;
  z-index: 2;
  bottom: 35px;
}

.addBtn {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  background-color: rgb(255, 232, 157);
  font-size: 25px;
  line-height: 20px;
}

.calendar-box {
  text-align: center
}

.chartBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>