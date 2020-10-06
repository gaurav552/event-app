<template>
  <form id="rsvp-form" @submit.prevent="saveEmail">
    <input type="text" class="squad" v-model="fakeEmail">
    <label for="email">Enter Your Email to RSVP</label>
    <input required type="email" autocomplete="off" v-model="trueEmail" id="email">
    <app-round-btn @click="saveEmail" class="submit" :link="false">
      <span class="material-icons">send</span>
    </app-round-btn>

  </form>
</template>

<script>
import RoundButton from "@/components/utils/RoundButton";
import db from "@/firebaseInit";

export default {
name: "RSVP",
  components:{
    AppRoundBtn: RoundButton
  },
  data(){
    return{
      fakeEmail:'',
      trueEmail:''
    }
  },
  methods:{
    saveEmail(){
      // console.log('akskk')
      if(this.fakeEmail === "" && this.trueEmail !== ""){
        db.collection("emails_collections").add({
          email:this.trueEmail,
          mail_sent:false
        }).then((resp)=>{
          console.log(resp)
        })
      }
    }
  }
}
</script>

<style scoped>

.squad{
  display: none;
}

form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
  label{
    margin: 25px auto;
    color: var(--color-frontEnd);
    font-size: 25px;
  }

  input{
    width: min(600px, 70%);
    padding: 15px 25px;
    color: var(--color-frontEnd);
    font-size: 20px;
    height: 60px;
    border-radius: 50px;
    outline: none;
    background: var(--bg-frontEnd);
    border: none;
    box-shadow: 7px 7px 15px rgb(17, 122, 9), -7px -7px 15px rgba(223, 223, 223, .15);
  }

  input:focus{
    transition: none;
    box-shadow: none;
    border:2px solid #aaa;
  }

  .submit{
    margin: 25px;
  }

  .material-icons {
    font-size: 20px;
  }

  @media only screen and (max-width: 700px) {
    .material-icons {
      font-size: 16px;
    }

    label{
      margin: 20px 25px;
    }

    input{
      height: 45px;
    }
  }

</style>

























