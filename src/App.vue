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
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
:root{
  --bg-frontEnd:#F7F7F7;
  --color-frontEnd:#00365A;
}

[data-theme='green']{
  --bg-frontEnd:#2C8B36;
  --color-frontEnd:#D5D5D5;
}

[data-theme='dashboard']{
  --bg-frontEnd:#f8f8f8;
  --color-frontEnd:#212121;
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

.bg-login{
  background-color: #eee;
}

#app{
  height: 100%;
  display: grid;
  place-items: center;
}

</style>
