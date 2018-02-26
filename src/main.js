// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
let config
config = {
  apiKey: 'AIzaSyAZDct8zsXkFEYkt6LtxTHNHVllK_ap_1A',
  authDomain: 'learning-5708d.firebaseapp.com',
  databaseURL: 'https://learning-5708d.firebaseio.com',
  projectId: 'learning-5708d',
  storageBucket: 'learning-5708d.appspot.com',
  messagingSenderId: '303656755232'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: {App},
      router
    })
  }
})
