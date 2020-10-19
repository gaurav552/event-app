<template>
  <div class="container" v-if="loaded">
    <div class="card">
      <div class="heading">
        <h1>
          {{ user.name.first + " " + user.name.last }}
        </h1>
        <div class="subtext">
          <span>{{ user.email }}</span>
        </div>
      </div>
      <div class="card-body">
        <p><span>Payment ID : </span><span>{{ payment.payment_id }}</span></p>
        <p><span>Payer ID : </span><span>{{ payment.payer_id}}</span></p>
        <p><span>Payed At : </span><span>{{ dater }}</span></p>
      </div>
      <div class="card-footer">
        <span class="complete">{{payment.payment_status}}</span>
        <span class="money">${{payment.payment_total.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import MyButton from "@/components/utils/MyButton";
import db from "@/firebaseInit";
import firebase from 'firebase/app'
import 'firebase/auth'
import {DateTime} from "luxon";

export default {
  name: "UserPaymentDtails",
  data(){
    return{
      doc_id:'',
      user:{
        name:'',
        email:'',
      },
      payment:{
        payer_id:'',
        payment_id:'',
        payment_status:'',
        payment_time:'',
        payment_total: {
          currency_code:'',
          value:''
        }
      },
      loaded:false
    }
  },
  computed:{
    dater(){
      if(this.payment.payment_time !== ''){
        let dt = DateTime.fromISO(this.payment.payment_time)
        return dt.toLocaleString(DateTime.DATETIME_MED)
      }
      return 0
    }
  },
  mounted() {
    db.collection('registered_users').where('uid','==',firebase.auth().currentUser.uid).get().then(
      qs=>{
        qs.forEach(doc=>{
          this.doc_id = doc.id
          this.user = doc.data()
        })
      }
    ).then(()=>{
      db.collection('registered_users').doc(this.doc_id).collection('payment_details').get().then(
        qs=>{
          qs.forEach(doc=>{
            this.payment = doc.data()
          })
          this.loaded = true
        }
      )
    })
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
  align-items: flex-start;
}

.card {
  flex: 0 0 60%;
  margin: 20px auto;
  max-width: 700px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.heading {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.subtext{
  margin: 10px 0;
  font-size: clamp(14px, 3vw, 16px);
}

.heading h1 {
  font-size: clamp(25px, 3vw, 34px);
  color: #f44336;
  text-align: left;
}

.heading p {
  display: flex;
  font-size: clamp(13px, 3vw, 15px);
  margin: 20px 0;
  justify-content: space-between;
}

.card-body {
  margin-bottom: 20px;
}

.card-body p{
  display: flex;
  justify-content: space-between;
  font-size: clamp(14px,3vw,18px);
}

.card-body p span:first-child{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1 1 40%;
  text-align: right;
  margin: 5px 15px;
}

.card-body p span:last-child{
  flex: 1 1 50%;
  text-align: left;
  margin: 5px 15px;
}

.card-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
}

.complete{
  color: #2C8B36;
  font-size: clamp(18px, 3vw, 25px);
}

.money{
  color: #f44336;
  font-size: clamp(24px, 3vw, 35px);
}

@media only screen and (max-width: 1050px) {
  .card {
    flex: 1 1 100%;
    margin: 10px;
  }

  .container {
    margin: 0;
  }
}

@media only screen and (max-width: 700px)  {
  .card-body p span:first-child{
    margin: 5px 10px;
  }

  .card-body p span:last-child{
    margin: 5px 10px;
  }
}

@media only screen and (max-width: 500px)  {
  .card {
    padding: 10px 15px;
  }
  .card-body p span:first-child{
    flex: 1 1 30%;
    margin: 5px 5px;
  }

  .card-footer{
    padding: 10px
  }

  .card-body p span:last-child{
    margin: 5px 5px;
  }
}
</style>