<template>
  <div class="center-box">

  </div>
</template>

<script>
export default {
name: "CenterBox"
}
</script>

<style scoped>

.center-box{
  width: min(90%, 900px);
  height: 300px;
  border-radius: 50px;
  margin-bottom: 50px;
  box-shadow: 7px 7px 15px rgb(17, 122, 9), -7px -7px 15px rgba(223, 223, 223, .15);
}

@media only screen and (max-width: 700px) {
  .center-box{
    height: 200px;
    /*margin: 15px auto;*/
  }
}

</style>