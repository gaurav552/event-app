<template>
  <div class="container">

    <div class="list-side">
      <div class="top-row">
        <h3>Admin List</h3>
        <label><input v-model="search_query" placeholder="search" type="text"></label>
      </div>

      <ul>
        <li>
          <span class="count">#</span>
          <span class="name">Name</span>
          <span class="email">Email</span>
          <span class="uid">UID</span>
        </li>
        <li :key="i" @click="editor(i)" v-for="(user,i) in render_list">
          <span class="count">{{i+1}}</span>
          <span class="name">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
          <span class="uid">{{ user.uid }}</span>
        </li>
      </ul>
    </div>

    <div class="form-side">
      <div class="top-row">
        <h3>{{ edit_delete_mode.on ? 'Edit' : 'Add New' }} Admin</h3>
      </div>
      <form @submit.prevent="submitter">
        <label><span>Name</span><input required v-model="name" type="text" ></label>
        <label><span>Email</span><input required v-model="email" type="text" ></label>
        <label><span>Password</span><input required v-model="password" type="password" ></label>
        <div class="buttons">
          <button type="submit">{{ edit_delete_mode.on ? 'Update' : 'Submit' }}</button>
          <button v-if="edit_delete_mode.on" type="button">Delete Admin</button>
          <button v-if="edit_delete_mode.on" @click="cancelEdit" type="button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from "@/firebaseInit"

export default {
  name: "AdminsView",
  data() {
    return{
      search_query:'',
      users:[],
      name:'',
      email:'',
      password:'',
      edit_delete_mode: {
        on:false,
        val:''
      }
    }
  },
  computed:{
    render_list(){
      if(this.search_query === ''){
        return this.users
      } else {
        return this.users.filter((item)=>{
          return item.name.toLowerCase().startsWith(this.search_query.toLowerCase())||  item.email.toLowerCase().startsWith(this.search_query.toLowerCase())
        })
      }
    }
  },
  methods:{

    cancelEdit(){
      this.edit_delete_mode.on = false
      this.edit_delete_mode.val = ''
    },
    editor(i){
      this.edit_delete_mode.on = true
      this.edit_delete_mode.val = i
    },
    submitter(e){

      e.currentTarget.reset()

      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        prompt("Enter our Password to proceed")
      );
      user.reauthenticateWithCredential(credential).then(() =>{

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(res=>{
          db.collection("admin_uid").add({
            name:this.name,
            email:this.email,
            uid:res.user.uid
          }).then(()=>{
            let data = {
              name:this.name,
              email:this.email,
              uid:res.user.uid
            }
            this.users.push(data)
            this.users.sort((a,b)=>{
              let n1 = a.name
              let n2 = b.name

              if (n1 < n2) {
                return -1;
              }
              if (n1 > n2) {
                return 1;
              }

              return 0;
            })

            this.email = ''
            this.password = ''
            this.name = ''

            const tempu = firebase.auth().currentUser;
            return tempu.updateProfile({
              displayName: this.users.name
            })

          }).then(()=>{
            firebase.auth().signOut()
          })
        })

      }).then(()=>{
        user.reauthenticateWithCredential(credential);
      })

    }
  },
  mounted() {
    db.collection("admin_uid").orderBy('name').get().then(
      qs=>{
        qs.forEach( doc =>{
          this.users.push(doc.data())
        } )
      }
    )
  }
}
</script>

<style scoped>

.container{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.list-side{
  flex: 1 0 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.form-side{
  flex: 1 0 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.top-row{
  padding: 20px;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 15px rgba(0, 0, 0, .04), 0 1px 6px rgba(0, 0, 0, .04);
}

.top-row h3{
  margin: 10px 0;
}

ul{
  margin: 20px;
}

li{
  list-style: none;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

form{
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.count{
  flex: 1 0 10%;
}

.name{
  flex: 3 0 20%;
  margin: 0 5px;
}
.email{
  flex: 3 0 30%;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uid{
  flex: 2 0 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

label{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

label span{
  flex: 1 0 30%;
}

label input{
  flex: 2 0 70%;
  padding: 5px 10px;
}

.top-row label{
  padding: 0;
}

button{
  margin: 20px 0;
  padding: 10px 20px;
  width: max-content;
}

@media only screen and (max-width: 1250px) {
  .container{
    flex-direction: column;
  }
}

@media only screen and (max-width: 700px) {
  ul{
    margin: 15px 5px;
  }

  li{
    padding: 5px;
  }

  span{
    font-size: 14px;
  }
}

@media only screen and (max-width: 500px){
  .count{
    display: none;
  }
}

</style>