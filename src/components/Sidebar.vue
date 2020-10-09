<template>
  <div id="navbar-toggle-collapse" class="sidebar-left">
    <div class="container">
      <router-link to="/home">
      <img src="../assets/image/fork.png" alt="checkout" />
    </router-link>
    <router-link to="/history">
      <img src="../assets/image/clipboard.png" alt="history" />
    </router-link>

    <!-- Using modifiers -->
    <img src="../assets/image/add.png" alt="add new items" v-b-modal.addCategory />
    </div>

    <Modal />
  </div>
</template>

<script>
import Modal from './Modal'

export default {
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
  padding: 5px;
}

.sidebar-left img {
  margin: 0 auto;
  padding: 1vh 3vh 1vh 2vh;
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
