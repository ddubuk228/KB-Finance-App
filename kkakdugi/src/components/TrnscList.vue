<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12"
        v-for="(entry, index) in filteredEntries"
        :key="index"
      >
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
</template>

<script>
import { useEntriesStore } from "../store/entries";
import { computed } from "vue";
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
