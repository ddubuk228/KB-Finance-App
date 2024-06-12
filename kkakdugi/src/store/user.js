import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({

  }),
  actions: {
    async fetchUser() {
        try {
            const response = await axios.get('http://localhost:3000/users');
            const users = response.data;
            const userWithIdOne = users.find(user => user.id === "1");
            return userWithIdOne;
        } catch (error) {
            console.error('데이터를 가져오는 도중 에러 발생:', error);
        }
    },

    async editUser(userInfo) {
        try {
            const response = await axios.get('http://localhost:3000/users');
            const users = response.data;
            const userIndex = users.findIndex(user => user.id === "1");
            
            if (userIndex === -1) {
                throw new Error('ID가 1인 사용자를 찾을 수 없습니다.');
            }
            
            users[userIndex] = { ...users[userIndex], ...userInfo };
            
            await axios.put(`http://localhost:3000/users/${userInfo.id}`, users[userIndex]);
            
            return users[userIndex];
        } catch (error) {
            console.error('데이터를 수정하는 도중 에러 발생:', error);
        }
    },
    
  }
});
