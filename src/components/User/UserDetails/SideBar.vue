<template>
  <nav id="sidebar">
    <ul>
      <li>
        <router-link to="/userDetails">
          <span class="material-icons">
          dashboard
        </span>
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/userDetails/eventDetails">
          <span class="material-icons">
            calendar_today
          </span>
          Event Details
        </router-link>
      </li>
      <li>
        <router-link to="/userDetails/userInfo">
          <span class="material-icons">
            portrait
          </span>
          User Details
        </router-link>
      </li>
      <li>
        <router-link to="/userDetails/guests">
        <span class="material-icons">
          face
        </span>
          Special Guests
        </router-link>
      </li>
      <li>
        <router-link to="/userDetails/payments">
        <span class="material-icons">
          payments
        </span>
          Payment Details
        </router-link>
      </li>
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
  height: 100%;
  background-color: white;
  box-shadow: 0 3px 30px rgba(0, 0, 0, .1), 0 3px 20px rgba(0, 0, 0, .1);
  overflow-y: auto;
}

ul {
  text-align: center;
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
}

a {
  text-decoration: none;
  display: grid;
  place-items: center;
}

@media only screen and (max-width: 700px){
  nav{
    display: none;
    width: 90px;
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