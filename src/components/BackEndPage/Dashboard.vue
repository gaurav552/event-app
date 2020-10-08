<template>
    Dashboard
    <router-link to="/">Home</router-link>
  <router-link to="/register">register</router-link>
  <button @click="logout">Logout</button>
  <button @click="showId">show id</button>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
name: "Dashboard",
  methods:{
    logout(){
      firebase.auth().signOut().then(()=>{
        this.$router.push({name: 'Home'})
      })
    },
    showId(){
      console.log(firebase.auth().currentUser.uid)
    }
  }
}
</script>

<style scoped>

</style>