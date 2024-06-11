import { createApp } from 'vue'
import { createPinia  } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n';
import messages from './local.js';

const i18n = createI18n({
    legacy: false, // legacy 모드를 비활성화
    locale: 'ko', 
    messages,
  });
  
  

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n);
app.mount('#app')
