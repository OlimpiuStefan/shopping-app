<template>
  <div class="mb-5 p-5">
    <div class="container">
      <div class="row d-flex">
        <h2 class="col-6 col-account d-inline-block title">
          CREATE ACCOUNT
        </h2>
        <router-link to="/login" class="login col-4">I Already Have It</router-link>
        <div class="col-12 col-account mb-5">
          <p class="col-account">TITLE*</p>
          <select class="w-25 account-input" v-model="account.title" required>
            <option v-for="(title, index) in titles" :key="index">
              {{ title }}
            </option>
          </select>
          <div v-if="isGenreNotSelected" class="alert-message">Please choose a genre.</div>
        </div>
        <div class="col-6 col-account mb-5">
          <p>FIRST NAME*</p>
          <input
              v-model="account.firstName"
              type="text"
              class="w-75  account-input"
          />
          <p v-show="!isFirstNameInputCompleted" class="alert-message">{{ firstNameMessageAlert }}</p>
        </div>
        <div class="col-6 col-account mb-5">
          <p>LAST NAME*</p>
          <input
              v-model="account.lastName"
              type="text"
              class="w-75  account-input"
          />
          <p v-show="!isLastNameInputCompleted" class="alert-message">{{ lastNameMessageAlert }}</p>
        </div>
        <div class="col-6 col-account mb-5">
          <p>EMAIL*</p>
          <input
              v-model="account.emailAddress"
              type="email"
              class=" w-75 account-input"
              required
          />
          <div v-show="isEmailAddressIncomplete" class="alert-message">Please enter a valid email address</div>
        </div>
        <div class="col-6 col-account mb-5">
          <p>PASSWORD*</p>
          <input
              v-model="account.password"
              placeholder="Password"
              name="password"
              class="  account-input w-75"
              :type="passwordFieldType"
              required
          />
          <span class="password-toggle" @click="togglePasswordVisibility">{{
              passwordToggleLabel
            }}</span>
          <div v-show="isPasswordIncomplete" class="alert-message">Password must contain at least 8 characters
            including
            uppercase and lowercase letters, numbers, and special characters
          </div>
        </div>
        <p class="col-account fs-5 my-4">CONSENT TO PERSONAL DATA PROCESSING</p>
        <div class="col-7 col-account  mb-5">
          <input v-model="isCheckboxChecked" type="checkbox" name="example" value="1"/>
          I agree to the collection and use of my personal data for marketing purposes
          <p v-show="isCheckboxNotClicked" class="alert-message">Please agree to the terms and conditions to create an
            account
          </p>
        </div>
        <div class="col-4 col-account mb-5 create-button">
          <button class="w-75 mt-5 col-4 p-2 create-account-button" @click="createAccount">Create account</button>
        </div>
      </div>
    </div>
    <div v-show="accountExists" class="overlay">
      <transition name="fade">
        <div class="alert alert-danger py-4 alert-password"
             role="alert">
          The email address is already in use by another account.
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {firebase} from "@/firebaseInit";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      titles: ["-", "MRS.", "MR."],
      account: {
        title: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        cart: [],
        favorites: [],
        deliveryAddresses: [],
        billingAddresses: [],
        orders: [],
        returns: [],
      },
      firstNameMessageAlert: '',
      lastNameMessageAlert: '',
      isCheckboxChecked: false,
      showPassword: false,
      accountExists: false,
      isGenreNotSelected: false,
      isEmailAddressIncomplete: false,
      isPasswordIncomplete: false,
      isLastNameInputCompleted: false,
      isFirstNameInputCompleted: false,
      isCheckboxNotClicked: false,
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
    createAccount() {
      const auth = firebase.auth();
      this.isGenreNotSelected = this.account.title === '';
      this.isFirstNameInputCompleted = this.verifyFirstName();
      this.isLastNameInputCompleted = this.verifyLastName();
      this.isEmailAddressIncomplete = !this.account.emailAddress.includes("@");
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*).{8,}$/;
      this.isPasswordIncomplete = !passwordRegex.test(this.account.password);
      this.isCheckboxNotClicked = !this.isCheckboxChecked;
      if (!this.isGenreNotSelected && this.isFirstNameInputCompleted && this.isLastNameInputCompleted &&
          !this.isEmailAddressIncomplete && !this.isPasswordIncomplete && !this.isCheckboxNotClicked) {
        auth.createUserWithEmailAndPassword(this.account.emailAddress, this.account.password)
            .then(userCredential => {
              console.log(userCredential)
              this.account.uid = userCredential.user.uid
              delete this.account.password
              this.$store.dispatch('addUser', this.account)
              this.$router.push("/login")
            }).catch(e => {
          console.log(e)
          this.accountExists = true;
          setTimeout(() => {
            this.accountExists = false;
          }, 5000);
        })
      }
    },
    verifyFirstName() {
      const regex = /^[a-zA-Z]+$/;
      if (this.account.firstName === '') {
        this.isFirstNameInputCompleted = false;
        this.firstNameMessageAlert = 'This field is required'
      } else if (!regex.test(this.account.firstName)) {
        this.isFirstNameInputCompleted = false;
        this.firstNameMessageAlert = 'Please enter only characters'
      } else {
        this.isFirstNameInputCompleted = true;
      }
      return this.isFirstNameInputCompleted
    },
    verifyLastName() {
      const regex = /^[a-zA-Z]+$/;
      if (this.account.lastName === '') {
        this.isLastNameInputCompleted = false;
        this.lastNameMessageAlert = 'This field is required'
      } else if (!regex.test(this.account.lastName)) {
        this.isLastNameInputCompleted = false;
        this.lastNameMessageAlert = 'Please enter only characters'
      } else {
        this.isLastNameInputCompleted = true;
      }
      return this.isLastNameInputCompleted
    },
  },
};
</script>

<style scoped>
.create-button {
  margin-left: 50px;
}

.login {
  margin-top: 115px;
  margin-bottom: 65px;
  margin-left: 50px;
  justify-content: end;
  text-align: end;
  color: #727272;
}

.login:hover {
  color: #000000;
}

.create-account-button {
  background-color: black;
  border: 1px solid black;
  color: white;
  width: 300px;
  right: 50px;
}

.create-account-button:hover {
  background-color: white;
  color: black;
}

.col-account {
  justify-content: start;
  text-align: start;
  font-family: "JetBrains Mono Light", sans-serif;
}

.account-input {
  border: none;
  position: relative;
  border-bottom: 1px solid #000000;
  outline: none;
  width: 400px;
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

.alert {
  position: absolute;
  top: 35%;
  left: 35%;
  width: 30%;
  height: max-content;
  z-index: 2;
}

.alert-message {
  color: red;
  font-size: 12px;
  width: 75%;
}

.password-toggle {
  position: relative;
  right: 45px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #999;
  cursor: pointer;
}
</style>
