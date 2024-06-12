<template>
    <div class="card mb-3">
      <div class="card-header">
        <small class="text-muted">{{ entry.date }}</small>
      </div>
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="card-item">
          {{ entry.account }} {{ entry.amount }}원  <div class="memo">{{ entry.memo }}</div>
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
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    props: {
      entry: Object,
    },
    setup(props) {
      const router = useRouter();
      const store = useEntriesStore();
      const { deleteEntry } = store;
  
      const editEntry = (id) => {
        // 라우터를 사용하여 경로 이동 및 데이터 전달
        router.push({ path: `/trnsc/edit/${id}` });
      };
  
      return {
        ...toRefs(props),
        editEntry,
        deleteEntry
      };
    },
  });
  </script>
  
  <style scoped>
  .card {
    width: 400px; /* 고정된 카드 너비 */
    margin-bottom: 20px; /* 카드 간 간격 조절 */
    border: 5px solid rgb(255, 232, 157);
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
  .memo {
    max-height: 50px; /* 원하는 최대 높이로 설정 */
    overflow-y: auto; /* 스크롤 가능하게 설정 */
    white-space: pre-wrap; /* 줄 바꿈을 유지하기 위해 설정 */
    word-break: break-word;
  }
  </style>
  