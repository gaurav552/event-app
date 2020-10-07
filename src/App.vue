<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
:root{
  --bg-frontEnd:#F7F7F7;
  --color-frontEnd:#00365A;
}

[data-theme='green']{
  --bg-frontEnd:#2C8B36;
  --color-frontEnd:#D5D5D5;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all .3s ease-out;
}

body{
  background-color: var(--bg-frontEnd);
  height: 100vh;
  min-height: 720px;
  /*min-width: 475px;*/
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

#app{
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
