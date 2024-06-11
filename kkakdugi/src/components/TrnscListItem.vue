<template>
  <div class="card mb-3">
    <div class="card-header">
      <small class="text-muted">{{ entry.date }}</small>
    </div>
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="card-item">
        {{ entry.account }} {{ entry.amount }}원 | {{ entry.memo }}
      </div>
      <div class="card-actions">
        <button @click="editEntry(entry.id)" class="btn btn-outline-warning">
          수정
        </button>
        <button @click="deleteEntry(entry.id)" class="btn btn-outline-warning">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useEntriesStore } from "../store/entries";
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    entry: Object,
  },
  setup(props) {
    const store = useEntriesStore();
    const { deleteEntry } = store;

    const editEntry = (id) => {
      // 수정 기능 로직을 여기에 추가
      console.log("Edit entry", id);
    };

    return {
      ...toRefs(props),
      editEntry,
      deleteEntry,
    };
  },
});
</script>

<style scoped>
.card {
  width: 500px; /* 고정된 카드 너비 */
  margin-bottom: 20px; /* 카드 간 간격 조절 */
  
}
.card-header {
  background-color: transparent;
  border-bottom: none;
  padding-bottom: 0;
}
.card-header small {
  font-size: 0.8rem;
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
}
.card-item {
  flex: 1;
  padding: 0 10px;
}
.card-actions {
  display: flex;
  gap: 10px;
}
</style>
