<template>
  <div class="adminDashboard">
    <AppHeader>
      <template v-slot:title>PFC Admin Area</template>
      <template v-slot:user>Hello, {{UName}}</template>
    </AppHeader>
    <main>
      <SideBar></SideBar>
      <div class="content">
        <div class="bread">
          <div class="crumb">{{crumb}}</div>
          <div class="actions">
          </div>
        </div>

        <router-view v-if="isMounted"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import AdminSideBar from "@/components/BackEndPage/AdminSideBar";
import AdminHeader from "@/components/utils/Headers";

export default {
name: "Dashboard",
  components:{
    SideBar:AdminSideBar,
    AppHeader:AdminHeader,
  },
  data(){
    return{
      UName: firebase.auth().currentUser.displayName,
      isMounted:false,
      crumb: this.$route.name === 'Dashboard' ? this.$route.name : 'Dashboard / '+this.$route.name
    }
  },
  watch:{
    $route(to){
      this.crumb = to.name === 'Dashboard' ? to.name : 'Dashboard / '+to.name
    }
  },
  mounted() {
    this.isMounted = true
    document.querySelector('body').setAttribute('data-theme','dashboard')
  },
}
</script>

<style scoped>
.adminDashboard{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  font-family: 'Quicksand', sans-serif;
}

.crumb{
  padding: 20px 0;
}

.bread{
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  padding: 0 40px;
}

main{
  align-self: flex-end;
  display: flex;
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: hidden;
}
.content{
  padding: 40px;
  width: 100%;
  overflow-y: auto;
}

@media only screen and (max-width: 700px)  {
  .crumb{
    padding: 10px 0;
  }

  .content{
    padding: 10px;
  }
  main{
    height: calc(100vh - 80px);
  }

  .bread{
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>