<template>
  <header>
    <div class="heading">
      <h1> <router-link to="/">PFC</router-link> </h1>
    </div>
    <div class="userInfo">
      <p class="userName">Hello, {{ Name.split(' ',1).join() }}</p>
      <SignOutBtn></SignOutBtn>
    </div>
  </header>
</template>

<script>
import SignOutButton from "@/components/utils/SignOutButton";
// import firebase from "firebase/app";

export default {
  name: "Header",
  components: {
    SignOutBtn: SignOutButton
  },
  props:['Name'],
  data() {
    return{

    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 23px
}

a{
  text-decoration: none;
}

p {
  font-size: 18px
}

header {
  position: fixed;
  width: 100%;
  height: 120px;
  background-color: #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, .04), 0 1px 6px rgba(0, 0, 0, .04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 80px;
}

.userInfo {
  display: flex;
  align-items: center;
}
</style>