<template>
  <div class="container">
    <router-link v-for="(item, i) in listItems" :key="i" :class="'card '+i.toLowerCase()" :to="links[i]">
      <div class="card-heading">
        <h1>{{ i }}</h1>
      </div>
      <div class="card-footer">
        Total {{ i }} : {{ item }}
      </div>
    </router-link>

    <div class="card eventDetails">
      <div class="card-header">
        <h1>Event Details</h1>
      </div>
      <div class="card-body">
        <p>{{ event.name }}</p>
        <p>{{ event.venue }}</p>
        <p>{{ event.date }}</p>
      </div>
    </div>
  </div>
<!--  <teleport to=".crumb">-->
<!--    Dashboard-->
<!--  </teleport>-->
</template>

<script>

// import firebase from 'firebase/app'
import 'firebase/auth'
import db from "@/firebaseInit"
import {DateTime} from "luxon";

export default {
  name: "DashHome",
  data() {
    return {
      listItems: {
        'Audiences': 0,
        'Volunteers': 0,
        'Players': 0,
        'Guests': 0,
        'Vendors': 0,
        'Admins': 0
      },
      links: {
        'Audiences': {path: '/dashboard/attendees', query: {value: 'audience'}},
        'Volunteers': {path: '/dashboard/attendees', query: {value: 'volunteer'}},
        'Players': {path: '/dashboard/attendees', query: {value: 'player'}},
        'Guests': {path: '/dashboard/guests'},
        'Vendors': {path: '/dashboard/vendors'},
        'Admins': {path: '/dashboard/admins'},
      },
      event:{
        name:'',
        date:'',
        venue:''
      }
    }
  },
  methods: {
    getFullDate(sec){
      let dt = DateTime.fromSeconds(sec)
      return dt.toLocaleString(DateTime.DATE_FULL)
    }
  },
  mounted() {

    ['Audience', 'Volunteer', 'Player'].forEach(item => {
      db.collection("registered_users").where('type', '==', item.toLowerCase()).get().then(
        qs => {
          this.listItems[item + "s"] = qs.size
        }
      )
    });

    ['Guest', 'Vendor'].forEach(item => {
      db.collection("vendors_and_guests").where('type', '==', item.toLowerCase()).get().then(
        qs => {
          this.listItems[item + "s"] = qs.size
        }
      )
    })

    db.collection("admin_uid").get().then(
      qs => {
        this.listItems['Admins'] = qs.size
      }
    )

    db.collection("event_details").doc('event_details').get().then(
      qs=>{
        this.event = qs.data()
        this.event.date = this.getFullDate(this.event.date.seconds)
      }
    )
  }
}
</script>

<style scoped>

.container {
  flex-basis: 100%;
  /*height: calc(100% - 80px);*/
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: flex-start;
}

.card {
  flex: 1 0 22%;
  margin: 20px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}

.eventDetails{
  flex-grow: 2;
}

.card-heading {
  padding: 40px;
  height: 120px;
  display: grid;
  place-items: center;
}

.card-header{
  display: grid;
  place-items: center;
  padding: 20px;
  background-color: #f44336;
  color: white;
  border-radius: 25px 25px 0 0;
}

.card-heading h1 {
  color: #f44336;
}

.card-header h1, .card-heading h1 {
  font-size: clamp(22px, 3vw, 25px);
  text-align: center;
}

.card-footer {
  text-align: center;
  padding: 20px;
  background-color: #e4e4e4;
  border-radius: 0 0 25px 25px;
}

.card-body{
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}

.card-body p{
  font-size: clamp(15px, 3vw, 20px);
  line-height: clamp(20px, 3vw, 30px);
}

a {
  color: #00365A;
}

@media only screen and (max-width: 700px){
  .card {
    flex: 0 0 80%;
    margin: 15px auto;
    border-radius: 15px;
  }
  .card-footer {
    padding: 20px 10px;
    border-radius: 0 0 15px 15px;
  }

  .card-header{
    padding: 15px;
    border-radius: 15px 15px 0 0;
  }
}

</style>