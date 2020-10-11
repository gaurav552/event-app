<template>
  <button class="home" @click="$router.push('/')"><span class="material-icons">cancel</span></button>
  <div class="card">
    <keep-alive>
      <component :userData="userValues"
                 @go-to="toPayment"
                 :is="formLoaded"
      ></component>
    </keep-alive>
  </div>
</template>

<script>

import RegistrationForm from "@/components/User/RegistrationForm";
import PaymentForm from "@/components/User/PaymentForm";

export default {
name: "Register",
  components:{
    RegistrationForm:RegistrationForm,
    PaymentForm:PaymentForm,
  },
  data(){
    return{
      paidFor:false,
      loaded:false,
      purchase:{
        price:0,
        description:'',
      },
      onPayment:false,
      formLoaded:'RegistrationForm',
      userValues:null
    }
  },
  methods:{
    toPayment(e){
      if(e.gotoPayment){
        this.onPayment = true
        this.formLoaded = 'PaymentForm'
        this.userValues = e
      } else {
        this.onPayment = false
        this.formLoaded = 'RegistrationForm'
        this.userValues = null
      }
      // console.log(e)
    }
  },
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

.home{
  position: fixed;
  margin: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card{
  display: flex;
  flex-direction: column;
  width: min(40%, 450px);
  padding: 0;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  font-family: 'Quicksand', sans-serif;
  max-height: 70vh;
}
</style>