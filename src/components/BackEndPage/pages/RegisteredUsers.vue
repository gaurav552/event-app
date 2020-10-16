<template>
  <div class="container">
    <div class="top-row">
      <div class="left">
        <label>
          <select id="" name="" v-model="selected_val">
            <option value="all">All</option>
            <option value="audience">Audience</option>
            <option value="volunteer">Volunteers</option>
            <option value="player">Players</option>
          </select>
        </label>
      </div>

      <span>Total Registered: {{all_list.length}}</span>

      <div class="right">
        <label><input v-model="search_query" placeholder="search" type="text"></label>
      </div>
    </div>

    <ul class="list">
      <li>
        <span class="list_count">#</span>
        <span class="list_uid">UID</span>
        <span class="list_name">Client Name</span>
        <span class="list_email">Client email</span>
        <span class="list_type">Client category</span>
      </li>
      <li v-for="(item,i) in list_to_show" :key="i" class="list_item">
        <span class="list_count">{{i+1}}</span>
        <span class="list_uid">{{item.uid}}</span>
        <span class="list_name">{{item.name.first+" "+item.name.last}}</span>
        <span class="list_email">{{item.email}}</span>
        <span class="list_type">{{ item.type }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
// import 'firebase/auth'
import db from "@/firebaseInit"
// import {DateTime} from "luxon";

export default {
  name: "RegisteredUsers",
  computed:{
    list_to_show(){
      let searcher =  this.selected_val === 'all' ? this.all_list : this.all_list.filter(this.isOfType)
      if(this.search_query === ''){
        return searcher
      } else {
        return searcher.filter((item)=>{
          return item.name.first.toLowerCase().startsWith(this.search_query.toLowerCase()) ||
            item.name.last.toLowerCase().startsWith(this.search_query.toLowerCase()) ||
            item.email.toLowerCase().startsWith(this.search_query.toLowerCase())
        })
      }
    }
  },
  methods:{
    isOfType(val){
      return val['type'] === this.selected_val
    }
  },
  data() {
    return {
      selected_val:'all',
      all_list: [],
      search_query:''
    }
  },
  mounted() {

    this.selected_val = this.$route.query.value ? this.$route.query.value:'all'

    db.collection("registered_users").orderBy('type').get().then(
      qs => {
        qs.forEach(doc => {
          let val = {
            name: doc.data().name,
            email: doc.data().email,
            type: doc.data().type,
            uid: doc.data().uid,
            doc_id:doc.id
          }
          this.all_list.push(val)

          // this.all_list.splice(0,1)
        })
      }
    )
  }
}
</script>

<style scoped>
.container {
  flex-basis: 100%;
  /*height: calc(100% - 80px);*/
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: flex-start;
}

.top-row {
  border-radius: 5px;
  padding: 20px;
  background-color: white;
  flex-basis: 100%;
  box-shadow: 0 1px 15px rgba(0, 0, 0, .04), 0 1px 6px rgba(0, 0, 0, .04);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

select,input{
  padding: 5px 10px;
}

ul{
  width: 100%;
  overflow-x: auto;
}

li{
  width: 100%;
  min-width: 500px;
}

li{
  list-style: none;
  padding: 20px;
  display: flex;
}

.list_count{
  flex: 1 1 5%;
}

.list_name{
  flex: 3 2 22%;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list_email{
  flex: 3 2 28%;
  margin: 0 5px;
  /*white-space: nowrap;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
}

.list_type{
  flex: 1 0 15%;
  margin: 0 5px;
}

.list_uid{
  flex: 1 0 20%;
  margin: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media only screen and (max-width: 700px) {
  li{
    font-size: 14px;
  }
  .list_uid{
    display: none;
  }
}
</style>















