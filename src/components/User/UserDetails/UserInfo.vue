<template>
  <div class="container" v-if="sensitive.guests.length > 0">
    <div class="card">
      <div class="heading">
        <h1>
          {{ user.name.first + " " + user.name.last }}
        </h1>
        <div class="subtext">
          <div class="left">
              <span>Created At : </span> <span>{{ getCreated }}</span>
          </div>
            <div class="right">
              <span>Last Logged In: </span> <span>{{ getLoged }}</span>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p><span>Email : </span><span>{{ user.email }}</span></p>
        <p><span>Phone : </span><span>{{ sensitive.phone }}</span></p>
        <p><span>Address : </span><span>{{
            sensitive.address.street + ", " + sensitive.address.city + ", " + sensitive.address.state + ", " + sensitive.address.country
          }}</span></p>
        <p><span>Guests : </span> <span>{{ sensitive.guests.join(", ") }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>

import db from "@/firebaseInit";
import firebase from 'firebase/app'
import 'firebase/auth'
import {DateTime} from "luxon";

export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        name: {
          first: '',
          last: ''
        },
        email: '',
        uid: '',
        type: ''
      },
      sensitive: {
        address: {
          street: '',
          city: '',
          state: '',
          country: ''
        },
        guests: [],
        phone: ''
      },
      doc_id: ''
    }
  },
  methods:{
    convertDate(date){
      let dt = DateTime.fromHTTP(date)
      return dt.toLocaleString(DateTime.DATETIME_MED)
    }
  },
  computed: {
    getCreated() {
      return this.convertDate(firebase.auth().currentUser.metadata.creationTime)
    },
    getLoged() {
      return this.convertDate(firebase.auth().currentUser.metadata.lastSignInTime)
    }
  },
  mounted() {
    db.collection('registered_users').where('uid', '==', firebase.auth().currentUser.uid).get().then(
      qs => {
        qs.forEach(doc => {
          this.doc_id = doc.id
          this.user = doc.data()
        })
      }
    ).then(() => {
      db.collection('registered_users').doc(this.doc_id).collection('sensitive_details').get().then(
        qs => {
          qs.forEach(doc => {
            this.sensitive = doc.data()
          })
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

.subtext{
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.left, .right {
  display: flex;
  flex-direction: column;
  font-size: clamp(14px, 3vw, 18px);
}

.right{
  text-align: right;
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
}

.heading h1 {
  font-size: clamp(25px, 3vw, 34px);
  color: #f44336;
  text-align: center;
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
  flex: 1 1 15%;
  text-align: right;
  margin: 5px 15px;
}

.card-body p span:last-child{
  flex: 1 1 60%;
  text-align: left;
  margin: 5px 15px;
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
    flex: 1 1 25%;
    margin: 5px 10px;
  }

  .card-body p span:last-child{
    flex: 1 1 60%;
    margin: 5px 10px;
  }
}

@media only screen and (max-width: 500px)  {
  .card {
    padding: 10px 15px;
  }
  .card-body p span:first-child{
    flex: 1 1 25%;
    margin: 5px 5px;
  }

  .card-body p span:last-child{
    flex: 1 1 60%;
    margin: 5px 5px;
  }
}
</style>