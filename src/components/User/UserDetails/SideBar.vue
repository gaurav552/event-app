<template>
  <nav id="sidebar">
    <ul>
      <router-link v-slot="{ navigate, isExactActive}" custom to="/userDetails">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
             dashboard
          </span>
         Dashboard
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/userDetails/eventDetails">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
             calendar_today
          </span>
          Event Details
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/userDetails/userInfo">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
             portrait
          </span>
          User Detail
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/userDetails/guests">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
             face
          </span>
          Special Guests
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/userDetails/payments">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
             payments
          </span>
            Payment Details
        </li>
      </router-link>

    </ul>
  </nav>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>
nav {
  width: 180px;
  background-color: white;
  overflow-y: auto;
  box-shadow: 0 3px 30px rgba(0, 0, 0, .1), 0 3px 20px rgba(0, 0, 0, .1);
}

ul {
  text-align: center;
  height: max-content;
  overflow-y: auto;
}

li {
  padding: 20px;
  display: grid;
  place-items: center;
  border-bottom: 1px solid #f4f4f4;
}

li span {
  margin: 10px;
}

li:hover {
  background: #f1f1f1;
  cursor: pointer;
}

.active {
  background-color: #f44336;
  color: white;
  cursor: default!important;
}

.active:hover{
  background-color: #f44336;
}

a {
  text-decoration: none;
  display: grid;
  place-items: center;
}

@media only screen and (max-width: 700px) {
  nav {
    width: 100px;
    /*z-index: -1;*/
    top:80px;
    bottom:0;
    position:fixed;
    overflow-y:auto;
    overflow-x:hidden;
  }

  ul{
    height: max-content;
  }

  li {
    font-size: 14px;
    padding: 10px;
  }

  li span {
    font-size: 18px;
    margin: 5px;
  }
}

</style>