<template>
  <div class="container" v-if="sensitive.guests.length > 0">
    <div class="card userDetails">
      <h1>General Info</h1>
      <p>Email - <span>{{general.email}}</span></p>
      <p>Name - <span>{{general.name.first+" "+general.name.last}}</span></p>
      <p>Phone - <span>{{sensitive.phone}}</span></p>
      <p>Address - <span>{{ sensitive.address.street +" "+sensitive.address.city+" "+sensitive.address.state }}</span></p>
      <p class="subtext">Attending the event as {{general.type}}</p>
    </div>

    <div class="card Payment">
      <h1>Payment Details</h1>
      <p>A summary of the payment you have made to attend the event</p>
      <p class="ignore">Payment Status - <span class="status">{{ payment.payment_status }}</span></p>
      <p class="money">{{ "$"+payment.payment_total.value }}</p>
      <p class="subtext" v-if="general.type === 'volunteer'">Volunteer Discount Included</p>
    </div>

    <div class="card Guests" v-if="sensitive.guests.length>0">
      <h1>Your Guests</h1>
      <p class="subHeading">Here is the list of all the guests that you have included in your ticket</p>
      <p v-for="(guest,i) in sensitive.guests" :key="i">{{i+1}}. {{ guest }}</p>
    </div>

    <div class="card event">
      <h1>{{ event.name }}</h1>
      <p>{{ event.venue }}</p>
      <p>{{ event.date }}</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from "@/firebaseInit"
import { DateTime } from "luxon";

export default {
name: "UserDashboard",
  data(){
    return{
      doc_id:'',
      general: {
        email:'',
        name:{
          first:'',
          last:''
        },
        type:'',
        uid:''
      },
      event: {
        name:'',
        date:'',
        venue:''
      },
      payment: {
        payment_status:'',
        payment_total:{
          currency_code:'',
          value:''
        }
      },
      sensitive: {
        address:{
          street:'',
          city:'',
          state:'',
          country:''
        },
        phone:'',
        guests:[]
      }
    }
  },
  methods:{
    getFullDate(sec){
      let dt = DateTime.fromSeconds(sec)
      return dt.toLocaleString(DateTime.DATE_FULL)
    }
  },
  mounted() {
    // console.log(firebase.auth().currentUser.email)
    db.collection('registered_users').where('email','==',firebase.auth().currentUser.email).
    get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.doc_id = doc.id
        this.general = doc.data()

      })
    }).then(()=>{
      db.collection('registered_users').doc(this.doc_id).collection('sensitive_details').get().
      then(qs => {
        qs.forEach(doc => {
          this.sensitive = doc.data()
        })
      })

      db.collection('registered_users').doc(this.doc_id).collection('payment_details').get().
      then(qs => {
        qs.forEach(doc => {
          this.payment = doc.data()
        })
      })

      db.collection('event_details').doc('event_details').get().
      then(qs => {
        // console.log(qs.data())
        this.event = qs.data()
        this.event.date = this.getFullDate(this.event.date.seconds)
      })
    })
  }

}
</script>

<style scoped>
  .container{
    flex-basis: 100%;
    /*height: calc(100% - 80px);*/
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
  }

  .card{
    flex: 1 0 350px;
    margin: 20px;
    padding: 30px;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }

  .card h1{
    text-align: center;
    font-size: clamp(20px,3vw,30px);
    margin-bottom: 20px;
    color: #f44336;
  }

  p{
    margin: 10px auto;
    font-size: clamp(14px,3vw,18px);
    line-height: clamp(20px, 3vw, 30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p span{
    flex-basis: 70%;
  }

  .subtext{
    margin-top: 30px;
    font-size: clamp(13px, 3vw, 16px);
    color: #888;
  }

  .money{
    margin-top: 40px;
    font-size: clamp(25px, 3vw, 40px);
    color: #f44336;
  }
  .status{
    color: green;
  }

  .ignore{
    display: block;
  }

  @media only screen and (max-width: 700px) {
    .card{
      flex: 1 0 calc(100% - 20px);
      margin: 10px;
      padding: 20px;
      border-radius: 15px;
    }
  }
</style>