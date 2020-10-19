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
import DashHome from "@/components/BackEndPage/pages/DashHome";
import RegisteredUsers from "@/components/BackEndPage/pages/RegisteredUsers";
import AdminsView from "@/components/BackEndPage/pages/AdminsView";
import GuestSpeakers from "@/components/BackEndPage/pages/GuestSpeakers";
import VendorsView from "@/components/BackEndPage/pages/VendorsView";
import EventDetails from "@/components/BackEndPage/pages/EventDetails";

let admins = []
db.collection("admin_uid").onSnapshot(qs => {
    qs.docs.forEach(doc => {
        admins.push(doc.data().uid)
    })
})

function checker(to, from, next){
    if (firebase.auth().currentUser) {
        if (admins.includes(firebase.auth().currentUser.uid)) {
            next({path: '/dashboard'})
        } else {
            next({path: '/userDetails'})
        }
    } else {
        next()
    }
}


const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'Home'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            {
                path: "",
                name: 'Admin Dashboard',
                component: DashHome
            },
            {
                path: "attendees",
                name: 'Attendees',
                component: RegisteredUsers
            },
            {
                path: "admins",
                name: 'Admins',
                component: AdminsView
            },
            {
                path: "guests",
                name: 'Guests',
                component: GuestSpeakers
            },
            {
                path: "vendors",
                name: 'Vendors',
                component: VendorsView
            },
            {
                path: "event",
                name: 'Event',
                component: EventDetails
            }

        ],
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
            if (admins.length === 0) {
                setTimeout(() => {
                    checker(to, from, next)
                }, 1000)
            } else {
                checker(to,from,next)
            }
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
                name: 'Dashboard',
                component: UserDashboard
            },
            {
                path: 'userInfo',
                name: 'User Info',
                component: UserInfo
            },
            {
                path: 'eventDetails',
                name: 'Event Details',
                component: UserEventDetails
            },
            {
                path: 'guests',
                name: 'Special Guests',
                component: SpecialGuests
            },
            {
                path: 'payments',
                name: 'Payment Details',
                component: UserPaymentDtails
            }
        ],
        beforeEnter: (to, from, next) => {
            if (firebase.auth().currentUser) {
                if (admins.includes(firebase.auth().currentUser.uid)) {
                    next({path: '/dashboard'})
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