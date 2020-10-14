<template>
  <div class="card-header">
    <h3>Confirm and Pay</h3>
  </div>
  <div class="card-body">

    <div class="details">
      <span>Name: {{ fullName }}</span>
      <span>Email: {{ userData.email }}</span>
      <span>Phone: {{ userData.phone }}</span>
      <span>Address: <br> {{ fullAddress }}</span>

      <span>Coming as: {{ userData.user_category }}</span>
      <hr>
      <span>{{ userData.total_guests === 0 ? 'You have no Guests with you' : 'You have ' + userData.total_guests + ' guests' }}</span>
      <div class="guests" v-if="userData.total_guests > 0">
        <span>Your Guests are as follows</span>
        <ul>
          <li v-for="(guest,i) in userData.guests" :key="i">{{ guest }}</li>
        </ul>
      </div>
      <span>
        Order Total: <div class="cost">${{ userData.total_price }}</div>.
        <br>
        <template v-if="userData.user_category === 'volunteer'">Includes $100 volunteer discount</template>
      </span>
      <hr>
      <div ref="paypal"></div>
    </div>
  </div>
  <div class="card-footer">
    <button class="edit" @click="goBack">Edit Details</button>
  </div>
</template>

<script>
import db from "@/firebaseInit"
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "PaymentForm",
  props: ['userData'],
  data(){
    return{
      paidFor:false,
      user_id:''
    }
  },
  emits: {
    'go-to': null
  },
  computed:{
    fullAddress(){
      return this.userData.address.street+", "+this.userData.address.city+", "+this.userData.address.state+", "+this.userData.address.country
    },
    fullName(){
      return this.userData.name.first+" "+this.userData.name.last
    }
  },
  methods: {
    setLoaded() {
      this.loaded = true
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units:[
              {
                description:this.userData.description,
                amount:{
                  currency_code:'CAD',
                  value:this.userData.total_price
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password).then((res)=>{
            db.collection('registered_users').add({
              uid:res.user.uid,
              email:this.userData.email,
              type:this.userData.user_category,
              name:this.userData.name
            }).then((res)=>{
              res.collection('sensitive_details').add({
                phone:this.userData.phone,
                address:this.userData.address,
                guests:this.userData.guests ? this.userData.guests : ''
              })
              res.collection('payment_details').add({
                payer_id:order.payer.payer_id,
                payment_id:order.id,
                payment_time:order.create_time,
                payment_total:order.purchase_units[0].amount,
                payment_status:order.status
              })
            })
          }, err=>{
            console.log(err)
          })

          this.paidFor = true;
          await this.$router.push('/orderComplete')
        },
        onError: err => {
          console.log(err);
        }
      }).render(this.$refs.paypal)
    },
    goBack() {
      this.$emit('go-to', {gotoPayment: false})
    }
  },
  activated() {
    const script = document.createElement('script')
    script.id = 'pay'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQuC9qoL5DicQSJleF4mCGP3vWGr1kpdITCu0RgdfWrP5U4butc6qVOErQ_MBZoGRdGj5UJX1TLrB6B0&currency=CAD'
    script.addEventListener('load', this.setLoaded,true)
    document.body.appendChild(script)
  },
  deactivated() {
    document.getElementById('pay').remove()
    this.$refs.paypal ? this.$refs.paypal.innerHTML = '':''
  }
}
</script>

<style scoped>

button{
  background-color: var(--bg-frontEnd);
  border: none;
  outline: none;
  box-shadow: 0 0 10px rgba(0,0,0,.13);
}

button:active, button:focus{
  box-shadow: none;
  background-color: #D5D5D5;
}

.card-header {
  padding: 30px;
  display: grid;
  place-items: center;
  background-color: #f44336;
  color: white;
  border-radius: 25px 25px 0 0;
}

.card-body {
  width: 100%;
  padding: 20px 40px;
  /*margin-bottom: 40px;*/
  overflow-y: scroll;
}

.details {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.guests{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
}

span{
  padding: 5px 0;
  line-height: 25px;
}

li{
  list-style: none;
}
li:before{
  content: '- ';
}

hr{
  margin: 10px 0;
}

.card-footer{
  padding: 15px 30px;
  background-color: #a9a9a9;
  color: white;
  border-radius: 0 0 25px 25px;
  display: grid;
  place-items: center;
}
.edit{
  padding: 15px;
  background-color: #f44336;
  border-radius: 10px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.cost{
  margin-top: 15px;
  font-size: 30px;
  color: #f44336;
}

</style>