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
        <li v-for="(user,i) in render_list" :key="i">
          <span class="count">{{ i + 1 }}</span>
          <span class="name">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
          <span class="uid">{{ user.uid }}</span>
        </li>
      </ul>
    </div>

    <div class="form-side">
      <div class="top-row">
        <h3>Add Admin</h3>
      </div>
      <form @submit.prevent="submitter">
        <label><span>Name</span><input v-model="name" required type="text"></label>
        <label><span>Email</span><input v-model="email" required type="text"></label>
        <label><span>Password</span><input v-model="password" required type="password"></label>
        <div class="buttons">
          <AppButton :type="'submit'">Submit</AppButton>
        </div>
      </form>
    </div>
  </div>

  <teleport to=".actions">
      <AppButton @click="deleter">Delete Your Admin Account</AppButton>
  </teleport>

</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from "@/firebaseInit"
import MyButton from "@/components/utils/MyButton";

export default {
  name: "AdminsView",
  components:{
    AppButton:MyButton
  },
  data() {
    return {
      search_query: '',
      users: [],
      name: '',
      email: '',
      password: '',
    }
  },
  computed: {
    render_list() {
      if (this.search_query === '') {
        return this.users
      } else {
        return this.users.filter((item) => {
          return item.name.toLowerCase().startsWith(this.search_query.toLowerCase()) || item.email.toLowerCase().startsWith(this.search_query.toLowerCase())
        })
      }
    }
  },
  methods: {
    deleter(){
      let user = firebase.auth().currentUser
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        prompt("Enter our Password to proceed")
      );
      user.reauthenticateWithCredential(credential).then(()=>{
        user.delete().then(()=>{
          db.collection("admin_uid").where('uid','==',user.uid).get().then(
            qs =>{
              qs.forEach(doc=>{
                doc.ref.delete()
              })
            }
          )
        })
      }).then(()=>{
        firebase.auth().signOut()
        this.$router.push('/')
      })

    },
    submitter(e) {

      e.currentTarget.reset()

      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        prompt("Enter our Password to proceed")
      );

      user.reauthenticateWithCredential(credential).then(() => {

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).
        then(res => {
          db.collection("admin_uid").add({
            name: this.name,
            email: this.email,
            uid: res.user.uid
          }).then((docRef) => {
            docRef.get().then((doc)=>{
              this.users.push(doc.data())
              firebase.auth().currentUser.updateProfile({
                displayName: doc.data().name
              })
            }).then(()=>{
              firebase.auth().signOut()
            })

            this.email = ''
            this.password = ''
            this.name = ''
          })
        })
      }).then(() => {
        user.reauthenticateWithCredential(credential);
      })

    }
  },
  mounted() {
    db.collection("admin_uid").orderBy('name').get().then(
      qs => {
        qs.forEach(doc => {
          this.users.push(doc.data())
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
  overflow-x: auto;
}

.buttons{
  margin: 20px 0;
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

ul {
  margin: 20px;
  overflow: auto;
}

li {
  list-style: none;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  min-width: 500px;
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
  flex: 3 0 25%;
  margin: 0 5px;
}

.email {
  flex: 3 0 30%;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uid {
  flex: 3 0 35%;
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
    padding: 10px;
  }

  span {
    font-size: 14px;
  }
}

</style>