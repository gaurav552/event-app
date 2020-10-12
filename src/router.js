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
import UserPaymentDtails from "@/components/User/UserDetails/UserPaymentDtails";
import SpecialGuests from "@/components/User/UserDetails/SpecialGuests";
import UserEventDetails from "@/components/User/UserDetails/UserEventDetails";
import UserInfo from "@/components/User/UserDetails/UserInfo";

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
                    next({path: '/userDetails'})
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
                        next({path: '/userDetails'})
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
        component: UserDetails,
        children: [
            {
                path: '',
                component: UserDashboard
            },
            {
                path: 'userInfo',
                component: UserInfo
            },
            {
                path: 'eventDetails',
                component: UserEventDetails
            },
            {
                path: 'guests',
                component: SpecialGuests
            },
            {
                path: 'payments',
                component: UserPaymentDtails
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