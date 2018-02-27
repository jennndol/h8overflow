/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import {firebase, db} from './firebase'
import {store} from './store'

Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$firebase = firebase

Vue.use(Buefy)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  store,
  router
})
