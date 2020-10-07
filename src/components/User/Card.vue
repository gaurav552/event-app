<template>
  <form @submit.prevent="login" autocomplete="off">
    <label class="look">name <input type="email" v-model="faker"></label>
    <label><span>Email</span> <input type="email" required v-model="email"></label>
    <label><span>Password</span> <input autocomplete="off" required v-model="password" type="password"></label>
    <label v-if="routeRegister"><span>Re-Enter</span> <input required autocomplete="off" v-model="confirmPass" type="password"></label>
    <button>Submit</button>
  </form>
<!--  <button @click="withGoogle">Google</button>-->
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
name: "Card",
  data(){
    return{
      email:'',
      password:'',
      faker:'',
      confirmPass:'',
      routeRegister:false
    }
  },
  methods:{
    login(){
      if(this.email !== '' && this.password !== '' && this.faker === ''){
        if (this.routeRegister){
          if(this.password === this.confirmPass){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
              this.$router.go(-1)
              console.log("done")
            }, err => {
              console.log(err)
            })
          } else {
            console.log("password mis match")
          }
        } else {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() =>{
            this.$router.push({path: '/dashboard'})
          }, err=>{
            console.log(err)
          })
        }
      }
    }
  },
  beforeMount(){
    if (this.$route.name === 'Register'){
      this.routeRegister = true
    }
  }
}
</script>

<style scoped>

.look{
  display: none;
}

label{
  display: flex;
  width: 100%;
  margin: 15px auto;
  align-items: center;
}
span{
  flex: 1;
  font-size: 20px;
}

input{
  flex: 2;
  height: 40px;
  padding: 10px 20px;
  background: none;
  border: none;
  outline: none;
  border-bottom: 2px solid black;
}

input:focus{
  border-bottom: 2px solid blueviolet;
}

form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
}

button{
  width: 200px;
  height: 50px;
  background: none;
  border: none;
  outline: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
  margin: 20px;
  font-size: 20px;
}

button:active{
  box-shadow: none;
  background-color: #f1f1f1;
}

</style>








