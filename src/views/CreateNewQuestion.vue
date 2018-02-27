<template>
  <div class="container has-text-centered is-mobile">
    <div class="column">
      <div class="box">
        <form v-on:submit.prevent>
          <div class="field">
            <div class="control">
              <input class="input is-large" v-model="form.title" type="text" placeholder="Title" autofocus="">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea is-large" cols="30" rows="4" v-model="form.description"></textarea>
            </div>
          </div>
          <button class="button is-block is-info is-large is-fullwidth" @click="ask">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'createNewQuestion',
  data () {
    return {
      form: {
        title: null,
        description: null,
        tags: {},
        votes: 0,
        favorites: 0,
        hasAcceptedAnswer: false
      }
    }
  },
  methods: {
    ask () {
      let currentUser = firebase.auth().currentUser
      let question = {...this.form}
      question.uid = currentUser.uid
      this.$db.collection('questions').add(question)
        .then(function (docRef) {
          alert('Success')
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>
