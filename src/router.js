import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/components/HomePage/HomePage";
import Dashboard from "@/components/BackEndPage/Dashboard";
import Login from "@/components/User/Login";

import firebase from 'firebase/app'
import 'firebase/auth'

const routes = [
    {
        path:'/',
        component:HomePage,
        name:'Home'
    },
    {
        path:'/dashboard',
        component:Dashboard,
        name:'Dashboard',
        beforeEnter: (to, from, next) => {
            if(!firebase.auth().currentUser){
                next({path:'/login'})
            } else {
                next()
            }
        }
    },
    {
        path:'/login',
        component:Login,
        name:'Login',
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


export default router