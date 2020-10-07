<template>

  <router-link :to="path" v-if="link">
    <slot></slot>
  </router-link>

  <button type="button" v-else>
    <slot></slot>
  </button>

</template>

<script>
export default {
name: "RoundButton",
  props:{
    link: {
      type:Boolean,
      required:true
    },
    path:String
  }
}
</script>

<style scoped>
  a, button{
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--bg-frontEnd);
    color: var(--color-frontEnd);
    text-decoration: none;
    box-shadow: 7px 7px 15px rgb(17, 122, 9), -7px -7px 15px rgba(223, 223, 223, .15);
    cursor: pointer;
    border: none;
    outline: none;
  }

  a:active,button:active{
    box-shadow: none;
    background-color: green;
  }

  @media only screen and (max-width: 700px) {
    a, button{
      width: 40px;
      height: 40px;
    }
  }

</style>