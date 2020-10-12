<template>
  <div class="card">
    <router-link to="/userDetails/payments">Payment</router-link>
  </div>
</template>

<script>
export default {
name: "UserDashboard"
}
</script>

<style scoped>
  .card{
    width: 100%;
    height: calc(100% - 80px);
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04);
  }
</style>