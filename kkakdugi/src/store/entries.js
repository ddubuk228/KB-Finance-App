import { defineStore } from 'pinia';
import axios from 'axios';

export const useEntriesStore = defineStore('entries', {
  state: () => ({
    entries: [],
    filteredEntries: [],
    selectedDate: '',
    selectedType: '',
    selectedCategory: '',
    totalIncome: 0,
    totalExpense: 0,
    selectMonth: "",
  }),
  actions: {
    async fetchEntries() {
      try {
        const response = await axios.get('http://localhost:3000/transaction?_sort=-date');
        this.entries = response.data;
        this.filterEntries();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async test() {
        try {
          const response = await axios.get('http://localhost:3000/transaction');
          this.entries = response.data;
          let index = (this.entries.length) -1
          let id = parseInt(this.entries[index].id)
          return id + 1
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },


    async deleteEntry(id) {
      try {
        await axios.delete(`http://localhost:3000/transaction/${id}`);
        this.entries = this.entries.filter(entry => entry.id !== id);
        this.filterEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    },
    filterEntries() {
      this.filteredEntries = this.entries.filter(entry => {
        return (!this.selectedDate || entry.date === this.selectedDate) &&
               (!this.selectedType || entry.type === this.selectedType) &&
               (!this.selectedCategory || entry.category === this.selectedCategory);
      });
    },
    setMonth(month) {
      this.selectMonth = month;
    },
    async getTotalIncome() {
      try {
        const response = await axios.get(`http://localhost:3000/transaction?type=income`);
        this.entries = response.data;
        console.log(this.entries)
        console.log("여기 " , this.selectMonth)

        const result = this.entries.reduce((prev, cur)=>{
          let month = parseInt(cur.date.substring(5,7))
          if(month == this.selectMonth ) {
            return prev += cur.amount;
          } else {
            return prev
          }
        }, 0)
        console.log(result)
        this.totalIncome = result;
        return result

      } catch (error) {
        console.error(error);
      }
    },
    async getTotalExpense() {
      try {
        const response = await axios.get(`http://localhost:3000/transaction?type=expense`);
        this.entries = response.data;
        console.log(this.entries)
        
        const result = this.entries.reduce((prev, cur)=>{
          let month = parseInt(cur.date.substring(5,7))
          if(month == this.selectMonth ) {
            return prev += cur.amount;
          } else {
            return prev
          }
        }, 0)

        console.log(result)
        this.totalExpense = result
        return result

      } catch (error) {
        console.error(error);
      }
    },
    async recentEntries() {
      try {
        const response = await axios.get('http://localhost:3000/transaction?_sort=-date&&_limit=5&&type=expense');
        this.entries = response.data;
        console.log("Fetched recent entries:", this.entries);
      } catch (error) {
        console.error(error);
      }
    },

    setSelectedDate(date) {
      this.selectedDate = date;
      this.filterEntries();
    },
    setSelectedType(type) {
      this.selectedType = type;
      this.filterEntries();
    },
    setSelectedCategory(category) {
      this.selectedCategory = category;
      this.filterEntries();
    }
  }
});
