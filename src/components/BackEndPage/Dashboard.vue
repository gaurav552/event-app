<template>
    Dashboard
    <router-link to="/">Home</router-link>
</template>

<script>
export default {
name: "Dashboard",
  created() {
    document.querySelector('body').setAttribute('data-theme','light')
  }
}
</script>

<style scoped>

</style>