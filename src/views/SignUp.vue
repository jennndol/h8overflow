<template>
<div>
    <div id="fullscreen_bg" class="fullscreen_bg" />
    <div class="container">
      <div class="row center-block">
        <div class="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <strong>Register</strong>
            </div>
            <div class="panel-body">
              <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email" placeholder="Email">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="confirm" placeholder="Confirm Password">
              </div>
              <button v-on:click="signUp" class="btn btn-success btn-block">Register</button>
              <div class="message">
                <div class="alert alert-danger" v-show="errorMessage">{{errorMessage}}</div>
                <div class="alert alert-success" v-show="successMessage">{{successMessage}}</div>
              </div>
            </div>
            <div class="panel-footer">
              <router-link to="login">Login here</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered is-mobile">
        <div class="column">
          <h3 class="title has-text-grey">Sign Up</h3>
          <p class="subtitle has-text-grey">Create new account</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128">
            </figure>
            <form v-on:submit.prevent>
              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="email" type="email" placeholder="Your Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="password" type="password" placeholder="Your Password">
                </div>
              </div>
              <button class="button is-block is-info is-large is-fullwidth" @click="signUp">Sign Up</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="/login">Login</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>

 -->
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.push({name: 'login'})
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.message {
    margin-top: 1em;
  }
  .center-block {
    margin-top: 15%;
  }
  body {
    padding-top: 120px;
    padding-bottom: 40px;
    background-color: #eee;
  }
  .fullscreen_bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url('http://cleancanvas.herokuapp.com/img/backgrounds/color-splash.jpg');
    background-repeat: repeat;
  }
</style>
