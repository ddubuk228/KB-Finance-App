<template>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title mb-0">프로필</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
           <img src="../../public/assets/profile.png" alt="프로필 이미지" class="profile-img" width="150" />
          </div>
          <div class="form-group">
            <label for="name">이름</label>
            <input
                type="text"
                class="form-control"
                id="name"
                v-model="userInfo.name"
                required
            />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input
                type="email"
                class="form-control"
                id="email"
                v-model="userInfo.email"
                required
            />
          </div>
          <div class="switch-group">
            <label class="switch-label">알림</label>
            <div class="ios-switch">
              <input
                  type="checkbox"
                  id="notificationSwitch"
                  v-model="userInfo.notification"
              />
              <label for="notificationSwitch"></label>
            </div>
  
            <label class="switch-label">언어</label>
            <div class="ios-switch">
              <input
                  type="checkbox"
                  id="languageSwitch"
                  v-model="userInfo.language"
              />
              <label for="languageSwitch"></label>
            </div>
  
            <label class="switch-label">테마</label>
            <div class="ios-switch">
              <input
                  type="checkbox"
                  id="themeSwitch"
                  v-model="userInfo.theme"
              />
              <label for="themeSwitch"></label>
            </div>
          </div>
  
          <br>
          <div class="button-group">
            <!-- <button type="submit" class="btn btn-outline-warning" @click="submitForm">등록</button> -->
            <button type="button" class="btn btn-outline-warning" @click="editUser">수정</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <router-link to="/" class="btn btn-secondary">메인 페이지로</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/store/user'; // Adjust the path based on your project structure
  
  export default {
    data() {
      return {
        userInfo: {
          id: "1",
          name: "",
          email: "",
          notification: false,
          language: false,
          theme: false
        }
      };
    },
    methods: {
      async editUser() {
        const userStore = useUserStore();
        try {
          await userStore.editUser(this.userInfo);
        } catch (error) {
          console.error('데이터를 수정하는 도중 에러 발생:', error);
        }
      }
    },
    async mounted() {
      const userStore = useUserStore();
      try {
        const user = await userStore.fetchUser();
        if (user) {
          this.userInfo = { ...user };
        }
      } catch (error) {
        console.error('데이터를 가져오는 도중 에러 발생:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "MangoDdobak-B";
    font-size: 20px;
    border-radius: 15px; /* 모서리를 둥글게 만듦 */
    width: 400px;
  }
  label {
    padding: 12px;
  }
  button {
    width: 70px;
  }
  input, select {
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
    font-size: 13px; /* 글씨 크기 줄임 */
    flex-basis: 21%; /* 각 레이블 요소의 너비를 균등하게 설정 */
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
  @font-face {
    font-family: "MangoDdobak-B";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  </style>
  