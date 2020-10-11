import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/components/HomePage/HomePage";
import Dashboard from "@/components/BackEndPage/Dashboard";
import Login from "@/components/User/Login";

import firebase from 'firebase/app'
import 'firebase/auth'
import Register from "@/components/User/Register";
import db from "@/firebaseInit";
import UserDetails from "@/components/User/UserDetails";
import OrderComplete from "@/components/User/OrderComplete";

let admins = []
db.collection("admin_uid").get().then(qs=>{
    qs.forEach(doc =>{
        admins.push(doc.data().uid)
    })
})

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
                if(admins.includes(firebase.auth().currentUser.uid)){
                    next()
                } else {
                    next({path:'/userDetails'})
                }

            }
        }
    },
    {
        path:'/login',
        component:Login,
        name:'Login',
        beforeEnter: (to, from, next) => {
            if(firebase.auth().currentUser){
                if(admins.includes(firebase.auth().currentUser.uid)){
                    next({name:'Dashboard'})
                } else {
                    next({name:'UserDetails'})
                }
            } else {
                next()
            }
        }
    },
    {
        path:'/register',
        component:Register,
        name:'Register',
        // beforeEnter: (to, from, next) => {
        //     if(firebase.auth().currentUser){
        //         if(admins.includes(firebase.auth().currentUser.uid)){
        //             next({name:'Dashboard'})
        //         } else {
        //             next({name:'UserDetails'})
        //         }
        //     } else {
        //         next()
        //     }
        // }
    },
    {
        path: '/userDetails',
        component: UserDetails,
        name:'Details',

    },
    {
        path: '/orderComplete',
        component: OrderComplete,
        name:'OrderComplete',

    },
    {
        path:'/:pathMatch(.*)*',
        redirect: {name:'Home'}
    }
]

const router = createRouter(
    {
        history:createWebHistory(),
        routes
    }
)


export default router