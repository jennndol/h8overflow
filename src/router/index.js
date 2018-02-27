import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/views/Questions'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import CreateNewQuestion from '@/views/CreateNewQuestion'
// import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/',
      name: 'questions',
      component: Questions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ask',
      name: 'ask',
      component: CreateNewQuestion,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   // console.log(requiresAuth)
//   if (requiresAuth && !currentUser) next({name: 'login'})
//   else if (!requiresAuth && currentUser) next({name: 'questions'})
//   else next()
// })

export default router
