<template>
  <div class="container" v-if="loaded">
    <div v-if="!editMode" class="card">
      <div class="heading">
        <h1>
          {{ eventDetails.name }}
        </h1>
        <p>
        <span class="left">
          {{ shoDat }}
        </span>
          <span class="right">
          {{ eventDetails.venue }}
        </span>
        </p>
      </div>
      <div class="card-body">
        <p>
          {{ eventDetails.details }}
        </p>
      </div>
      <div class="card-footer">
        <MyButton class="left-btn" @click="editMode = !editMode">Edit Event Details</MyButton>
      </div>
    </div>
    <form v-else @submit.prevent="submitter" class="card">
      <div class="card-header">
        <h1>Edit Details</h1>
      </div>
      <label><span>Name</span><input v-model="eventDetails.name" type="text"></label>
      <label><span>Date</span><input v-model="eventDetails.date" type="date"></label>
      <label><span>Venue</span><input v-model="eventDetails.venue" type="text"></label>
      <label><span>Name</span><textarea id="" v-model="eventDetails.details" cols="30" name=""
                                        rows="10"></textarea></label>
<!--      <button type="submit">Submit</button>-->
      <div class="buttons">
        <MyButton :type="'submit'">Submit</MyButton>
        <MyButton type="button" @click="editMode = !editMode">Cancel</MyButton>
      </div>

    </form>
  </div>
</template>

<script>
import db from "@/firebaseInit";
import {DateTime} from "luxon";
import MyButton from "@/components/utils/MyButton";

export default {
  name: "EventDetails",
  components:{
    MyButton
  },
  data() {
    return {
      editMode: false,
      eventDetails: {
        name: '',
        date: '',
        venue: '',
        details: ''
      },
      loaded:false
    }
  },

  methods: {
    getFullDate(sec) {
      let dt = DateTime.fromSeconds(sec)
      return dt.toISODate()
    },
    submitter(){
      let dt = DateTime.fromISO(this.eventDetails.date)
      this.eventDetails.date = {
        nanoseconds:0,
        seconds:dt.toSeconds()
      }

      db.collection('event_details').doc('event_details').update(this.eventDetails)
      this.editMode = !this.editMode
    }
  },
  computed: {
    shoDat() {
      let dt = DateTime.fromISO(this.eventDetails.date)
      return dt.toLocaleString(DateTime.DATE_FULL)
    }
  },
  mounted() {
    db.collection('event_details').doc('event_details').onSnapshot(
      doc => {
        this.eventDetails = doc.data()
        this.eventDetails.date = this.getFullDate(doc.data().date.seconds)
        this.loaded = true
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
  flex: 0 1 55%;
  background-color: white;
  border-radius: 15px;
  max-width: 700px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  margin: 0 auto;
}

.left-btn{
  margin: 20px 0 0 0;
}

.buttons{
  margin-top: 20px;
}

.card-header {
  display: grid;
  place-items: center;
  padding: 0 20px 20px 20px;
}

.right {
  text-align: right;
}

label {
  margin: 5px 0;
  display: flex;
  align-items: center;
}

label input, label textarea {
  flex: 1 0 80%;
  padding: 5px 10px;
}

label span {
  flex: 1 0 20%;
}

.heading {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.heading h1 {
  font-size: clamp(25px, 3vw, 34px);
  color: #f44336;
  text-align: center;
}

.heading p {
  display: flex;
  font-size: clamp(15px, 3vw, 18px);
  margin: 20px 0;
  justify-content: space-between;
}

.card-body{
  margin-bottom: 20px;
}

.card-body p{
  white-space: pre-wrap;
}

@media only screen and (max-width: 1050px) {
  .card {
    flex: 1 1 100%;
    margin: 10px;
  }

  .container {
    margin: 0;
  }
}
</style>