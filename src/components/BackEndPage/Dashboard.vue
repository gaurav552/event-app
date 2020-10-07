<template>
    Dashboard
    <router-link to="/">Home</router-link>
  <button @click="logout">Logout</button>
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
    }
  }
}
</script>

<style scoped>

</style>