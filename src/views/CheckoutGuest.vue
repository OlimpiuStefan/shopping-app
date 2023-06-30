<template>
  <div class="checkout-guest-page">
    <h2 class="title fw-bold">Continue to Checkout</h2>
    <div v-if="!isContinueClicked"
         class="form m-auto border border-2 p-5 rounded rounded-4">
      <p class="fw-bold pgf-form">Enter your email address to proceed</p>
      <span class="span-form mb-2">We need your email address to send updates about your order.</span>
      <span class="mt-3">Email*</span>
      <input
          v-model="emailAddress"
          type="text"
          class="w-100 p-1 email-input"
          v-on:keyup.enter="goToCheckoutGuest"
          required
      />
      <span v-show="isEmailAddressIncomplete" class="text-danger email-alert">Please enter a valid email</span>
      <button @click="goToCheckoutGuest" class="btn btn-dark rounded rounded-0 p-2 continue-button">Continue</button>
    </div>
    <div v-else>
      <div class="form m-auto border border-2 p-5 rounded rounded-4">
        <h5 class="fw-bold mb-2 form-name">Welcome!</h5>
        <span class="span-pgf-form">{{ emailAddress }}</span>
      </div>
      <div class="form m-auto border border-2 my-5 p-5 rounded rounded-4">
        <h5 class="fw-bold mb-3 form-name">Guest Checkout</h5>
        <p class="span-pgf-form">Not ready to become a member just yet?</p>
        <router-link to="/checkout" class="btn btn-dark rounded rounded-0 mt-2 p-2">Continue to checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CheckoutGuest",
  data() {
    return {
      emailAddress: '',
      isContinueClicked: false,
      isEmailAddressIncomplete: false,
    }
  },
  methods: {
    goToCheckoutGuest() {
      this.isEmailAddressIncomplete = !this.emailAddress.includes("@");
      this.isContinueClicked = !this.isEmailAddressIncomplete
    },
  },
}
</script>

<style scoped>

.email-alert {
  position: absolute;
  color: red;
  margin-top: 158px;
  font-size: 14px;
}

.email-input {
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
}

.checkout-guest-page {
  display: flow;
  margin-bottom: 20%;
}

.form {
  display: grid;
  width: 25%;
  text-align: start;
  background-color: #e5e5e5;
}

.continue-button {
  margin-top: 35px;
}

.title {
  margin-top: 7%;
  margin-bottom: 7%;
  letter-spacing: 2px;
}

.pgf-form {
  letter-spacing: 1px;
}

.form-name {
  letter-spacing: 1px;
}

.span-pgf-form {
  font-size: 14px;
}

.span-form {
  font-size: 12px;
}

</style>