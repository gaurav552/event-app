<template>
  <nav id="sidebar">
    <ul>
      <li>
        <router-link to="/dashboard">
          <span class="material-icons">
          dashboard
        </span>
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/admins">
          <span class="material-icons">
            admin_panel_settings
          </span>
          Admins
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/attendees">
          <span class="material-icons">
            how_to_reg
          </span>
          Registered Attendees
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/vendors">
        <span class="material-icons">
          storefront
        </span>
          Vendors
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/guests">
        <span class="material-icons">
          campaign
        </span>
          Guest Speakers
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
name: "AdminSideBar"
}
</script>

<style scoped>
nav {
  width: 180px;
  height: 100%;
  background-color: white;
  box-shadow: 0 3px 30px rgba(0, 0, 0, .1), 0 3px 20px rgba(0, 0, 0, .1);
  overflow-y: auto;
  display: block;
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
    /*z-index: -1;*/
    position: fixed;
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