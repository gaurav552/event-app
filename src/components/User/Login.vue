<template>
<div class="card">
  <AppCard></AppCard>
</div>
</template>

<script>
import Card from "@/components/User/Card";

export default {
name: "Login",
  components:{
    AppCard:Card
  },
}
</script>

<style scoped>
.card{
  width: max(40%, 450px);
  height: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  border-radius: 25px;
  display: grid;
  place-items: center;
  padding: 30px 60px;
  font-family: 'Roboto', sans-serif
}
</style>