import { defineStore } from 'pinia';
import axios from 'axios';

export const useEntriesStore = defineStore('entries', {
  state: () => ({
    entries: [],
    filteredEntries: [],
    selectedDate: '',
    selectedType: '',
    selectedCategory: ''
  }),
  actions: {
    async fetchEntries() {
      try {
        const response = await axios.get('http://localhost:3000/transaction?sort=date&order=desc');
        this.entries = response.data;
        this.filterEntries();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async getEntryById(id) {
        try {
          const response = await axios.get(`http://localhost:3000/transaction/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching entry by id:', error);
        }
      },
    async getNextId() {
        try {
          const response = await axios.get('http://localhost:3000/transaction');
          this.entries = response.data;
          let index = (this.entries.length) -1
          let id = parseInt(this.entries[index].id)
          return String(id + 1)
          
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
