<template>
<div>
<div class="container">
    <div class="panel-group">
      <div class="panel panel-default">
        <div class="panel-heading">
          <router-link :to="{ name: 'question', params: { id: question.id }}">{{ question.title }}</router-link>          
        </div>
        <div class="panel-body">
          <div class="col-xs-10">
            <p>
              <img class="profile-picture" src="https://api.adorable.io/avatars/285/abott@adorable.png">
              {{ question.description }}
            </p>
            <label class="label label-primary">Mongoose</label>
            <label class="label label-primary">Javascript</label>
            <label class="label label-primary">PostgreSQL</label>
            <label class="label label-primary">Sequelize</label>
            <label class="label label-primary">Firebase</label>
          </div>
          <div class="col-xs-2">
            <div class="question-vote">
              <a class="btn-vote-question"><span class="glyphicon glyphicon-chevron-up"></span></a>
              <h1>10</h1>
              <a class="btn-vote-question"><span class="glyphicon glyphicon-chevron-down"></span></a>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <div class="page-header">
            <h4>Answers</h4>
          </div>
          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="3" v-model="form.description" placeholder="description"></textarea>
          </div>
          <div class="form-group text-right">
            <button @click="reply" type="button" class="btn btn-primary btn-sm">Comment</button>
          </div>
          <hr>
          <div class="panel-group" v-for="answer in answers" :key="answer.id">
            <div class="panel panel-default">
              <div class="panel-body">
                <p>{{ answer.description }}</p>
                  <div class="col-xs-6">
                    <small>[uid {{ answer.uid }}]</small>
                  </div>
                  <div class="col-xs-6">
                    <div class="answer-vote text-right">
                      10
                      <a><span class="glyphicon glyphicon-chevron-up"></span></a>
                      <a><span class="glyphicon glyphicon-chevron-down"></span></a>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      id: this.$route.params.id,
      form: {
        description: null,
        isAccepted: false,
        votes: []
      }
    }
  },
  methods: {
    ...mapActions(['getQuestion', 'setAnswer', 'getAnswers']),
    reply () {
      let form = this.form
      form.id = this.question.id
      this.setAnswer(form)
    }
  },
  mounted () {
    this.getQuestion(this.id)
    this.getAnswers(this.id)
  },
  computed: {
    question () {
      return this.$store.state.question
    },
    answers () {
      return this.$store.state.answers
    }
  }
}
</script>

<style scoped>
.profile-picture{
  width: 100px;
  border-radius: 50%;
  margin-right: 1em;
}
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
</style>
