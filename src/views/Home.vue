<template>
  <div class="home">
    <Header />
    <div class="content">
      <Sidebar />
      <main>
        <div class="container mb-2 mt-3">
          <div v-if="allProducts.isLoading">
            Loading...
          </div>
          <div v-else>
            <!-- Data Empty -->
            <div v-if="allProducts.length === 0">
              <b-alert show variant="warning" class="mt-5">Sorry, No Data Displayed</b-alert>
            </div>

            <!-- Show Data -->
            <div v-else>
              <div class="row mt-3">
                <div class="col-md-4 mt-3" v-for="(item, index) in allProducts.data" :key="index">
                  <b-img :src="`http://localhost:3000/${item.image}`" fluid alt="Menu image"></b-img>
                  <p>{{ item.name_product }} <br>
                  <b>Rp. {{ item.price }}</b>
                  </p>
                  <button class="btn btn-primary btn-sm mb-3">
                    <b-icon-pencil-square></b-icon-pencil-square>
                  </button> |
                  <button @click="onDetail(item.id)" v-b-modal.detail class="btn btn-secondary btn-sm mb-3">
                    <b-icon-arrow-up-right-circle></b-icon-arrow-up-right-circle>
                  </button> |
                  <button @click="onDelete(item.id)" class="btn btn-danger btn-sm mb-3">
                    <b-icon-trash></b-icon-trash>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CartBar />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CartBar from '../components/CartBar'

export default {
  name: 'Home',
  data () {
    return {
      products: [],
      cart: []
    }
  },
  components: {
    Header,
    Sidebar,
    CartBar
  },
  computed: {
    ...mapGetters({
      allProducts: 'products/getAll'
    })
  },
  methods: {
    ...mapActions({
      onAll: 'products/onAll',
      onDetail: 'products/onDetail',
      onDelete: 'products/onDelete'
    })
  },
  mounted () {
    this.onAll()
  }
}
</script>

<style scoped>
main {
  flex: 3;
}
.main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5px;
}
@media (min-width: 768px) {
  .content {
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 576px) {
  main {
    text-align: center;
  }
}
</style>
