<template>
  <nav id="sidebar">
    <ul>
      <router-link v-slot="{ navigate, isExactActive}" custom to="/dashboard">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
            dashboard
          </span>
          Dashboard
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/dashboard/admins">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
            admin_panel_settings
          </span>
          Admins
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/dashboard/attendees">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
            how_to_reg
          </span>
          Registered Attendees
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/dashboard/vendors">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
           storefront
          </span>
          Vendors
        </li>
      </router-link>

      <router-link v-slot="{ navigate, isExactActive}" custom to="/dashboard/guests">
        <li :class="isExactActive ? 'active':''" @click="navigate">
          <span class="material-icons">
            campaign
          </span>
          Guest Speakers
        </li>
      </router-link>

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