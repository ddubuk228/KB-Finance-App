<template>
        <div class="wrap">
            <div class="summary">
                <div class="total card">
                    <div class="card-body">
                        {{ currentMonth }}월 수입<br />
                        <span style="color: greenyellow;">{{ totalIncome }}</span>
                    </div>
                </div>
                <div class="total card">
                    <div class="card-body">
                        {{ currentMonth }}월 지출<br />
                        <span style="color: red;">{{ totalExpense }}</span>
                    </div>
                </div>
                <div class="total card">
                    <div class="card-body">
                        {{ currentMonth }}월 순수익<br />
                        <span style="color: blue;">{{ netProfit }}</span>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="btnbox">
                    <button class="btnlist">
                        <router-link to="/trnsc" :style="{ color: userTheme ? 'white' : 'black', 'text-decoration': 'none' }">
                            + 거래 내역 목록</router-link></button>
                </div>
                <div class="row">
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
        </div>
 </template>

<script>
import { useEntriesStore } from "../store/entries";
import { ref, onMounted, watch } from 'vue';
import TrnscListItem from "@/components/TrnscListItem.vue";
import axios from "axios";
import Chart from './Chart.vue';

export default {

    components: { TrnscListItem, Chart },
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

        watch(
            () => store.selectMonth,
            async (newMonth) => {
                currentMonth.value = newMonth
                totalIncome.value = await store.getTotalIncome();
                totalExpense.value = await store.getTotalExpense();
                netProfit.value = totalIncome.value - totalExpense.value;
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
            userTheme: localStorage.getItem('userTheme') === 'true',
        };
    },
    }
</script>

<style scoped>

</style>