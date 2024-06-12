<template>
   <div class="calendar-box">
      <Calendar />
   </div>
   <div class="summary">
      <div class="total card">
         <div class="card-body">
            {{ currentMonth }}월<br />
            수입
         </div>
         <div class="amount" style="color: greenyellow;">
            {{ formatNumber(totalIncome) }}원
         </div>
      </div>
      <div class="total card">
         <div class="card-body">
            {{ currentMonth }}월<br />
            지출
         </div>
         <div class="amount" style="color: red;">
            {{ formatNumber(totalExpense) }}원
         </div>
      </div>
      <div class="total card">
         <div class="card-body">
            {{ currentMonth }}월<br />
            순수익
         </div>
         <div class="amount" style="color: blue;">
            {{ formatNumber(netProfit) }}원
         </div>
      </div>
   </div>

   <div class="container">
      <div class="btnbox">
         <button class="btnlist">
            <router-link to="/trnsc" style="text-decoration: none; color: black;">
               + 거래 내역 목록</router-link></button>
      </div>
      <div class="row">
         <div class="btnBox">
            <router-link to="/trnsc/add"><button class="addBtn">
                  <i class="fa-solid fa-plus"></i>
               </button></router-link>
         </div>
         <div class="col-12" v-for="(entry, index) in entries" :key="index">
            <div class="transaction-item">
               <TrnscListItem :entry="entry" />
            </div>
         </div>
      </div>
   </div>
   <div>
      <Chart />
   </div>
</template>

<script>
import { useEntriesStore } from "../store/entries";
import { ref, onMounted, watch } from 'vue';
import TrnscListItem from "@/components/TrnscListItem.vue";
import Calendar from "@/pages/Calendar.vue"
import axios from "axios";
import Chart from './Chart.vue';

export default {

   components: { TrnscListItem, Chart, Calendar },
   setup() {
      const store = useEntriesStore();
      const totalIncome = ref(0);
      const totalExpense = ref(0);
      const netProfit = ref(0);
      const entries = ref([]);
      const currentMonth = ref(new Date().getMonth() + 1);

      const fetchRecentEntries = async () => {
         try {
            const response = await axios.get(`http://localhost:3000/transaction?_sort=-date&_limit=5&type=expense`);
            entries.value = response.data;
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
            currentMonth.value = newMonth
            totalIncome.value = await store.getTotalIncome();
            totalExpense.value = await store.getTotalExpense();
            netProfit.value = (totalIncome.value - totalExpense.value);

         }
      );


      onMounted(async () => {
         await fetchRecentEntries();
         await store.recentEntries();
         console.log("Entries in component:", store.entries)
         totalIncome.value = await store.getTotalIncome();
         totalExpense.value = await store.getTotalExpense();
         netProfit.value = totalIncome.value - totalExpense.value;
      });

      return {
         totalIncome,
         totalExpense,
         netProfit,
         entries,
         currentMonth,
         formatNumber,
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
</style>