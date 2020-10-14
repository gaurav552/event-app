<template>
  <div class="card">
    <div class="heading">Congratulations!!!</div>
    <span>
      You have been successfully registered to attend to golf tournament event.
      <br>
      See you Soon
    </span>
    <div class="buttons">
      <router-link to="/"><i class="material-icons">home</i>Back Home</router-link>
      <router-link to="/userDetails"><i class="material-icons">list</i>View Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
name: "OrderComplete",
  methods:{
    homer(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.card{
  display: flex;
  flex-direction: column;
  width: min(80%, 450px);
  height: min(70%, 400px);
  border-radius: 25px;
  background-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  font-family: 'Quicksand', sans-serif;
  max-height: 70vh;
  text-align: center;
  margin: 20px;
  padding: 60px 40px;
  justify-content: space-between;
}

.heading{
  font-size: clamp(25px,3vw,30px);
  color: white;
  font-weight: 600;
  margin-bottom: 40px;
}

span{
  font-size: clamp(16px,3vw,20px);
  color: white;
  line-height: 30px;
}

.buttons{
  margin: 40px 20px 0;
  display: flex;
  width: calc(100% - 40px);
  justify-content: space-between;
}

a{
  background-color: white;
  border: none;
  outline: none;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
a i{
  padding-right: 10px;
}
a:active,a:focus{
  box-shadow: none;
  background-color: #ddd;
}

@media only screen and (max-width: 700px){
  .card{
    padding: 40px 20px;
  }
  .buttons{
    flex-direction: column;
  }
  a{
    font-size: 15px;
    margin: 10px auto;
    padding: 10px;
  }
  a i{
    padding-right: 5px;
  }
  a i{
    font-size: 20px;
  }
}

</style>