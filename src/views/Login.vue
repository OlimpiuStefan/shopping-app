<template>
  <div class="login-page mb-5 p-5">
    <div>
      <h1 id="signIn-title">SIGN IN</h1>
      <p v-show="isAuthInvalid"
         class="alert-message mb-1">
        {{ message }}
      </p>
      <input
          v-model="emailAddress"
          class="d-flex m-auto mb-4 email-pass"
          type="emailAddress"
          name="emailAddress"
          placeholder="Email"
          required
      />
      <input
          v-model="password"
          class="d-flex m-auto email-pass"
          :type="passwordFieldType"
          name="password"
          placeholder="Password"
          required
      />
      <span class="password-toggle" @click="togglePasswordVisibility">{{ passwordToggleLabel }}</span>
      <router-link to="/password" id="forgot-password" class="m-auto mb-3">Forgot my password</router-link>
      <div class="account-pgf mb-5">
        <input type="checkbox" name="example" value="1"/>
        Sign-up for newsletter
      </div>
      <button class=" d-block m-auto my-4 login" @click="login">Login</button>
      <h5 class=" mb-4 d-block">or</h5>
      <h4 class=" mb-4 d-block">SIGN IN WITH</h4>
      <button class="google-button mb-5" @click="loginWithGoogle">
      <span class="google-button-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#4285F4"
            d="M47.161 24.85c0-1.53-.137-3.034-.397-4.495H24v8.525h11.873c-.498 2.59-2.063 4.787-4.32 6.253v5.182h6.998c4.104-3.776 6.477-9.354 6.477-15.465z"/>
      <path fill="#34A853"
            d="M24 48c5.86 0 10.77-1.94 14.336-5.268l-6.998-5.383c-1.938 1.315-4.45 2.1-7.338 2.1-5.646 0-10.424-3.81-12.142-8.937H2.764v5.59C6.317 42.23 14.297 48 24 48z"/>
      <path fill="#FBBC05"
            d="M11.858 28.803c-.35-.98-.537-2.03-.537-3.103s.187-2.123.537-3.103V17.11H2.764A23.953 23.953 0 0 0 0 24c0 3.853.916 7.513 2.764 10.79l9.094-7.114z"/>
      <path fill="#EB4335"
            d="M24 10.207c3.44 0 6.56 1.18 9.014 3.483l6.77-6.77C34.774 1.933 29.86 0 24 0 14.297 0 6.317 5.77 2.764 13.333l9.094 7.114C13.576 13.808 18.354 10.207 24 10.207z"/>
    </svg>
  </span>
        <span class="google-button-text ms-2">Google</span>
      </button>
      <router-link to="/register" class="create-account-button d-block my-5 p-2 m-auto">Create account</router-link>
    </div>
  </div>
</template>

<script>
import {firebase, GoogleAuthProvider} from "@/firebaseInit";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      showPassword: false,
      isAuthInvalid: false,
      currentUser: this.$store.state.user,
      emailAddress: "",
      password: "",
      message: '',
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
    passwordToggleLabel() {
      return this.showPassword ? "Hide" : "Show ";
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    //TODO: authorization -> add role for user  ["USER", "ADMIN"]
    //TODO: google authentication

    loginWithGoogle() {
      const db = firebase.firestore();
      console.log(GoogleAuthProvider)
      firebase.auth()
          .signInWithPopup(GoogleAuthProvider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            console.log(token, user, "sign in succesfully", result.additionalUserInfo.isNewUser)
            if (result.additionalUserInfo.isNewUser) {
              let account = {
                title: "",
                firstName: user.displayName,
                lastName: "",
                emailAddress: user.email,
                cart: [],
                favorites: [],
                deliveryAddresses: [],
                billingAddresses: [],
                orders: [],
                returns: [],
              }
              this.$store.dispatch('addUser', account)
              this.$store.commit("SET_LOGGED_USER", account)
              this.$router.push('/');
            } else {
              db.collection("users").where('uid', "==", user.uid)
                  .get()
                  .then((querySnapshot) => {
                    const actualUser = {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()}
                    console.log(actualUser)
                    this.$store.commit("SET_LOGGED_USER", actualUser)
                    this.$router.push('/');
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
            }

          }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
      });
    },

    login() {
      const auth = firebase.auth();
      const db = firebase.firestore();
      auth.signInWithEmailAndPassword(this.emailAddress, this.password)
          .then((userCredential) => {
            db.collection("users").where('uid', "==", userCredential.user.uid)
                .get()
                .then((querySnapshot) => {
                  const actualUser = {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()}
                  console.log(actualUser)
                  this.$store.commit("SET_LOGGED_USER", actualUser)
                  this.$router.push('/');
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
            const errorMessage = error.message;
            console.log(errorMessage)
            this.isAuthInvalid = true;
            this.message = "Invalid email or password";
          });
    }
  },
};
</script>

<style scoped>
#signIn-title {
  margin-top: 150px;
  margin-bottom: 50px;
}

#forgot-password {
  font-size: 12px;
  text-decoration: underline;
  color: black;
  position: relative;
  display: grid;
  width: max-content;
}

#forgot-password:hover {
  color: #7c7c7c;
}

.email-pass {
  padding: 3px;
  display: grid;
  width: 330px;
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
}

.password-toggle {
  position: relative;
  bottom: 28px;
  left: 140px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

.login-page {
  font-family: "JetBrains Mono Light", sans-serif;
}

.alert-message {
  color: red;
  font-size: 16px;
  margin-right: 150px;
}

.login {
  width: 200px;
  padding: 5px;
  justify-content: center;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  margin-top: 100px;
  border: 2px solid black;
  margin-bottom: 300px;
}

.login:hover {
  background-color: #000000;
  color: #ffffff;
  border: 2px solid black;
}

.create-account-button {
  cursor: pointer;
  background-color: #000000;
  border: 1px solid black;
  color: #ffffff;
  text-decoration: none;
  width: 300px;
}

.create-account-button:hover {
  background-color: #ffffff;
  color: #000000;
}
.google-button-text {
  text-transform: uppercase;
}
.google-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #444;
  cursor: pointer;
}

.google-button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.google-button-icon svg {
  width: 18px;
  height: 18px;
}

.google-button:hover,
.google-button:focus {
  background-color: #f5f5f5;
  outline: none;
}
</style>
