<template>
  <div class="container" v-if="loaded">
    <div class="card">
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
    </div>
  </div>
</template>

<script>
import db from "@/firebaseInit"
import {DateTime} from "luxon";

export default {
  name: "UserEventDetails",
  data() {
    return {
      eventDetails:{
        name:'',
        date:'',
        venue:'',
        description:''
      },
      loaded:false
    }
  },
  methods:{
    getFullDate(sec) {
      let dt = DateTime.fromSeconds(sec)
      return dt.toISODate()
    },
  },
  computed: {
    shoDat() {
      let dt = DateTime.fromISO(this.eventDetails.date)
      return dt.toLocaleString(DateTime.DATE_FULL)
    }
  },
  mounted() {
    db.collection('event_details').doc('event_details').get().then(
      doc=>{
        this.eventDetails = doc.data()
        this.eventDetails.date = this.getFullDate(doc.data().date.seconds)
        this.loaded = true
      }
    )
  }
}
</script>

<style scoped>

.container{
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
  align-items: flex-start;
}

.card{
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