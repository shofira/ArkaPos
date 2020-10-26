<template>
  <div>
    <!-- Cart Checkout -->
    <div v-if="type === 'checkout'" class="row mt-3 mb-4">
      <b-img :src="`http://localhost:3000/${cart.image}`" fluid alt="Cart Empty" class="image mb-2"></b-img>
      <div class="description">
        <p class="text-left font-weight-bold">{{cart.name_product}}</p>
        <b-button-group>
          <b-button variant="outline-success" class="btn-sm btn-qty">-</b-button>
          <b-button disabled variant="outline-success" class="btn-sm">{{cart.qty}}</b-button>
          <b-button variant="outline-success" class="btn-sm btn-qty">+</b-button>
        </b-button-group>
        <b class="ml-4">Rp. {{cart.price}}</b>
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
export default {
  name: 'CartBar',
  props: ['type', 'cart']
}
</script>

<style scoped>
.image {
  height: 84px;
  width: 84px;
  margin: 0 10px;
}
.btn-qty {
  background-color: rgba(130, 222, 58, 0.2);
  font-weight: bold;
}
@media(max-width: 1070px) {
  .description {
    margin-left: 10px;
  }
  .description p {
    margin-bottom: 10px;
  }
}
</style>
