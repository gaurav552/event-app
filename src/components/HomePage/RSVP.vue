<template>
  <label for="email">Enter Your Email to RSVP</label>
  <input type="text" autocomplete="off" id="email">
  <app-round-btn class="submit" :link="false">
    <span class="material-icons">send</span>
  </app-round-btn>
</template>

<script>
import RoundButton from "@/components/utils/RoundButton";

export default {
name: "RSVP",
  components:{
    AppRoundBtn: RoundButton
  }
}
</script>

<style scoped>

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
    box-shadow: inset 7px 7px 15px rgb(17, 122, 9), inset -7px -7px 15px rgba(223, 223, 223, .15);
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

























