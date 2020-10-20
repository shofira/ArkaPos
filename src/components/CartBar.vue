<template>
  <div>
    <div class="sidebar-cart d-none d-lg-block">
      <!-- Empty Cart -->
      <div v-if="cart.length === 0">
        <img src="../assets/image/cart.png" alt="Cart Empty">
        <h5>Your Cart is Empty</h5>
        <p class="text-muted mb-5">Please add some items from the menu</p>
      </div>

      <!-- Cart Checkout -->
      <div v-else class="row ml-2 mt-3 mb-4">
        <b-img :src="`http://localhost:3000/${allProducts.data.image}`" fluid alt="Cart Empty" class="col-md-4"></b-img>
        <div class="description">
          <h5 class="text-left">
            <b>{{allProducts.data.name_product}}</b>
          </h5>
          <b-button-group>
            <b-button variant="outline-success">-</b-button>
            <b-button disabled variant="outline-success">{{allProducts.data.qty}}</b-button>
            <b-button variant="outline-success">+</b-button>
          </b-button-group>
          <b class="ml-5">Rp. {{allProducts.data.price}}</b>
        </div>
      </div>
    </div>

    <b-button v-b-toggle.chart class="connect d-block d-lg-none" variant="light">
      <b-icon-basket2-fill></b-icon-basket2-fill>
    </b-button>
    <b-sidebar id="chart" right shadow>
      <div class="px-3 py-2 text-center">
        <!-- Empty Cart -->
        <div v-if="cart.length === 0">
          <img src="../assets/image/cart.png" alt="Cart Empty">
          <h5>Your Cart is Empty</h5>
          <p class="text-muted mb-5">Please add some items from the menu</p>
        </div>

        <!-- Cart Checkout -->
        <div v-else class="row ml-2 mt-3 mb-4">
          <b-img :src="`http://localhost:3000/${allProducts.data.image}`" fluid alt="Cart Empty" class="col-md-4"></b-img>
          <div class="description">
            <h5 class="text-left">
              <b>{{allProducts.data.name_product}}</b>
            </h5>
            <b-button-group>
              <b-button variant="outline-success">-</b-button>
              <b-button disabled variant="outline-success">{{allProducts.data.qty}}</b-button>
              <b-button variant="outline-success">+</b-button>
            </b-button-group>
            <b class="ml-5">Rp. {{allProducts.data.price}}</b>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartBar',
  props: ['type'],
  data () {
    return {
      cart: []
    }
  },
  computed: {
    ...mapGetters({
      allProducts: 'products/getAll'
    })
  },
  methods: {
    ...mapActions({
      onAll: 'products/onAll'
    })
  },
  mounted () {
    this.onAll()
  }
}
</script>

<style scoped>
.sidebar-cart {
  background-color: #fff;
  border: 1px solid #cecece;
  flex: 1.4;
  height: 100%;
  padding: 8vh;
  text-align: center;
}
.connect {
  background-color: transparent;
  color: #f24f8a;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: none;
  font-size: 30px;
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 1;
}
.connect:focus {
  background-color: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: none;
  color: #f24f8a;
}
@media(max-width: 1200px) {
  .sidebar-cart {
    padding: 3.5vh;
  }
}
@media(max-width: 1024px) {
  .sidebar-cart {
    padding: 0.3vh;
  }
}
</style>
