<template>

  <img class="blob" height="700" style="left: 3%;top: 60%" :src="rand()" alt="">
  <img class="blob" height="400" style="left: 39%;top:36%" :src="rand()" alt="">
  <img class="blob" height="700" style="left: 0;top:-36%" :src="rand()" alt="">
  <img class="blob" height="700" style="left: 70%;top:-36%" :src="rand()" alt="">

  <app-round-btn :link="true" :path="'/dashboard'" class="loginBtn">
      <span class="material-icons">
        login
      </span>
  </app-round-btn>

  <main>
    <div class="heading">
      <h3>Physiotherapy Foundation of Canada </h3>
      <h1>Golf Tournament Event</h1>
    </div>

    <app-center-box :first-unit="firstUnit" :last-unit="lastUnit"></app-center-box>

    <div class="rsvp">
      <app-r-s-v-p></app-r-s-v-p>
    </div>
  </main>

  <app-round-btn :link="false" class="infoBtn">
      <span class="material-icons">
        info
      </span>
  </app-round-btn>

</template>

<script>
import RoundButton from "@/components/utils/RoundButton";
import RSVP from "@/components/HomePage/RSVP";
import CenterBox from "@/components/HomePage/CenterBox";
import countdown from "countdown";

export default {
  name: "HomePage",
  components: {
    AppRoundBtn: RoundButton,
    AppRSVP:RSVP,
    AppCenterBox: CenterBox,
  },
  data(){
    return{
      firstUnit:'',
      lastUnit:'',
      showAlert:false,
      interval:null
    }
  },
  methods:{
    rand(){
      return '/blob'+Math.floor((Math.random()*6+1))+'.svg'
    }
  },
  computed:{
  },
  beforeMount() {
    this.interval = setInterval(()=>{
      let timer = countdown( null,new Date("2021/03/14"),20,2).toString()
      this.firstUnit = timer.split(" and ")[0]
      this.lastUnit = timer.split(" and ")[1]
    },1000)
  },
  created() {
    document.querySelector('body').setAttribute('data-theme','green')
  },
  unmounted() {
    clearInterval(this.interval)
    //
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');


.material-icons {
  font-size: 20px;
}

.loginBtn {
  position: fixed;
  top: 50px;
  right: 50px;
}

.infoBtn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}

main{
  font-family: 'Raleway', sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: max(100%, 400px);
  width: 90%;
}

main .heading{
  text-align: center;
  color: var(--color-frontEnd);
  margin-bottom: 50px;
}

main .heading h3{
  font-size: clamp(18px, 2.5vw, 35px);
  margin: 10px auto;
}

main .heading h1{
  font-size: clamp(25px, 5vw, 60px);
}

.rsvp{
  width: 100%;
}

.blob{
  position: fixed;
  z-index: -1;
  opacity: .5;
}


@media only screen and (max-width: 700px) {
  .loginBtn {
    top: revert;
    bottom: 20px;
    left: 20px;
  }

  .infoBtn {
    bottom: 20px;
    right: 20px;
  }

  .material-icons {
    font-size: 16px;
  }

  main .heading{
    margin-bottom: 30px;
  }
}

</style>

















