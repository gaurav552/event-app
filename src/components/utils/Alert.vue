<template>
  <p>
    <slot></slot>
  </p>
</template>

<script>
export default {
name: "Alert"
}
</script>

<style scoped>
  p{
    position: fixed;
    bottom: 20px;
    left:0;
    right: 0;
    width: max-content;
    margin: 0 auto;
    font-size: 20px;
    padding: 20px 30px;
    background-color: #e9c16a;
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba(0,0,0,.2);
  }
  @media only screen and (max-width: 700px){
    p{
      font-size: 15px;
      padding: 12px 18px;
    }
  }
</style>