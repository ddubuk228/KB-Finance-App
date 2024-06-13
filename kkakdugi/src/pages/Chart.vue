<template>
   <div class="title">월별 지출</div>
   <div class="chart-container">
      <div class="chart">
         <div v-for="(monthData, index) in monthlyData" :key="index" class="chart-bar"
            @mouseover="updatePosition($event, index)" @mouseout="clearTooltip">
            <div class="chart-bar__inner">
               <div :class="['chart-bar__fill', getBarClass(getMonthTotal(monthData))]"
                  :style="{ height: getFillHeight(getMonthTotal(monthData)) }">
               </div>
               <div class="chart-bar__tooltip" v-if="tooltipText" ref="tooltip"
                  :style="{ top: tooltipTop + 'px', left: tooltipLeft + 'px' }">
                  {{ tooltipText }}
               </div>
            </div>
            <strong class="fs-tiny fw-light">{{ getMonthName(index) }}</strong>
         </div>
      </div>
   </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import { useEntriesStore } from '../store/entries';
import axios from 'axios';
export default {
   name: "Chart",
   setup() {
      const jsonData = ref(null);
      const monthlyData = reactive({});
      const MaxMonthTotal = ref(0);
      const entriesStore = useEntriesStore();
      const tooltipText = ref('');
      const tooltipTop = ref(0);
      const tooltipLeft = ref(0);
      const maxBudget = ref(0);

      const fetchEntries = async () => {
         try {
            await entriesStore.fetchEntries();
            jsonData.value = entriesStore.entries;
            calculateMonthlyData();
         } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
         }
      };

      const fetchUser = async () => {
         try {
            const response = await axios.get('http://localhost:3000/users?_sort=-date');
            maxBudget.value = response.data[0].maxBudget;
         } catch (error) {
            console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
         }
      };

      const getBarClass = (total) => {
         return total > maxBudget.value ? 'high-budget' : '';
      };

      const getMonthTotal = (monthData) => {
         return monthData
            .filter(item => item.type === "expense")
            .reduce((total, item) => total + item.amount, 0);
      };

      const getMonthName = (monthNumber) => {
         const monthNames = [
            "1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
         ];
         return monthNames[monthNumber - 1];
      };

      const getFillHeight = (total) => {
         if (MaxMonthTotal.value > 0) {
            return Math.round((total / MaxMonthTotal.value) * 100) + "%";
         } else {
            return "0%";
         }
      };

      const calculateMonthlyData = () => {
         if (!jsonData.value) return;
         for (let i = 1; i <= 12; i++) {
            monthlyData[i] = [];
         }

         jsonData.value.forEach(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            monthlyData[month].push(item);
         });

         MaxMonthTotal.value = Object.values(monthlyData).reduce((max, monthData) => {
            const total = getMonthTotal(monthData);
            return total > max ? total : max;
         }, 0);
      };

      const updatePosition = (event, monthIndex) => {
         const totalExpense = getMonthTotal(monthlyData[monthIndex]);
         tooltipText.value = `총 지출액: ${totalExpense}`;
         tooltipTop.value = event.clientY + 400;
         tooltipLeft.value = event.clientX + 60;
      };

      const clearTooltip = () => {
         tooltipText.value = '';
      };

      onMounted(async () => {
         try {
            await Promise.all([fetchEntries(), fetchUser()]);
         } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
         }
      });

      return {
         monthlyData,
         getMonthTotal,
         getMonthName,
         getFillHeight,
         tooltipText,
         updatePosition,
         clearTooltip,
         tooltipTop,
         tooltipLeft,
         getBarClass,
      };
   }
};
</script>
<style>
.chart-container {
   display: flex;
   justify-content: center;
   font-family: "MangoDdobak-B";
   width: 400px;
}

.chart {
   display: flex;
   justify-content: space-between;
   align-items: flex-end;
   padding: 10px;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
   width: 600px;
}

.chart-bar {
   display: flex;
   flex-flow: column;
   justify-content: flex-end;
   align-items: center;
}

.chart-bar__inner {
   display: flex;
   justify-content: center;
   align-items: flex-end;
   width: 17px;
   height: 156px;
   margin-bottom: 4px;
   border-radius: 5px;
   background-color: #F2F2F2;
   box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
}

.chart-bar__fill {
   width: 100%;
   border-radius: 5px;
   background-color: #ffd780;
   transition: all 300ms ease-out;
}
.chart-bar__fill.high-budget {
   background-color: red;
}
.chart-bar__tooltip {
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   padding: 4px;
   border-radius: 5px;
   background-color: rgba(255, 255, 255, 0.1);
   font-size: 12px;
   color: #333;
   white-space: nowrap;
}
.title{
   font-family: "MangoDdobak-B";
   text-align: center;
}
</style>