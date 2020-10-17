<template>
  <div class="container">

    <div class="list-side">
      <div class="top-row">
        <h3>Vendor List</h3>
        <label><input v-model="search_query" placeholder="search" type="text"></label>
      </div>

      <ul>
        <li>
          <span class="count">#</span>
          <span class="name">Name</span>
          <span class="uid">Contact</span>
          <span class="email">Email</span>
          <span class="phone">Phone</span>
        </li>
        <li v-for="(vendor,i) in render_list" :key="i" @click="clicker(i)">
          <span class="count">{{ i + 1 }}</span>
          <span class="name">{{ vendor.name }}</span>
          <span class="uid">{{ vendor.contact_person }}</span>
          <span class="email">{{ vendor.email }}</span>
          <span class="phone">{{ vendor.phone }}</span>
        </li>
      </ul>
    </div>

    <div class="form-side">
      <div class="top-row">
        <h3>Add Vendors</h3>
      </div>
      <form @submit.prevent="submitter" ref="form">
        <label><span>Vendor Name</span><input v-model="newVendor.name" required type="text"></label>
        <label><span>Contact Person</span><input v-model="newVendor.contact_person"  required type="text"></label>
        <label><span>Business Email</span><input v-model="newVendor.email"  required type="text"></label>
        <label><span>Business Phone</span><input v-model="newVendor.phone"  required type="text"></label>
        <label><span>St. Address</span><input v-model="newVendor.address.street"  required type="text"></label>
        <label><span>City</span><input required v-model="newVendor.address.city"  type="text"></label>
        <label><span>State</span><input required v-model="newVendor.address.state"  type="text"></label>
        <label><span>Country</span><input required v-model="newVendor.address.country"  type="text"></label>
        <div class="buttons">
          <AppButton :type="'submit'">{{ selected.on? 'Update':'Submit' }}</AppButton>
          <AppButton v-if="selected.on" @click="canceller" type="button">Cancel</AppButton>
<!--          <button v-if="selected.on" @click="canceller" type="button">Cancel</button>-->
        </div>
      </form>
    </div>
  </div>

  <teleport v-if="selected.on" to=".actions">
    <AppButton @click="deleter">Delete {{vendors[selected.val].name}}</AppButton>
<!--    <button @click="deleter">Delete {{vendors[selected.val].name}}</button>-->
  </teleport>

</template>

<script>
import db from "@/firebaseInit"
import MyButton from "@/components/utils/MyButton";

export default {
  name: "VendorsView",
  components:{
    AppButton:MyButton
  },
  data() {
    return {
      vendors: [],
      search_query: '',
      newVendor:{
        name:'',
        email:'',
        phone:'',
        address:{
          street:'',
          city:'',
          state:'',
          country:''
        },
        type: 'vendor',
        contact_person:''
      },
      doc_id:[],
      selected:{
        on:false,
        val:''
      }
    }
  },
  methods:{
    clicker(e){
      this.selected.on = true
      this.selected.val = e
      this.newVendor = this.vendors[e]
      // console.log(this.vendors)
    },
    deleter(){
      db.collection('vendors_and_guests').doc(this.doc_id[this.selected.val]).delete()
      this.resetVendor()
    },
    canceller(){
      this.resetVendor()
      db.collection('vendors_and_guests').where('type','==','vendor').orderBy('name').get().then(
        qs=>{
          this.vendors = []
          this.doc_id = []
          qs.forEach(doc=>{
            this.vendors.push(doc.data())
            this.doc_id.push(doc.id)
          })
        }
      )
    },
    submitter(){
      if (this.selected.on){
        db.collection('vendors_and_guests').doc(this.doc_id[this.selected.val]).update(this.newVendor)
      } else {
        db.collection('vendors_and_guests').add(this.newVendor)
      }
      this.resetVendor()
    },
    resetVendor(){
      this.$refs.form.reset()
      this.newVendor.name = ''
      this.newVendor.email = ''
      this.newVendor.phone = ''
      this.newVendor.contact_person = ''
      this.newVendor.address.country = ''
      this.newVendor.address.state = ''
      this.newVendor.address.city = ''
      this.newVendor.address.street = ''

      this.selected.val=''
      this.selected.on = false

    }
  },
  computed: {
    render_list() {
      if (this.search_query === '') {
        return this.vendors
      } else {
        return this.vendors.filter((item) => {
          return item.name.toLowerCase().startsWith(this.search_query.toLowerCase()) ||
            item.email.toLowerCase().startsWith(this.search_query.toLowerCase()) ||
            item.contact_person.toLowerCase().startsWith(this.search_query.toLowerCase())
        })
      }
    }
  },
  mounted() {
    db.collection("vendors_and_guests").where('type', '==', 'vendor').
    orderBy('name').onSnapshot(
      qs => {
        this.vendors = []
        this.doc_id = []
        qs.forEach(doc => {
          this.vendors.push(doc.data())
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
  flex: 0 0 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}

.form-side {
  flex: 0 0 50%;
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

ul {
  margin: 20px;
  overflow-x: auto;
}

li {
  min-width: 800px;
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
  flex: 2 0 25%;
  margin: 0 5px;
}

.email {
  flex: 2 0 25%;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.phone {
  flex: 2 0 15%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uid {
  flex: 2 0 25%;
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

label input {
  flex: 2 0 70%;
  padding: 5px 10px;
}

.top-row label {
  padding: 0;
}

.buttons{
  margin: 20px 0;
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