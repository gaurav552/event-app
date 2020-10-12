import {createWebHistory, createRouter} from "vue-router";
import HomePage from "@/components/HomePage/HomePage";
import Dashboard from "@/components/BackEndPage/Dashboard";
import Login from "@/components/User/Login";

import firebase from 'firebase/app'
import 'firebase/auth'
import Register from "@/components/User/Register";
import db from "@/firebaseInit";
import UserDetails from "@/components/User/UserDetails";
import OrderComplete from "@/components/User/OrderComplete";
import UserDashboard from "@/components/User/UserDetails/UserDashboard";

let admins = []
db.collection("admin_uid").get().then(qs => {
    qs.forEach(doc => {
        admins.push(doc.data().uid)
    })
})

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'Home'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        beforeEnter: (to, from, next) => {
            if (firebase.auth().currentUser) {
                if (admins.includes(firebase.auth().currentUser.uid)) {
                    next()
                } else {
                    next({name: 'Details'})
                }
            } else {
                next({name: 'Login'})
            }
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
        beforeEnter: (to, from, next) => {
            setTimeout(() => {
                if (firebase.auth().currentUser) {
                    if (admins.includes(firebase.auth().currentUser.uid)) {
                        next({name: 'Dashboard'})
                    } else {
                        next({name: 'Details'})
                    }
                } else {
                    next()
                }
            }, 500)

        }
    },
    {
        path: '/register',
        component: Register,
        name: 'Register',
        beforeEnter: (to, from, next) => {
            firebase.auth().signOut().then(() => {
                next()
            })
        }
    },
    {
        path: '/userDetails',
        component:UserDetails,
        name: 'Details',
        children:[
            {
                path:'',
                component:UserDashboard
            }
        ],
        beforeEnter: (to, from, next) => {
            if (firebase.auth().currentUser) {
                if (admins.includes(firebase.auth().currentUser.uid)) {
                    next({name: 'Dashboard'})
                } else {
                    next()
                }
            } else {
                next({name: 'Login'})
            }
        }

    },
    {
        path: '/orderComplete',
        component: OrderComplete,
        name: 'OrderComplete',

    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {name: 'Home'}
    }
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)


export default router