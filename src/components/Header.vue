<template>
  <!-- History -->
  <div v-if="type==='history'">
    <div class="header">
      <b-navbar toggleable variant="light" class="main-header" sticky>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-navbar-brand href="/history">History</b-navbar-brand>
        <b-icon-power @click="logout">Logout</b-icon-power>
      </b-navbar>
    </div>
  </div>

  <!-- navbar home -->
  <div v-else>
    <div class="header">
      <b-navbar toggleable type="light" variant="light" class="main-header">
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-navbar-brand href="/home">Food Items</b-navbar-brand>
        <b-icon-power @click="logout">Logout</b-icon-power>
      </b-navbar>

      <header class="cart-header d-none d-lg-block">
        <h4 class="text-center">
          Cart
          <b-badge pill variant="cart">0</b-badge>
        </h4>
      </header>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['type'],
  data () {
    return {
      id: localStorage.getItem('id')
    }
  },
  methods: {
    ...mapActions({
      onLogout: 'auth/onLogout'
    }),
    logout () {
      this.onLogout(this.id).then((result) => { window.location = '/' })
    }
  }
}
</script>

<style>
.header {
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
}
.main-header {
  flex: 2.4;
  background: #aaa0a0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.cart-header {
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  flex: 1;
}
@media (min-width: 768px) {
  .cart-header h4 {
    padding-top: 15px;
  }
  .badge-cart {
    background-color: #57cad5;
    color: white;
  }
  .sidebar-left img {
    display: block;
    padding-top: 50px;
  }
}
</style>
