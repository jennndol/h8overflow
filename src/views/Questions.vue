<template>
  <div>
    <navbar/>
    <section class="container">
    <div class="columns is-desktop">
      <div class="column is-3"></div>
      <div class="column is-6">
        <div class="box content">
          <article class="post">
            <h4>Bulma: How do you center a button in a box?</h4>
            <div class="media">
              <div class="media-left">
                <p class="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <a href="#">@jsmith</a> replied 34 minutes ago  &nbsp; 
                    <span class="tag">Question</span>
                  </p>
                </div>
              </div>
            <div class="media-right">
               <span class="has-text-grey-light"><i class="fa fa-comments"></i> 1</span>
            </div>
            </div>
          </article>
          <article class="post">
            <h4>How can I make a bulma button go full width?</h4>
            <div class="media">
              <div class="media-left">
                <p class="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <a href="#">@red</a> replied 40 minutes ago  &nbsp; 
                    <span class="tag">Programming</span>
                  </p>
                </div>
              </div>
              <div class="media-right">
               <span class="has-text-grey-light"><i class="fa fa-comments"></i> 0</span>
              </div>
            </div>
          </article>
          <article class="post">
            <h4>TypeError: Data must be a string or a buffer when trying touse vue-bulma-tabs</h4>
            <div class="media">
              <div class="media-left">
                <p class="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <a href="#">@jsmith</a> replied 53 minutes ago  &nbsp; 
                    <span class="tag">Question</span>
                  </p>
                </div>
              </div>
              <div class="media-right">
               <span class="has-text-grey-light"><i class="fa fa-comments"></i> 13</span>
              </div>              
            </div>
          </article>
          <article class="post">
            <h4>How to vertically center elements in Bulma?</h4>
            <div class="media">
              <div class="media-left">
                <p class="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <a href="#">@brown</a> replied 3 hours ago  &nbsp; 
                    <span class="tag">Question</span>
                  </p>
                </div>
              </div>
              <div class="media-right">
               <span class="has-text-grey-light"><i class="fa fa-comments"></i> 2</span>
              </div>              
            </div>
          </article>
          <article class="post">
            <h4>I'm trying to use hamburger menu on bulma css, but it doesn't work. What is wrong?</h4>
            <div class="media">
              <div class="media-left">
                <p class="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <a href="#">@hamburgler</a> replied 5 hours ago  &nbsp; 
                    <span class="tag">Question</span>
                  </p>
                </div>
              </div>
              <div class="media-right">
               <span class="has-text-grey-light"><i class="fa fa-comments"></i> 2</span>
              </div>              
            </div>
          </article>
          <article class="post">
            <h4>How to make tiles wrap with Bulma CSS?</h4>
            <div class="media">
              <div class="media-left">
                <p class="image is-32x32">
                  <img src="http://bulma.io/images/placeholders/128x128.png">
                </p>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <a href="#">@rapper</a> replied 3 hours ago  &nbsp; 
                    <span class="tag">Question</span>
                  </p>
                </div>
              </div>
              <div class="media-right">
               <span class="has-text-grey-light"><i class="fa fa-comments"></i> 2</span>
              </div>              
            </div>
          </article>
        </div>
      </div>
      <div class="column is-3"></div>
    </div>
  </section>
    <!-- <button @click="logout">Logout</button>
    <button @click="test">Test</button>
    <router-link to="/ask">Ask</router-link> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
import Navbar from './components/Navbar'

export default {
  name: 'questions',
  components: {
    Navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.getQuestions()
  },
  methods: {
    ...mapActions(['getQuestions']),
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    test () {
      let currentUser = firebase.auth().currentUser
      this.$db.collection('test').add({
        firstname: 'Muhammad',
        lastname: 'Luthfi',
        emailaddress: 'test@test.com',
        phonenumber: 'test',
        uid: currentUser.uid
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style scoped>
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}

.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.container{
  margin-top: 5em;
}
</style>
