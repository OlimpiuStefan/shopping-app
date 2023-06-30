<template>
  <div class="order-confirmation-page">
    <h4>Your order has been placed successfully. </h4>
    <h4 class="mb-4">You will receive an email confirmation shortly.</h4>
    <router-link to="/orders" class="btn btn-dark m-4 py-2 px-4">Go to Orders</router-link>
    <router-link to="/" class="btn btn-dark m-4 py-2 ">Return to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "OrderConfirmation",
  mounted() {
    const queryParams = this.$route.query;
    console.log("query params:", queryParams)
    console.log("query params:", queryParams.redirect_status)
  },
}
</script>

<style scoped>
.order-confirmation-page {
  font-family: "Malgun Gothic Semilight", sans-serif;
  margin-top: 22%;
  position: relative;
  padding-bottom: 400px;
}
</style>