<template>
<div class="container">
  <div class="panel-group" v-for="question in questions" :key="question.id">
    <div class="panel panel-default">
      <div class="panel-heading">
        <router-link :to="{ name: 'question', params: { id: question.id }}">{{ question.title }}</router-link>
      </div>
      <div class="panel-body">          
        <p>
          <img class="profile-picture" src="https://api.adorable.io/avatars/285/abott@adorable.png" style="width=50px;">
          {{ question.description }}
        </p>
        <label class="label label-primary">Mongoose</label>
        <label class="label label-primary">Javascript</label>
        <label class="label label-primary">PostgreSQL</label>
        <label class="label label-primary">Sequelize</label>
        <label class="label label-primary">Firebase</label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'questions',
  created () {
    this.getQuestions()
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
  methods: {
    ...mapActions(['getQuestions'])
  }
}
</script>

<style scoped>
.btn-vote-question{
      font-size: 1.5em;
}
.panel-group{
  margin-left: 3em;
}
.question-vote{
  text-align: center;
  cursor: pointer;
}
.answer-vote a{
  cursor: pointer;
}
.page-header{
  margin-top: -0.3em;
}
.profile-picture{
  width: 50px;
  border-radius: 50%;
  margin-right: 1em;
}
</style>
