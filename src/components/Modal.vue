<template>
  <div>
    <!-- Modal Add -->
    <div class="modal" id="modalAdd">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="mb-3 font-weight-bold"> Add Item </h4>
            <form class="container" enctype="multipart/form-data" @submit.prevent="insertProduct">
              <div class="row mb-3">
                <label class="small col-sm-3"> Name </label>
                <input type="text" class="form-control col-sm-8" v-model="form.name" />
              </div>
              <div class="row mb-3">
                <label class="small col-sm-3"> Image </label>
                <input type="file" class="form-control col-sm-8" @change="upload($event)" />
              </div>
              <div class="row mb-3">
                <label class="small col-sm-3"> Price </label>
                <input type="number" class="form-control col-sm-8" v-model="form.price"  />
              </div>
              <div class="row">
                <label class="small col-sm-3"> Category </label>
                <select class="form-control col-sm-8" v-model="form.id_category" >
                  <option selected disabled>Choose Category</option>
                  <option v-for="(item, index) in allCategory.data" :key="index" :value="item.id">
                    {{ item.category }}
                  </option>
                </select>
              </div>
              <div class="text-right mt-4">
                <button class="btn btn-pink text-white mr-2" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-cyan text-white">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Update -->
    <div class="modal" id="modalUpdate">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="mb-3 font-weight-bold"> Update Item </h4>
            <form class="container" enctype="multipart/form-data" @submit.prevent="updateProduct">
              <div class="row mb-3">
                <label class="small col-sm-3"> Name </label>
                <input type="text" class="form-control col-sm-8" v-model="detailProduct.name_product" />
              </div>
              <div class="row mb-3">
                <label class="small col-sm-3"> Image </label>
                <input type="file" class="form-control col-sm-8" @change="upload($event)" />
              </div>
              <div class="row mb-3">
                <label class="small col-sm-3"> Price </label>
                <input type="number" class="form-control col-sm-8" v-model="detailProduct.price"  />
              </div>
              <div class="row">
                <label class="small col-sm-3"> Category </label>
                <select class="form-control col-sm-8" v-model="detailProduct.id_category" >
                  <option selected disabled>Choose Category</option>
                  <option v-for="(item, index) in allCategory.data" :key="index" :value="item.id">
                    {{ item.category }}
                  </option>
                </select>
              </div>
              <div class="text-right mt-4">
                <button class="btn btn-pink text-white mr-2" data-dismiss="modal" >Cancel</button>
                <button type="submit" class="btn btn-cyan text-white">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detail -->
    <div class="modal" id="modalDetail" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body" data-dismiss="modal">
            <h4 class="font-weight-bold text-center"> {{ detailProduct.name_product }} </h4>
            <h4 class="font-weight-bold text-center mb-3"> Rp. {{ detailProduct.price }} </h4>
            <form class="container">
              <img :src="`http://localhost:3000/${detailProduct.image}`" alt="Photo Image" class="image">
              <p class="font-weight-bold mt-4">
                Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae velit quaerat sunt similique expedita blanditiis totam.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Checkout -->
    <div class="modal" id="modalCheckout">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body font-weight-bold" data-dismiss="modal">
            <div class="row text-left">
              <div class="col-sm-7">
                <h5 class="font-weight-bold">Checkout</h5>
              </div>
              <div class="col-sm-5">Receipt no: #123asdfj</div>
            </div>
            <p class="small text-left font-weight-bold">cashier : Pevite Pearce</p>
            <div class="row text-left mt-5">
              <p class="col-sm-8">Coffe Latte 1x</p>
              <p class="col-sm-4">Rp. 15.000</p>
            </div>
            <div class="row mt-2">
              <p class="col-sm-8 text-right">Total:</p>
              <p class="col-sm-4 text-left">Rp. 1.335.000</p>
            </div>
            <p class="text-left">Payment : Cash</p>
            <button class="btn btn-block btn-pink text-white mt-3 mb-1 p-2">Print</button>
            <b>Or</b>
            <button class="btn btn-block btn-cyan text-white mt-1 p-2"> Send Email </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Modal',
  props: ['cart'],
  data () {
    return {
      form: {
        id_category: null,
        name: null,
        price: null,
        image: null
      }
    }
  },
  computed: {
    ...mapGetters({
      allCategory: 'categories/getAll',
      detailProduct: 'products/getDetail'
    })
  },
  methods: {
    ...mapActions({
      onAllCategory: 'categories/onAll',
      onInsert: 'products/onInsert',
      onUpdate: 'products/onUpdate',
      onDetail: 'products/onDetail'
    }),
    upload (event) {
      this.image = event.target.files[0]
    },
    insertProduct () {
      this.form.image = this.image
      this.onInsert(this.form)
        .then((result) => {
          this.alertInsert()
          location.reload()
        }).catch((err) => this.alertErr(err))
    },
    updateProduct () {
      const data = {
        id: this.detailProduct.id,
        id_category: this.detailProduct.id_category,
        name_product: this.detailProduct.name_product,
        price: this.detailProduct.price,
        image: this.image
      }
      this.onUpdate(data)
        .then((result) => {
          console.log(result)
          if (result.data.message === 'Ukuran file terlalu besar') {
            this.alertSize()
          } else if (result.data.message === 'File must be png!') {
            this.alertValidation()
          } else {
            this.alertUpdate()
            window.location = '/home'
          }
        }).catch((err) => this.alertErr(err.message))
    },
    alertInsert () {
      Swal.fire({
        icon: 'success',
        title: 'Insert new item success'
      })
    },
    alertUpdate () {
      Swal.fire({
        icon: 'success',
        title: 'Update new item success'
      })
    },
    alertSize () {
      Swal.fire({
        icon: 'error',
        title: 'Image size is too big!',
        text: 'Please upload another one with size < 2mb'
      })
    },
    alertValidation () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Image type must be PNG'
      })
    },
    alertErr () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Insert item failed!'
      })
    }
  },
  mounted () {
    this.onAllCategory()
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
  font-size: 14px;
}
.image {
  margin: auto;
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
</style>
