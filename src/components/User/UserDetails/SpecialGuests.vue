<template>
  <div class="container" v-if="guests.length > 0">
    <div class="card">
      <div class="heading">
        <h1>
          {{ display_guest.name }}
        </h1>
        <p>
        <span class="left">
          {{ display_guest.email }}
        </span>
          <span class="right">
            {{ display_guest.phone }}
        </span>
        </p>
      </div>
      <div class="card-body">
        <p>
          {{ display_guest.description }}
        </p>
      </div>
      <div class="card-footer">
        <MyButton @click="changer(false)"><i class="material-icons">navigate_before </i></MyButton>
        {{navValue}}
        <MyButton @click="changer(true)"><i class="material-icons">navigate_next</i></MyButton>
      </div>
    </div>
  </div>
</template>

<script>

import db from "@/firebaseInit";
import MyButton from "@/components/utils/MyButton";

export default {
  name: "SpecialGuests",
  components:{
    MyButton
  },
  data() {
    return {
      guests: [],
      display_guest: {
        name: '',
        email: '',
        phone: '',
        description: ''
      },
      currentGuest: null,
      navValue:""
    }
  },
  watch:{
    'currentGuest'(){
      this.display_guest = this.guests[this.currentGuest]
      this.navValue = (this.currentGuest+1)+' / '+this.guests.length
    }
  },
  methods:{
    changer(next){
      if (next){
        if (this.currentGuest < (this.guests.length - 1)){
          this.currentGuest++
        }
      } else {
        if (this.currentGuest > 0){
          this.currentGuest--
        }
      }
    }
  },
  mounted() {
    db.collection('vendors_and_guests').where('type', '==', 'guest').orderBy('name').onSnapshot(
      qs => {
        this.guests = []
        qs.forEach(doc => {
          this.guests.push(doc.data())
          this.currentGuest = 0
          this.display_guest = this.guests[this.currentGuest]

        })
      }
    )
  }
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
  align-items: flex-start;
}

.card {
  flex: 0 0 60%;
  margin: 20px auto;
  max-width: 700px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.heading {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.heading h1 {
  font-size: clamp(28px, 3vw, 38px);
  color: #f44336;
  text-align: center;
}

.heading p {
  display: flex;
  font-size: clamp(15px, 3vw, 18px);
  margin: 20px 0;
  justify-content: space-between;
}

.card-body {
  margin-bottom: 20px;
}

.card-body p{
  white-space: pre-wrap;
  font-size: clamp(14px, 3vw,18px);
  line-height: clamp(23px, 3vw, 27px);
}

.card-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-footer button{
  margin: 0;
  display: grid; place-items: center;
}

@media only screen and (max-width: 900px) {
  .card {
    flex: 1 1 100%;
    margin: 10px;
  }

  .container {
    margin: 0;
  }
}

</style>