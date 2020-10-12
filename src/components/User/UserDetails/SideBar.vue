<template>
  <nav>
    <ul>
      <li>
        <span class="material-icons">
          dashboard
        </span>
        Dashboard
      </li>
      <li>
        <span class="material-icons">
          calendar_today
        </span>
        Event Details
      </li>
      <li>
        <span class="material-icons">
          portrait
        </span>
        User Details
      </li>
      <li>
        <span class="material-icons">
          face
        </span>
        Special Guests
      </li>
      <li>
        <span class="material-icons">
          payments
        </span>
        Payment Details
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
  nav{
    width: 180px;
    height: 100%;
    background-color: white;
    box-shadow: 0 3px 30px rgba(0,0,0,.1), 0 3px 20px rgba(0,0,0,.1);;
  }

  ul{
    text-align: center;
  }

  li{
    padding: 20px;
    display: grid;
    place-items: center;
    border-bottom: 1px solid #f4f4f4;
  }
  li span{
    margin: 10px;
  }
  li:hover{
    background: #f1f1f1;
  }


</style>