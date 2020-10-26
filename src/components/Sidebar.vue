<template>
  <div id="navbar-toggle-collapse" class="sidebar-left text-center">
    <div class="container">
      <router-link to="/home">
        <img src="../assets/image/fork.png" alt="checkout" />
      </router-link>
      <router-link to="/history">
        <img src="../assets/image/clipboard.png" alt="history" />
      </router-link>
      <img src="../assets/image/add.png" alt="add new items" data-toggle="modal" data-target="#modalAdd" />
      <router-link to="/users" v-if="role === '1'">
        <img src="../assets/image/user.png" alt="Manage Users"/>
      </router-link>
      <Modal />
    </div>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  data () {
    return {
      role: localStorage.getItem('role')
    }
  },
  components: {
    Modal
  }
}
</script>

<style scoped>
.sidebar-left {
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  flex: 0.5;
}
.sidebar-left img {
  margin: 0 auto;
  padding: 2vh 3vh 2vh 2vh;
}
ul {
  margin-left: 15px;
  list-style: none;
}
@media (min-width: 768px) {
  .sidebar-left img {
    display: block;
    padding-top: 50px;
  }
}
</style>
