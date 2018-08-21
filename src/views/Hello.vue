<template>
<div class="hello">
  <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <div class="card card-signin my-5">
          <div class="card-body">
              <b-img rounded="circle" :src="dp" width="144" height="144" blank-color="#777" alt="img" class="m-1" center/>
              <button v-if="isLogin" class="btn btn-lg btn-google btn-block text-uppercase" type="submit" v-on:click="logout()">Sign out</button>
              <button v-else class="btn btn-lg btn-google btn-block text-uppercase" type="submit" v-on:click="login()"><i class="fa fa-google mr-2"></i> Sign in with Google</button>
          </div>
        </div>
  </div>
</div>
</template>

<script>
import firebase from "../firebase.js";
import { mapState } from "vuex";

export default {
  name: "Hello",
  computed: mapState({
    isLogin: state => state.user.isLogin,
    dp: state =>
      state.user.isLogin
        ? state.user.data.photoURL
        : "https://ae01.alicdn.com/kf/HTB118uvSXXXXXcVXXXXq6xXFXXXH/9-6cm-9-8cm-Car-Sticker-Cartoon-Funny-Ninja-Vinyl-Decal-Black-Silver-Accessories-S6-4099.jpg"
  }),
  methods: {
    login() {
      firebase.auth
        .signInWithPopup(firebase.provider)
        .then(() => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // let token = result.credential.accessToken;
          // The signed-in user info.
          // let user = result.user;
          console.log("Success");
          // this.currentUser = user;
          // this.dp = user.photoURL;
        })
        .catch(error => {
          // Handle Errors here.
          // let errorCode = error.code;
          let errorMessage = error.message;
          // The email of the user's account used.
          // let email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // let credential = error.credential;
          console.error(errorMessage);
        });
    },
    logout() {
      firebase.auth
        .signOut()
        .then(() => {
          console.log("Sign out");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-signin {
  border: 0;
  border-radius: 1em;
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #0052d4, #65c7f7, #9cecfb);
}

.card-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.btn-google {
  color: white;
  background-color: #ea4335;
  margin-top: 15px;
}
</style>
