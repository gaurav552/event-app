<template>
  details here
  <button @click="logout">logout</button>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
name: "userDetails",
  methods:{
    logout(){
      firebase.auth().signOut().then(()=>{
        this.$router.push({name: 'Home'})
      })
    },
  }
}
</script>

<style scoped>

</style>