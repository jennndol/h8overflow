import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    questions: null
  },
  mutations: {
    DEFINE_QUESTION (state, payload) {
      state.questions = payload
    }
  },
  actions:{
    getQuestions: ({ commit }) => {      
      db.collection('questions').get()
        .then(snapshot => {
          let docs = []
          snapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            docs.push(data)
          })
          commit('DEFINE_QUESTION', docs)
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    },
    setQuestions: ({commit}) => {
      
    }
  }
})
