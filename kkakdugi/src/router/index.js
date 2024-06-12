import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/pages/Main.vue'
import TrnscList from '@/components/TrnscList.vue'
import NewItem from '@/components/NewItem.vue'
import Profile from '@/components/Profile.vue'


const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', component: Main },
        { path : '/trnsc', component : TrnscList},
        { path : '/trnsc/add', component : NewItem},
        { path : '/profile', component : Profile}

    ]
})

export default router;