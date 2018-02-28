import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/views/Questions'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import CreateNewQuestion from '@/views/CreateNewQuestion'
import Bucket from '@/views/Bucket'
import Question from '@/views/Question'

import { firebase } from '../firebase'

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
      path: '/ask',
      name: 'ask',
      component: CreateNewQuestion,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/questions',
      component: Bucket,
      children:[{
        path: '',
        name: 'questions',
        component: Questions,
      },{
        path: ':id',
        name: 'question',
        component: Question
      }],
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   firebase.auth().onAuthStateChanged(user => {    
//     if (user) {
//       if (to.path == '/login') {
//         next('/questions')
//       }
//       next()
//     }else{
//       next('/login')
//     }
//   })
// })

export default router
