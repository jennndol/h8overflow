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
                <img class="profile-picture" src="https://api.adorable.io/avatars/285/abott@adorable.png"> {{ question.description }}
              </p>
              <label class="label label-primary">Mongoose</label>
              <label class="label label-primary">Javascript</label>
              <label class="label label-primary">PostgreSQL</label>
              <label class="label label-primary">Sequelize</label>
              <label class="label label-primary">Firebase</label>
            </div>
            <div class="col-xs-2">
              <div class="question-vote">
                <a class="btn-vote-question" @click="upVote(question.id)">
                  <span class="glyphicon glyphicon-chevron-up"></span>
                </a>
                <h1>
                  {{ upTotal - downTotal }}
                </h1>
                <a class="btn-vote-question" @click="downVote(question.id)">
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </a>
                <br>
                <a v-show="question.uid === currentUser.uid" class="btn-vote-question" @click="deleteQ(question.id)">
                  <span class="glyphicon glyphicon-trash"></span>
                </a>
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
                      {{ 10 }}
                      <a @click="upVoteAnswer(question.id, answer.id)">
                        <span class="glyphicon glyphicon-chevron-up"></span>
                      </a>
                      <a @click="downVoteAnswer(question.id, answer.id)">
                        <span class="glyphicon glyphicon-chevron-down"></span>
                      </a>
                      <a @click="deleteA(question.id, answer.id)">
                        <span class="glyphicon glyphicon-trash-alt">Delete</span>
                      </a>
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
import {
  mapActions
} from 'vuex'
import {
  db,
  firebase
} from '../firebase'

export default {
  data () {
    return {
      id: this.$route.params.id,
      form: {
        description: null,
        isAccepted: false
      },
      votes: [],
      questionVoteTotal: 0,
      currentUser: firebase.auth().currentUser,
      upTotal: 0,
      downTotal: 0
    }
  },
  methods: {
    ...mapActions(['getQuestion', 'setAnswer', 'getAnswers', 'deleteQuestion', 'getQuestionVotes']),
    deleteQ (id) {
      this.deleteQuestion(id)
      this.$router.push({
        name: 'questions'
      })
    },
    deleteA (questionId, answerId) {
      db.collection('questions').doc(questionId).collection('answers').doc(answerId).delete()
        .then(payload => {
          this.$router.push({name: 'questions'})
        })
        .catch(error => {
          console.log(error)
        })
    },
    reply () {
      let form = this.form
      form.id = this.question.id
      this.setAnswer(form)
    },
    upVote (id) {
      let currentUser = firebase.auth().currentUser
      db.collection('questions').doc(id).collection('votes')
        .where('uid', '==', currentUser.uid)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length === 0) {
            db.collection('questions')
              .doc(id).collection('votes')
              .add({
                uid: currentUser.uid,
                vote: true
              })
          } else {
            snapshot.forEach(doc => {
              db.collection('questions')
                .doc(id).collection('votes').doc(doc.id)
                .update({
                  vote: true
                })
            })
          }
        })
    },
    downVote (id) {
      let currentUser = firebase.auth().currentUser
      db.collection('questions').doc(id).collection('votes')
        .where('uid', '==', currentUser.uid)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length === 0) {
            db.collection('questions')
              .doc(id).collection('votes')
              .add({
                uid: currentUser.uid,
                vote: false
              })
          } else {
            snapshot.forEach(doc => {
              db.collection('questions')
                .doc(id).collection('votes').doc(doc.id)
                .update({
                  vote: false
                })
            })
          }
        })
    },
    upVoteAnswer (questionId, id) {
      let currentUser = firebase.auth().currentUser
      db.collection('questions')
        .doc(questionId).collection('answers')
        .doc(id).collection('votes')
        .where('uid', '==', currentUser.uid)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length === 0) {
            db.collection('questions')
              .doc(questionId).collection('answers')
              .doc(id).collection('votes')
              .add({
                uid: currentUser.uid,
                vote: true
              })
          } else {
            snapshot.forEach(doc => {
              db.collection('questions')
                .doc(questionId).collection('answers').doc(id)
                .collection('votes').doc(doc.id)
                .update({
                  vote: true
                })
            })
          }
        })
    },
    downVoteAnswer (questionId, id) {
      let currentUser = firebase.auth().currentUser
      db.collection('questions')
        .doc(questionId).collection('answers')
        .doc(id).collection('votes')
        .where('uid', '==', currentUser.uid)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length === 0) {
            db.collection('questions')
              .doc(questionId).collection('answers')
              .doc(id).collection('votes')
              .add({
                uid: currentUser.uid,
                vote: false
              })
          } else {
            snapshot.forEach(doc => {
              db.collection('questions')
                .doc(questionId).collection('answers').doc(id)
                .collection('votes').doc(doc.id)
                .update({
                  vote: false
                })
            })
          }
        })
    },
    calculateQuestionVotes (questionId) {
      db.collection('questions').doc(questionId).collection('votes')
        .get()
        .then(snapshot => {
          if (snapshot.docs.length !== 0) {
            snapshot.forEach(doc => {
              db.collection('questions')
                .doc(questionId).collection('votes')
                .get()
                .then(snapshot => {
                  let docs = []
                  snapshot.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    docs.push(data)
                  })
                  this.votes = docs
                })
                .catch(error => {
                  console.log(error)
                })
            })
          }
        })
    },
    upVotesTotal () {
      this.upTotal = this.votes.map(val => {
        return val.vote === true
      }).length
    },
    downVotesTotal () {
      this.downTotal = this.votes.map(val => {
        return val.vote === false
      }).length
    }
  },
  created () {
    this.getQuestion(this.id)
    this.getAnswers(this.id)
    this.calculateQuestionVotes(this.id)
    this.upVotesTotal()
    this.downVotesTotal()
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
  .profile-picture {
    width: 100px;
    border-radius: 50%;
    margin-right: 1em;
  }
  .btn-vote-question {
    font-size: 1.5em;
  }
  .panel-group {
    margin-left: 3em;
  }
  .question-vote {
    text-align: center;
    cursor: pointer;
  }
  .answer-vote a {
    cursor: pointer;
  }
  .page-header {
    margin-top: -0.3em;
  }
</style>
