<template>
  <div class="home">
    <Header type="home"/>
    <div class="content">
      <Sidebar />
      <main>
        <div class="container mb-2 mt-4">
          <form @submit.prevent="search">
            <div class="form">
              <input type="text" class="form-control p-3" placeholder="Search for any items" v-model="keyword" @keyup="search" />
              <button disabled class="d-none d-sm-block">
                <b-icon icon="search" variant="secondary" class="pr-4"></b-icon>
              </button>
              <b-dropdown no-caret text="sort" variant="violet" class="mr-3 ml-3">
                <b-dropdown-item @click="sortAsc('name_product')">Sort by name</b-dropdown-item>
                <b-dropdown-item @click="sortAsc('price')">Sort by cheap</b-dropdown-item>
                <b-dropdown-item @click="sortDesc('price')">Sort by expensive</b-dropdown-item>
                <b-dropdown-item @click="sortDesc('id')">New product</b-dropdown-item>
              </b-dropdown>
              <input type="submit" class="btn btn-sm btn-pink text-white" value="Search">
            </div>
          </form>

          <div class="d-flex justify-content-center mt-5" v-if="allProducts.isLoading">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else>
            <!-- Data Empty -->
            <div v-if="allProducts.data.length === 0">
              <b-alert show variant="danger" class="text-center mt-5 p-5" style="font-size: 18px">
                <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                Sorry, No Data Displayed
              </b-alert>
            </div>

            <!-- Show Data -->
            <div v-else>
              <div class="row mt-3">
                <div class="col-md-4 mt-3" v-for="(item, index) in allProducts.data" :key="index">
                  <b-img :src="`http://localhost:3000/${item.image}`" fluid alt="Menu image" @click="addCart(item.id)">
                  </b-img>
                  <p class="mt-3 font-weight-bold">{{ item.name_product }} <br>
                  <b>Rp. {{ item.price }}</b>
                  </p>
                  <button @click="detailProduct(item.id)" class="btn btn-primary btn-sm mb-3 mr-1" data-toggle="modal" data-target="#modalUpdate">
                    <b-icon-pencil-square></b-icon-pencil-square>
                  </button> |
                  <button @click="detailProduct(item.id)" class="btn btn-secondary btn-sm mb-3 ml-1 mr-1" data-toggle="modal" data-target="#modalDetail">
                    <b-icon-arrow-up-right-circle></b-icon-arrow-up-right-circle>
                  </button> |
                  <button @click="deleteProduct(item.id)" class="btn btn-danger btn-sm mb-3 ml-1">
                    <b-icon-trash></b-icon-trash>
                  </button>
                </div>
                <Modal :listcart="cart"/>
              </div>
              <div class="container mt-5 mb-5">
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="2" align="fill" @click.native="pagination">
              </b-pagination>
            </div>
            </div>
          </div>
        </div>
      </main>

      <!-- SidebarCart -->
      <div v-if="cart.length === 0" class="sidebar-cart mt-1 d-none d-lg-block">
        <CartBar />
      </div>
      <div v-else class="sidebar-cart mt-1 d-none d-lg-block">
        <div v-for="(item, index) in cart" :key="index" class="container">
          <CartBar :cart="item" type="checkout" />
        </div>
        <div class="container">
          <div class="row">
            <h5 class="col-sm-7 font-weight-bold text-left"> Total: </h5>
            <b class="col-sm-5 text-left">Rp. 105.000*</b>
          </div>
          <p class="text-left">*Belum termasuk ppn</p>
          <button class="btn btn-block btn-cyan text-white" data-toggle="modal" data-target="#modalCheckout">
            Checkout
          </button>
          <a class="btn btn-block btn-pink text-white mb-3" href="/home">
            Cancel
          </a>
        </div>
      </div>

      <!-- responsive sidebarcart -->
      <b-button v-b-toggle.chart class="connect d-block d-lg-none" variant="light">
        <b-icon-basket2-fill></b-icon-basket2-fill>
      </b-button>
      <b-sidebar id="chart" right shadow>
        <div class="px-3 py-2 text-center">
          <div v-if="cart.length === 0">
            <CartBar />
          </div>
          <div v-else>
            <h5 class="font-weight-bold">Checkout</h5>
            <hr>
            <div v-for="(item, index) in cart" :key="index" class="container">
              <CartBar :cart="item" type="checkout" />
            </div>
            <div class="">
              <div class="row">
                <h5 class="col-sm-7 font-weight-bold text-left"> Total: </h5>
                <b class="col-sm-5 text-left">Rp. 105.000*</b>
              </div>
              <p class="text-left">*Belum termasuk ppn</p>
              <button type="submit" class="btn btn-block btn-cyan text-white" data-toggle="modal" data-target="#modalCheckout">
                Checkout
              </button>
              <a class="btn btn-block btn-pink text-white" href="/home">Cancel</a>
            </div>
          </div>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '../components/Modal'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CartBar from '../components/CartBar'

export default {
  name: 'Home',
  data () {
    return {
      rows: 5,
      currentPage: 1,
      keyword: null,
      selected: null,
      cart: [],
      type: null
    }
  },
  components: {
    Modal,
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
      onDelete: 'products/onDelete',
      onSortProductAsc: 'products/onSortProductAsc',
      onSortProductDesc: 'products/onSortProductDesc',
      onSearch: 'products/onSearch'
    }),
    detailProduct (id) {
      this.onDetail(id)
    },
    deleteProduct (id) {
      this.onDelete(id)
      location.reload()
    },
    search (keyword) {
      this.onSearch(this.keyword).then((result) => {
        console.log(result)
        this.$router.push({ query: { search: this.keyword } })
      })
    },
    sortAsc (sort) {
      this.$router.push({ query: { sort } })
      this.onSortProductAsc(sort)
    },
    sortDesc (sort) {
      this.$router.push({ query: { sort } })
      this.onSortProductDesc(sort)
    },
    pagination () {
      this.onAll(this.currentPage)
      this.$router.push({ query: { page: this.currentPage, limit: 3 } })
    },
    addCart (id) {
      const cart = this.cart.filter((e) => e.id === id)
      if (cart.length === 0) {
        const data = this.allProducts.data.filter((e) => e.id === id)
        data[0].qty = 1
        this.cart = [...this.cart, data[0]]
      } else {
        const newData = this.cart.map((e) => {
          if (e.id === id) {
            e.qty += 1
          }
          return e
        })
        this.cart = newData
      }
    }
  },
  mounted () {
    this.onAll(this.currentPage).then((res) => {
      this.rows = res.totalRows
    }).catch((err) => console.log(err))
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
main {
  flex: 3;
  height: 100%;
}
.main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5px;
}
.form {
  display: flex;
  background-color: #fff;
  box-shadow: 0px 1px 20px rgba(197, 197, 197, 0.25);
  border-radius: 8px;
  padding: 10px;
}
input[type="text"] {
  background: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 14px;
}
input[type="text"]:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  background: transparent;
}
.form button {
  border: none;
  border-right: 2px solid #ddd;
  background-color: transparent;
  margin-right: 5px;
}
.btn {
  font-weight: bold;
}
.btn-pink {
  background-color: #f24f8a;
}
.btn-cyan {
  background-color: #57cad5;
}
.sidebar-cart {
  background-color: #fff;
  border: 1px solid #cecece;
  flex: 1.4;
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
@media (min-width: 768px) {
  .content {
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 768px) {
  main {
    text-align: center;
    height: 100%;
  }
}
@media (max-width: 576px) {
  main {
    text-align: center;
    height: 100%;
  }
}
</style>
