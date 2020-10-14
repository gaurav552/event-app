<template>
  <div class="userDetails">
    <AppHeader>
      <template v-slot:title>PFC</template>
      <template v-slot:user>Hello, {{ UName}}</template>
    </AppHeader>
    <main>
      <SideBar></SideBar>
      <div class="content">
        <div class="crumb">Dashboard</div>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import SideBar from "@/components/User/UserDetails/SideBar";
import Headers from "@/components/utils/Headers";



export default {
name: "userDetails",
  components:{
    AppHeader:Headers,
    SideBar:SideBar,
  },
  data(){
    return{
      UName: firebase.auth().currentUser.displayName
    }
  },
  methods:{

  },
  mounted() {
    document.querySelector('body').setAttribute('data-theme','dashboard')
  },
  unmounted() {
  }
}
</script>

<style scoped>

.userDetails{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  font-family: 'Quicksand', sans-serif;
}

main{
  align-self: flex-end;
  display: flex;
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: hidden;
}

.crumb{
  padding: 20px 0;
  margin-left: 20px;
}

.content{
  padding: 40px;
  width: 100%;
  overflow-y: auto;
}

@media only screen and (max-width: 700px)  {
  .crumb{
    padding: 10px 0 0 0;
    margin-left: 20px;
  }

  .content{
    padding: 10px;
  }
  main{
    height: calc(100vh - 80px);
  }
}

</style>












