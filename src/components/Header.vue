<template>
  <div>
    <div class="header">
      <b-navbar toggleable variant="white" class="main-header" sticky>
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-navbar-brand href="/history" v-if="type==='history'">History</b-navbar-brand>
        <b-navbar-brand href="/users" v-if="type==='Users'">Manage Users</b-navbar-brand>
        <b-navbar-brand href="/home" v-if="type === 'home'">Food Items</b-navbar-brand>
        <b-dropdown right  variant="transparent" no-caret>
          <template v-slot:button-content>
            <b-icon-person-fill class="icon"></b-icon-person-fill>
          </template>
          <b-dropdown-item href="#">
            <b-icon-person class="mr-1"></b-icon-person> Profile
          </b-dropdown-item>
          <b-dropdown-item @click="logout">
            <b-icon-power class="mr-2"></b-icon-power>Logout
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar>
      <header class="cart-header d-none d-lg-block" v-if="type === 'home'">
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
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
