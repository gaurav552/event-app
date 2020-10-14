<template>
  <button class="btn-big" @click="logout">Sign Out</button>
  <button class="btn-sm" @click="logout">
    <span class="material-icons">
      logout
    </span>
  </button>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "SignOutButton",
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    }
  },
}
</script>

<style scoped>
button {
  background-color: #f44336;
  border: none;
  outline: none;
  padding: 15px;
  border-radius: 5px;
  color: white;
  margin-left: 15px;
  box-shadow: 0 2px 2px 0 rgba(156, 39, 176, .14), 0 3px 1px -2px rgba(156, 39, 176, .2), 0 1px 5px 0 rgba(156, 39, 176, .12);
}

button:hover {
  box-shadow: 0 14px 26px -12px rgba(244, 67, 54, .42), 0 4px 23px 0 rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(244, 67, 54, .2);;
}

button:active {
  background-color: #ea1c0d;
  box-shadow: none;
}

.btn-sm{
  display: none;
}

@media only screen and (max-width: 700px) {
  .btn-big{
    display: none;
  }
  .btn-sm{
    display: block;
    padding: 10px;
    margin-left: 10px;
  }

  .btn-sm .material-icons{
    font-size: 18px;
  }
}
</style>