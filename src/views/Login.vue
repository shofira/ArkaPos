<template>
  <div class="login-page">
    <div class="col-sm-4 login p-4">
      <div class="container">
        <h4 class="text-center m-2">Login</h4>
        <p class="small">Hi, Welcome Back</p>
        <form @submit.prevent="login">
          <label class="small text-muted">Email</label>
          <input type="email" class="form-control mb-3" autofocus required v-model="form.loginEmail" />
          <label class="small text-muted">Password</label>
          <input type="password" class="form-control" required v-model="form.loginPass" />
          <p class="small text-cyan text-right mt-3">Forgot Password ?</p>
          <button type="submit" class="btn btn-cyan btn-block">Login</button>
        </form>
          <p class="small text-muted text-center mt-3">Dont have an account ? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        loginEmail: null,
        loginPass: null
      }
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin'
    }),
    login () {
      this.onLogin(this.form).then(result => {
        if (result === "Cannot read property 'password' of undefined") {
          this.alertExist()
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else if (result === 'Need Activation') {
          this.alertActivate()
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else if (result === 'Incorrect password! Please try again') {
          this.alertMatch()
          localStorage.removeItem('id')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
        } else {
          window.location = '/home'
        }
      }).catch(err => this.alertError(err.message))
    },
    alertExist () {
      Swal.fire({
        icon: 'error',
        title: 'Username Doesnt Exist!',
        text: 'Please check your personal info or create a new one'
      })
    },
    alertActivate () {
      Swal.fire({
        icon: 'warning',
        title: 'This Account need to verified!',
        text: 'Please check your email account to activate'
      })
    },
    alertMatch () {
      Swal.fire({
        icon: 'question',
        title: 'Username and Password Doesnt Match!'
      })
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
