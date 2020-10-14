<template>
  <div class="center-box">
    <img class="swing" src="/swing.svg" alt="">
    <img src="/ball.svg" alt="" class="ball">
    <img src="/flag.svg" alt="" class="flag">

    <div class="counter">
      <div class="box">{{ firstUnit }}</div>
      <div class="box">{{ lastUnit }}</div>
      <h3>Remaining</h3>
    </div>
  </div>
</template>

<script>

export default {
name: "CenterBox",
  props:['firstUnit','lastUnit']
}
</script>

<style scoped>

.center-box{
  width: min(90%, 900px);
  height: 300px;
  border-radius: 50px;
  margin-bottom: 50px;
  box-shadow: 7px 7px 15px rgb(17, 122, 9), -7px -7px 25px rgba(223, 223, 223, .15);
  position: relative;
}

.swing{
  position: absolute;
  right: 65%;
  bottom: 0;
  max-height: 70%;
}

.ball{
  position: absolute;
  max-height: 4%;
  bottom: 10px;
  left: 30%;
}

.flag{
  position: absolute;
  max-height: 30%;
  bottom: 0;
  left: 75%;
}

.counter{
  display: flex;
  width: 85%;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex-grow: 1;
}

.counter .box{
  background-color: #168216;
  width: 150px;
  height: 80px;
  margin: 30px 20px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  box-shadow: 0 6px 10px rgba(0,0,0,.16);
  position: relative;
  font-size: 19px;
  color: var(--color-frontEnd);
  font-weight: bold;
  text-align: center;
}

.counter .box span{
  position: absolute;
  top:50%;
  right: -30px;
}

h3{
  color: var(--color-frontEnd);
  font-weight: bolder;
  margin: 5px;
  font-size: clamp(18px, 2.5vw, 30px);
}

@media only screen and (max-width: 700px) {
  .center-box{
    height: 200px;
    /*margin: 15px auto;*/
  }
  .counter{
    width: 100%;
  }
  .counter .box{
    width: 120px;
    height: 50px;
    margin: 20px;
    border-radius: 10px;
  }
}

@media only screen and (max-width: 700px){
  img{
    display: none;
  }

  .center-box{
    margin-bottom: 30px;
    display: flex;
    height: 150px;
    border-radius: 15px;
  }

  .counter{
    height: 100%;
    justify-content: center;
  }
  .counter .box{
    font-size: 15px;
    width: 110px;
    height: 50px;
    margin: 15px;
  }
}

</style>