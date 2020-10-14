<template>
  <button class="home" @click="$router.push('/')"><span class="material-icons">home</span></button>
<div class="card">
  <div class="card-header">
    <h3>Login</h3>
  </div>
  <div class="card-body">
    <form autocomplete="off" @submit.prevent="login">
      <label class="look">name <input v-model="faker" type="email"></label>
      <label><span>Email</span> <input v-model="email" required type="email"></label>
      <label><span>Password</span> <input v-model="password" autocomplete="off" required type="password"></label>
      <button type="submit" class="submit">Submit</button>
    </form>
  </div>
</div>

</template>

<script>
import firebase from "firebase/app";

export default {
name: "Login",
  data() {
    return {
      email: '',
      password: '',
      faker: '',
    }
  },
  methods: {
    login() {
      if (this.email !== '' && this.password !== '' && this.faker === '') {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {

          this.$router.push({path: '/dashboard'})
        }, err => {
          console.log(err)
        })
      }
    }
  },
  beforeMount() {
    document.querySelector('body').setAttribute('data-theme','light')
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

.look{
  display: none;
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
}

.card-header{
  padding: 30px;
  display: grid;
  place-items: center;
  background-color: #f44336;
  color: white;
  border-radius: 25px 25px 0 0;
}

.card-body{
  width: 100%;
  padding: 20px 40px;
  /*margin-bottom: 40px;*/
}

form{
  display: flex;
  flex-direction: column;
  width: 100%;
}

label{
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
}

input{
  height: 40px;
  font-size: 20px;
  padding: 15px;
  margin: 10px 0;
  outline: none;
  border-radius: 5px;
  border: 2px solid #aaa;
}

input:focus{
  border: 2px solid #111;
}

.submit{
  height: 50px;
  border-radius: 10px;
  width: 200px;
  margin: 30px auto;
  align-self: center;
  background-color: #f44336;
  color: white;
  font-size: 18px;
}


</style>