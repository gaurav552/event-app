<template>
  <div class="userDetails">
    <AppHeader :Name="UName"></AppHeader>
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
import Header from "@/components/User/UserDetails/Header";
import SideBar from "@/components/User/UserDetails/SideBar";
import db from "@/firebaseInit";



export default {
name: "userDetails",
  components:{
    AppHeader:Header,
    SideBar:SideBar,
  },
  data(){
    return{
      UName:''
    }
  },
  methods:{

  },
  async mounted() {
    // console.log(firebase.auth().currentUser)
    db.collection('registered_users').where('email','==',firebase.auth().currentUser.email).get().then(
      qs =>{
        qs.forEach(doc=>{
          this.UName = doc.data().name.first+" "+doc.data().name.last
        })
      }
    )
    document.querySelector('body').setAttribute('data-theme','dashboard')
  },
  unmounted() {
    // clearInterval(this.interval)
    // document.querySelector('body').setAttribute('data-theme','light')
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
  overflow-y: scroll;
}

</style>












