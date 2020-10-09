<template>
  <div class="sidebar-cart">
    <!-- Cart Checkout -->
    <div v-if="type==='checkout'" class="row ml-2 mt-3 mb-4">
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

  <!-- Empty Cart -->
    <div v-else>
      <img src="../assets/image/cart.png" alt="Cart Empty">
      <h5>Your Cart is Empty</h5>
      <p class="text-muted mb-5">Please add some items from the menu</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartBar',
  props: ['type'],
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
  text-align: center;
}
</style>
