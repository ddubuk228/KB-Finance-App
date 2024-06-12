<template>
    <div class="card" :class="{ 'darkTheme': userInfo.theme }">
      <div class="card-header">
        <h3 class="card-title mb-0">{{ t('profile') }}</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <img src="../../public/assets/profile.png" alt="프로필 이미지" class="profile-img" width="150" />
          </div>
          <div class="form-group">
            <label for="name">{{ t('name') }}</label>
            <input type="text" class="form-control" id="name" v-model="userInfo.name" required />
          </div>
          <div class="form-group">
            <label for="email">{{ t('email') }}</label>
            <input type="email" class="form-control" id="email" v-model="userInfo.email" required />
          </div>
          <div class="switch-group">
            <label class="switch-label">{{ t('notification') }}</label>
            <div class="ios-switch">
              <input type="checkbox" id="notificationSwitch" v-model="userInfo.notification" @click="toggleNotification" />
              <label for="notificationSwitch"></label>
            </div>
  
            <label class="switch-label">{{ t('language') }}</label>
            <div class="ios-switch">
              <input type="checkbox" id="languageSwitch" v-model="userInfo.language" @click="toggleLanguageSwitch" />
              <label for="languageSwitch"></label>
            </div>
  
            <label class="switch-label">{{ t('theme') }}</label>
            <div class="ios-switch">
              <input type="checkbox" id="themeSwitch" v-model="userInfo.theme" @click="toggleThemeSwitch" />
              <label for="themeSwitch"></label>
            </div>
          </div>
  
          <br />
          <div class="button-group">
            <button type="button" class="btn btn-outline-warning" @click="editUser">{{ t('edit') }}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <router-link to="/" class="btn btn-secondary">{{ t('mainPage') }}</router-link>
      </div>
    </div>
  
    <!-- 모달 템플릿 -->
    <div
      class="modal fade"
      ref="emptyFieldModal"
      :class="{ show: isModalOpen }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="emptyFieldModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="emptyFieldModalLabel" style="font-weight: bold; color: red;">{{ t('warning') }}</h5>
          </div>
          <div class="modal-body">
            {{ t('enterNameEmail') }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">{{ t('close') }}</button>
          </div>
        </div>
      </div>
      <p v-if="isModalOpen">모달이 열렸습니다.</p>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/store/user';
  import { useI18n } from 'vue-i18n';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const { t, locale } = useI18n();
      const userInfo = ref({
        id: '1',
        name: '',
        email: '',
        notification: false,
        language: localStorage.getItem('userLanguage') === 'true',
        theme: localStorage.getItem('userTheme') === 'true',
      });
      const isModalOpen = ref(false);
  
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
  
      // 페이지가 로드될 때 한 번만 실행되도록 onMounted 사용
      onMounted(() => {
        fetchUserData();
        userInfo.value.language = localStorage.getItem('userLanguage') === 'true';
        locale.value = userInfo.value.language ? 'en' : 'ko';
      });
  
      const editUser = async () => {
        if (!userInfo.value.name || !userInfo.value.email) {
          if (this.$refs.emptyFieldModal) {
            this.$refs.emptyFieldModal.classList.add('show');
            this.$refs.emptyFieldModal.style.display = 'block';
          }
          return;
        }
  
        try {
          await userStore.editUser(userInfo.value);
          fetchUserData();
          localStorage.setItem('userLanguage', userInfo.value.language.toString());
          localStorage.setItem('userTheme', userInfo.value.theme.toString());
          locale.value = userInfo.value.language ? 'ko' : 'en';
          window.location.reload();
        } catch (error) {
          console.error('데이터를 수정하는 도중 에러 발생:', error);
        }
      };
  
      const closeModal = () => {
        isModalOpen.value = false;
      };
  
      const toggleNotification = () => {
        userInfo.value.notification = !userInfo.value.notification;
      };
  
      const toggleLanguageSwitch = () => {
        userInfo.value.language = !userInfo.value.language;
      };
  
      const toggleThemeSwitch = () => {
        userInfo.value.theme = !userInfo.value.theme;
      };
  
      return {
        t,
        locale,
        userInfo,
        isModalOpen,
        editUser,
        closeModal,
        toggleNotification,
        toggleLanguageSwitch,
        toggleThemeSwitch,
      };
    },
  };
  </script>
  
  
  <style scoped>
  .card {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "MangoDdobak-B";
    font-size: 20px;
    border-radius: 15px; 
    width: 400px;
  }
  
  .label {
    padding: 12px;
  }
  
  .button {
    width: 70px;
  }
  
  input,
  select {
    border: 2px solid rgb(243, 208, 91);
  }
  
  .profile-img {
    border-radius: 50%;
    margin-left: 100px;
  }
  
  .switch-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px;
  }
  
  .switch-label {
    font-size: 13px; 
    margin-left: 16px;
    flex-basis: 4%; 
  }
  
  .ios-switch {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 34px;
    margin-left: 10px;
  }
  
  .ios-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .ios-switch label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 34px;
    cursor: pointer;
    transition: 0.4s;
  }
  
  .ios-switch label:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
  
  .ios-switch input:checked + label {
    background-color: #ffc107;
  }
  
  .ios-switch input:checked + label:before {
    transform: translateX(20px);
  }
  
  .button-group {
    display: flex;
    margin-left: 145px;
    margin-top: 5px;
  }
  
  .darkTheme {
    background-color: #ee2424; 
    color: #000000; 
  }

  .darkTheme .ios-switch label {
  background-color: #666; 
}

.darkTheme .ios-switch input:checked + label {
  background-color: #ffc400; 
}

  @font-face {
    font-family: "MangoDdobak-B";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  </style>
  