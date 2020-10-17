<template>
  <div class="container">

    <div class="list-side">
      <div class="top-row">
        <h3>Guest List</h3>
        <label><input placeholder="search" v-model="search_query" type="text"></label>
      </div>

      <ul>
        <li>
          <span class="count">#</span>
          <span class="name">Name</span>
          <span class="email">Email</span>
          <span class="phone">Phone</span>
        </li>
        <li v-for="(guest,i) in render_list" :key="i" @click="clicker(i)">
          <span class="count">{{ i + 1 }}</span>
          <span class="name">{{ guest.name }}</span>
          <span class="email">{{ guest.email }}</span>
          <span class="phone">{{ guest.phone }}</span>
        </li>
      </ul>
    </div>

    <div class="form-side">
      <div class="top-row">
        <h3>Add Guests</h3>
      </div>
      <form @submit.prevent="submitter" ref="form">
        <label><span>Name</span><input v-model="newGuest.name" required type="text"></label>
        <label><span>Email</span><input v-model="newGuest.email" required type="text"></label>
        <label><span>Phone</span><input v-model="newGuest.phone" required type="text"></label>
        <label><span>Description</span> <textarea id="" v-model="newGuest.description" required cols="30" name="" rows="5"></textarea></label>
        <div class="buttons">
          <AppButton :type="'submit'">{{ selected.on? 'Update':'Submit' }}</AppButton>
          <AppButton v-if="selected.on" @click="canceller" type="button">Cancel</AppButton>
          <!--          <button v-if="selected.on" @click="canceller" type="button">Cancel</button>-->
        </div>
      </form>
    </div>
  </div>
  <teleport v-if="selected.on" to=".actions">
    <AppButton @click="deleter">Remove {{guests[selected.val].name}}</AppButton>
  </teleport>
<!--  <teleport to=".crumb">-->
<!--    Dashboard / Guests-->
<!--  </teleport>-->
</template>

<script>
import db from "@/firebaseInit";
import MyButton from "@/components/utils/MyButton";

export default {
  name: "GuestSpeakers",
  components:{
    AppButton:MyButton
  },
  data() {
    return {
      guests: [],
      search_query: '',
      newGuest: {
        name: '',
        email: '',
        phone: '',
        description: '',
        type: 'guest',
      },
      doc_id: [],
      selected: {
        on: false,
        val: ''
      }
    }
  },
  methods:{
    clicker(e){
      this.selected.on = true
      this.selected.val = e
      this.newGuest = this.guests[e]
    },
    deleter(){
      db.collection("vendors_and_guests").doc(this.doc_id[this.selected.val]).delete()
      this.resetGuest()
    },
    canceller(){
      this.resetGuest()
    },
    submitter(){

      if (this.selected){
        db.collection("vendors_and_guests").doc(this.doc_id[this.selected.val]).update(this.newGuest)
      } else {
        db.collection("vendors_and_guests").add(this.newGuest)
      }

      this.resetGuest()
    },
    resetGuest(){
      this.$refs.form.reset()
      this.newGuest = ''
      this.selected.val=''
      this.selected.on = false
    }
  },
  computed: {
    render_list() {
      if (this.search_query === '') {
        return this.guests
      } else {
        return this.guests.filter((item) => {
          return item.name.toLowerCase().startsWith(this.search_query.toLowerCase()) ||
            item.email.toLowerCase().startsWith(this.search_query.toLowerCase())
        })
      }
    }
  },
  mounted() {
    db.collection("vendors_and_guests").where('type', '==', 'guest').orderBy('name').onSnapshot(
      qs => {
        this.guests = []
        this.doc_id = []
        qs.forEach(doc => {
          this.guests.push(doc.data())
          this.doc_id.push(doc.id)
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
  width: 100%;
}

.list-side {
  flex: 1 0 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.form-side {
  flex: 1 0 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.top-row {
  padding: 20px;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 15px rgba(0, 0, 0, .04), 0 1px 6px rgba(0, 0, 0, .04);
}

.top-row h3 {
  margin: 10px 0;
}

.buttons{
  margin: 20px 0;
}

ul {
  margin: 20px;
}

li {
  list-style: none;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

form {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.count {
  flex: 0 0 5%;
}

.name {
  flex: 3 0 30%;
  margin: 0 5px;
}

.email {
  flex: 2 0 30%;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.phone {
  flex: 2 0 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

label {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

label span {
  flex: 1 0 30%;
}

label input, textarea {
  flex: 2 0 70%;
  padding: 5px 10px;
}

.top-row label {
  padding: 0;
}


@media only screen and (max-width: 1250px) {
  .container {
    flex-direction: column;
  }
}

@media only screen and (max-width: 700px) {
  ul {
    margin: 15px 5px;
  }

  li {
    padding: 5px;
  }

  span {
    font-size: 14px;
  }
}

@media only screen and (max-width: 500px) {
  .count {
    display: none;
  }
}

</style>