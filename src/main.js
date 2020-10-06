import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";

import App from './App.vue'
import HomePage from "@/components/HomePage/HomePage";
import Dashboard from "@/components/BackEndPage/Dashboard";


let app = createApp(App)
const routes = [
    {
        path:'/',
        component:HomePage,
        name:'home'
    },
    {
        path:'/dashboard',
        component:Dashboard,
        name:'Dashboard'
    },
    {
        path:'/:pathMatch(.*)*',
        redirect: {name:'home'}
    }
]

const router = createRouter(
    {
        history:createWebHistory(),
        routes
    }
)

app.use(router)
// app.use(VueReCaptcha,{
//     siteKey: '6LeVItQZAAAAAI21JUbbuzyxqyRnOgz4ePgBKBcN',
// })

app.mount('#app')
