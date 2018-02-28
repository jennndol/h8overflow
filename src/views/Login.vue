<template>
  <div>
    <div id="fullscreen_bg" class="fullscreen_bg" />
    <div class="container">
      <div class="row center-block">
        <div class="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <strong>Login</strong>
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
              <button class="btn btn-primary btn-block" v-on:click="signIn">Login</button>
              <div class="alert alert-danger" v-show="message">{{message}}</div>
            </div>
            <div class="panel-footer">
              <router-link to="signup">Register here</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      message: null
    }
  },
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.push({name: 'questions'})
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
.center-block {
    margin-top: 15%;
  }
  h3 {
    text-align: center;
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
