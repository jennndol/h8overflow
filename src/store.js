import Vue from 'vue'
import Vuex from 'vuex'
import {db, firebase} from './firebase'

Vue.use(Vuex)

let dbQuestion = db.collection('questions')

export const store = new Vuex.Store({
  state: {
    question: {},
    questions: [],
    answers: [],
    votes: []
  },
  mutations: {
    SET_ANSWER (state, payload) {
      state.answers.push(payload)
    },
    DEFINE_ANSWERS (state, payload) {
      state.answers = payload
    },
    SET_QUESTION (state, payload) {
      state.questions.push(payload)
    },
    DEFINE_QUESTIONS (state, payload) {
      state.questions = payload
    },
    DEFINE_QUESTION (state, payload) {
      state.question = payload
    },
    SPLICE_QUESTIONS (state, payload) {
      console.log(payload)
    }
  },
  actions: {
    getAnswers: ({commit}, payload) => {
      dbQuestion.doc(payload).collection('answers').get()
        .then(snapshot => {
          let docs = []
          snapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            docs.push(data)
          })
          commit('DEFINE_ANSWERS', docs)
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    },
    getQuestions: ({ commit }) => {
      dbQuestion.get()
        .then(snapshot => {
          let docs = []
          snapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            docs.push(data)
          })
          commit('DEFINE_QUESTIONS', docs)
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    },
    getQuestion: ({ commit }, payload) => {
      dbQuestion.doc(payload).onSnapshot(function (doc) {
        let data = doc.data()
        data.id = doc.id
        commit('DEFINE_QUESTION', data)
      }, err => {
        console.log(`Encountered error: ${err}`)
      })
    },
    getQuestionVotes: ({commit}, payload) => {
      alert('IM HERE')
      dbQuestion.doc(payload).collection('votes')
        .onSnapshot(something => {
          console.log(something)
        })
    },
    deleteQuestion: ({commit}, payload) => {
      dbQuestion.doc(payload).delete()
        .then(() => {
          alert('Berhasil')
        })
        .catch(error => {
          console.log(error)
        })
    },
    setVote: ({ commit }, payload) => {
      // TODO: Check this out
      let currentUser = firebase.auth().currentUser
      dbQuestion.doc(payload.id).collection('votes').add({
        [currentUser.uid]: payload
      })
        .then(function (doc) {
          dbQuestion.doc(payload.id).collection('votes').doc(doc.id).get()
            .then(val => {
              let data = val.data()
              data.id = val.id
              data.questionid = payload.id
              commit('SET_VOTE', data)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    setAnswer: ({commit}, payload) => {
      let currentUser = firebase.auth().currentUser
      dbQuestion.doc(payload.id).collection('answers').add({
        description: payload.description,
        uid: currentUser.uid
      })
        .then(function (doc) {
          dbQuestion.doc(payload.id).collection('answers').doc(doc.id).get()
            .then(val => {
              let data = val.data()
              data.id = val.id
              data.questionid = payload.id
              commit('SET_ANSWER', data)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    setQuestion: ({commit}, payload) => {
      let currentUser = firebase.auth().currentUser
      dbQuestion.add({
        title: payload.title,
        description: payload.description,
        uid: currentUser.uid
      })
        .then(function (doc) {
          doc.onSnapshot(docSnapshot => {
            dbQuestion.doc(doc.id).get()
              .then(doc => {
                let data = doc.data()
                data.id = doc.id
                commit('SET_QUESTION', data)
              })
          })
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }
})
