import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/pages/Main.vue'
import TrnscList from '@/components/TrnscList.vue'
import NewItem from '@/components/NewItem.vue'


const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', component: Main },
        { path : '/trnsc', component : TrnscList},
        { path : '/trnsc/add', component : NewItem}

    ]
})

export default router;