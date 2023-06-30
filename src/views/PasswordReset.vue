<template>
  <div class="pass-reset-page">
    <h3 class="title text-uppercase">Reset your password</h3>
    <div class="my-5 d-block m-auto">
      <p class="mb-5">Enter your email address to receive an email with instructions to reset your
        password.</p>
      <input v-on:keyup.enter="resetPassword"
             v-model="emailAddress" class="pass-reset-input w-25" placeholder="Email" type="email" required/>
      <p v-if="isEmailInputIncomplete" class="alert-message ms-2 d-block text-danger">{{ alertMessage }}</p>
      <button class="send-button p-2 mt-5 d-block m-auto" @click="resetPassword">Send</button>
    </div>
    <div v-show="showSuccessAlert" class="overlay">
      <transition name="fade">
        <div class="alert-log alert alert-success py-4"
             role="alert">
          An email has been sent to your account. Please check your inbox and follow the instructions to reset your password.
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {firebase} from "@/firebaseInit";

export default {
  name: "PasswordReset",
  data() {
    return {
      emailAddress: '',
      alertMessage: '',
      showSuccessAlert: false,
      isEmailInputIncomplete: false,
    }
  },
  methods: {
    resetPassword() {
      firebase.auth().sendPasswordResetEmail(this.emailAddress)
          .then(() => {
            console.log("Password reset email sent successfully");
            let clear = () => (this.showSuccessAlert = false)
            this.showSuccessAlert = true;
            setTimeout(clear, 5000);
          })
          .catch((error) => {
            console.error("Error sending password reset email:", error);
            if (this.emailAddress === '') {
              this.isEmailInputIncomplete = true;
              this.alertMessage = 'Please enter email'
            } else if (!this.emailAddress.includes('@')) {
              this.isEmailInputIncomplete = true;
              this.alertMessage = 'Please enter a valid email address'
            } else {
              this.isEmailInputIncomplete = true;
              this.alertMessage = 'This address is not registered in our database'
            }
          })
    }
  }
}
</script>

<style scoped>

.title {
  margin-top: 8%;
  margin-bottom: 7%;
  font-family: "JetBrains Mono Light", sans-serif;
}

.alert-message {
  position: absolute;
  left: 37%;
}

.pass-reset-page {
  position: relative;
  width: 100%;
  height: 50em;
}

.pass-reset-input {
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
}

.send-button {
  background-color: #ffffff;
  border: 1px solid black;
  color: black;
  width: 200px;
  margin-bottom: 20%;
}


.send-button:hover {
  background-color: #000000;
  border: none;
  color: #ffffff;
}

.overlay {
  width: 100%;
  border-bottom: solid 1px #333;
  display: grid;
  background-color: #a2a2a2;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black background */
  z-index: 1;
}

.alert-log {
  position: absolute;
  top: 20%;
  left: 32%;
  width: 35%;
  height: max-content;
  z-index: 2;
}


</style>