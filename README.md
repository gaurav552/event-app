# event-app

---

This is the capstone project for team rambo squad of Cambrian College sudbury, ON. In this project we create a user registration and event management app for physiotherapy Foundation Canada who is going to host a golf tournament.

This project uses the newly released Vue JS 3 framework. But besides Vue JS we also have implemented several other tools and libraries to get everything done. he following is the list of tools and libraries that we have used in this project.

- Firebase Firestore as database
- Firebase Authentication for user login and registration
- Paypal API as payment solution
- Luxon js for parsing and formatting date and time
- countdown js for the date countdown
- Vue router and VueX

Those are the only libraries and plugins used in this project.

---

The folder structure of the project is as follows, with some additional details at the end.


```
Directory of D:\vue\event-app\src

10/21/2020  07:07 PM    <DIR>          .
10/21/2020  07:07 PM    <DIR>          ..
10/14/2020  04:26 AM             1,004 App.vue
10/07/2020  05:46 AM    <DIR>          components
09/27/2020  10:53 PM               377 firebaseConfig.js
10/16/2020  10:10 AM               394 firebaseInit.js
10/07/2020  08:26 AM               152 main.js
10/18/2020  05:17 PM             5,323 router.js
               5 File(s)          7,250 bytes

 Directory of D:\vue\event-app\src\components

10/07/2020  05:46 AM    <DIR>          .
10/07/2020  05:46 AM    <DIR>          ..
10/18/2020  08:15 PM    <DIR>          BackEndPage
10/21/2020  08:59 AM    <DIR>          HomePage
10/18/2020  10:41 AM    <DIR>          User
10/18/2020  05:05 AM    <DIR>          utils
               0 File(s)              0 bytes

 Directory of D:\vue\event-app\src\components\BackEndPage

10/18/2020  08:15 PM    <DIR>          .
10/18/2020  08:15 PM    <DIR>          ..
10/18/2020  08:15 PM             3,005 AdminSideBar.vue
10/18/2020  05:12 PM             2,120 Dashboard.vue
10/18/2020  08:14 PM    <DIR>          pages
               2 File(s)          5,125 bytes

 Directory of D:\vue\event-app\src\components\BackEndPage\pages

10/18/2020  08:14 PM    <DIR>          .
10/18/2020  08:14 PM    <DIR>          ..
10/18/2020  07:57 PM             6,058 AdminsView.vue
10/18/2020  07:57 PM             4,986 DashHome.vue
10/18/2020  08:14 PM             4,157 EventDetails.vue
10/18/2020  07:57 PM             6,290 GuestSpeakers.vue
10/18/2020  07:57 PM             4,562 RegisteredUsers.vue
10/18/2020  07:57 PM             7,386 VendorsView.vue
               6 File(s)         33,439 bytes

 Directory of D:\vue\event-app\src\components\HomePage

10/21/2020  08:59 AM    <DIR>          .
10/21/2020  08:59 AM    <DIR>          ..
10/21/2020  08:51 AM             2,464 CenterBox.vue
10/21/2020  08:56 AM             3,519 HomePage.vue
10/21/2020  08:59 AM             3,327 RSVP.vue
               3 File(s)          9,310 bytes

 Directory of D:\vue\event-app\src\components\User

10/18/2020  10:41 AM    <DIR>          .
10/18/2020  10:41 AM    <DIR>          ..
10/14/2020  05:57 AM             3,319 Login.vue
10/14/2020  06:01 AM             2,065 OrderComplete.vue
10/14/2020  05:58 AM             5,725 PaymentForm.vue
10/14/2020  05:57 AM             2,110 Register.vue
10/14/2020  05:45 AM             8,365 RegistrationForm.vue
10/18/2020  07:52 PM    <DIR>          UserDetails
10/18/2020  10:41 AM             1,797 UserDetails.vue
               6 File(s)         23,381 bytes

 Directory of D:\vue\event-app\src\components\User\UserDetails

10/18/2020  07:52 PM    <DIR>          .
10/18/2020  07:52 PM    <DIR>          ..
10/18/2020  07:14 PM             2,711 SideBar.vue
10/18/2020  07:15 PM             3,297 SpecialGuests.vue
10/18/2020  07:17 PM             4,627 UserDashboard.vue
10/18/2020  07:16 PM             2,327 UserEventDetails.vue
10/18/2020  07:17 PM             4,559 UserInfo.vue
10/18/2020  07:52 PM             4,323 UserPaymentDtails.vue
               6 File(s)         21,844 bytes

 Directory of D:\vue\event-app\src\components\utils

10/18/2020  05:05 AM    <DIR>          .
10/18/2020  05:05 AM    <DIR>          ..
10/06/2020  05:56 AM               538 Alert.vue
10/17/2020  12:23 AM             1,991 Headers.vue
10/18/2020  05:05 AM               849 MyButton.vue
10/07/2020  10:11 AM               950 RoundButton.vue
10/14/2020  05:13 AM             1,264 SignOutButton.vue
               5 File(s)          5,592 bytes

     Total Files Listed:
              33 File(s)        105,941 bytes
              23 Dir(s)  170,133,155,840 bytes free
```

---

Now to get started with the project just follow the instructions below and you should be able to use the app. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
