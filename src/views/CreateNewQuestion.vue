<template>
<div>
<navbar></navbar>
<div class="container">
  <div class="form-group">
    <label for="title">Title:</label>
    <input type="text" class="form-control" v-model="form.title">
  </div>
  <div class="form-group">
    <label for="comment">Description:</label>
    <textarea class="form-control" rows="3" v-model="form.description" placeholder="description"></textarea>
  </div>
  <div class="form-group text-right">
    <button @click="ask" class="btn btn-block btn-primary">Submit</button>
  </div>
</div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: 'createNewQuestion',
  components:{
    Navbar
  },
  data () {
    return {
      form: {
        title: null,
        description: null,
        tags: [],
        votes: 0,
        favorites: 0,
        hasAcceptedAnswer: false
      }
    }
  },
  methods: {
    ...mapActions(['setQuestion']),
    ask () {
      let question = {...this.form}
      this.setQuestion(question)
      this.$router.push({name: 'questions'})
    }
  }
}
</script>
