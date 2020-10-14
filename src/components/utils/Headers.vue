<template>
  <header>
    <div class="heading">
      <button class="sidebar" @click="sidebar">
        <span class="material-icons">{{ icon }}</span>
      </button>
      <h1> <router-link to="/">
        <slot name="title"></slot>
      </router-link> </h1>
    </div>
    <div class="userInfo">
      <p class="userName"><slot name="user"></slot></p>
      <SignOutBtn></SignOutBtn>
    </div>
  </header>
</template>

<script>
import SignOutButton from "@/components/utils/SignOutButton";

export default {
name: "AdminHeader",
  components:{
    SignOutBtn:SignOutButton
  },
  data(){
    return{
      open:false,
      icon:'menu'
    }
  },
  methods:{
    sidebar(){
      if(this.open){
        document.querySelector('#sidebar').style.display='none'
        this.icon = 'menu'
      } else {
        document.querySelector('#sidebar').style.display='block'
        document.querySelector('#sidebar').style.position='fixed'

        this.icon = 'close'
      }
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: clamp(18px, 3vw, 23px);
  text-align: left;
}

a{
  text-decoration: none;
}

p {
  font-size: clamp(15px,3vw, 18px);
}

header {
  z-index: 10;
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

.heading{
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar{
  display: none;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  border: none;
  outline: none;
  background: none;
}

.userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
}

@media only screen and (max-width: 700px)  {
  header{
    padding: 20px;
    height: 80px;
  }
  .sidebar{
    display: grid;
  }
}

@media only screen and (max-width: 550px)  {

}
</style>