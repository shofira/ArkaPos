<template>
  <div class="login-page">
    <div class="col-sm-4 login p-4">
      <div class="container">
        <h4 class="text-center m-2">Register</h4>
        <p class="small mt-3">Let's create your account</p>
        <form @submit.prevent="register" class="form-group">
          <label class="small text-muted">Name</label>
          <input type="text" class="form-control mb-2" autofocus required v-model="registerName" />
          <label class="small text-muted">Email</label>
          <input type="email" class="form-control mb-3" required v-model="registerEmail" />
          <p class="small text-danger caution mb-2">We'll send email to activate your account</p>
          <label class="small text-muted">Password</label>
          <input type="password" class="form-control mb-2" required v-model="registerPass" />
          <label class="small text-muted">Role</label>
          <select class="form-control" required v-model="registerRole">
            <option disabled selected>Choose your role</option>
            <option value="0">Cashier</option>
            <option value="1">Admin</option>
          </select>
          <button type="submit" class="btn btn-cyan btn-block mt-4">Register</button>
        </form>
        <p class="small text-muted text-center mt-3">Already have an account ? <router-link to="/">Sign In</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      registerName: '',
      registerEmail: '',
      registerPass: '',
      registerRole: ''
    }
  },
  methods: {
    ...mapActions({
      onRegister: 'auth/onRegister'
    }),
    register () {
      const data = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPass,
        level: this.registerRole
      }
      this.onRegister(data).then(result => {
        this.alertActivate()
        window.location = '/'
      }).catch(err => this.alertError(err))
    },
    alertActivate () {
      Swal.fire(
        'Your Registration Success',
        'Please Check Your Email to activate',
        'success'
      )
    },
    alertError () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}
</script>

<style src="../assets/css/style.css" scoped></style>
