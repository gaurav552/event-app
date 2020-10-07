<template>
  <form @submit.prevent="login" autocomplete="off">
    <label class="look">name <input type="email" v-model="faker"></label>
    <label><span>Email</span> <input type="email" v-model="email"></label>
    <label><span>Password</span> <input autocomplete="off" v-model="password" type="password"></label>
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
      faker:''
    }
  },
  methods:{
    login(){
      if(this.email !== '' && this.password !== '' && this.faker === ''){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() =>{
          this.$router.push({path: '/dashboard'})
        }, err=>{
          console.log(err)
        })
      }

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
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  margin: 20px;
  font-size: 20px;
}

button:active{
  box-shadow: none;
}

</style>








