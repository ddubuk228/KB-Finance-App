<template>
  <div class="card mb-3">
    <div class="card-header">
      <small class="text-muted">{{ entry.date }}</small>
    </div>
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="card-item">
        {{ entry.account }} {{ entry.amount }}{{ t('won') }} | {{entry.memo}}
      </div>
      <div class="card-actions">
        <button @click="editEntry(entry.id)" class="btn btn-outline-warning">
          {{ t('edit') }}
        </button>
        <button @click="deleteEntry(entry.id)" class="btn btn-outline-warning">
          {{ t('delete') }}
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import { useEntriesStore } from "../store/entries";
import { defineComponent, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

export default defineComponent({
  props: {
    entry: Object,
  },
  setup(props) {
    const router = useRouter();
    const store = useEntriesStore();
    const { deleteEntry } = store;
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

    const editEntry = (id) => {
      // 라우터를 사용하여 경로 이동 및 데이터 전달
      router.push({ path: `/trnsc/edit/${id}` });
    };


    return {
      ...toRefs(props),
      editEntry,
      deleteEntry,
      t,
      locale,
      userInfo,
    };
  },
});
</script>
<style scoped>
.card {
  width: 400px; /* 고정된 카드 너비 */
  margin-bottom: 20px; /* 카드 간 간격 조절 */
  border : 5px solid rgb(255, 232, 157);
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
