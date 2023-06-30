<template>
  <div class="order-summary-page bg-secondary bg-opacity-75">
    <div class="gradient-section ">
      <h1 class="title text-light">Shopping bag</h1>
    </div>
    <div v-for="(item,index) in cart"
         :key="index" class="cart-item m-auto mb-3">
      <img :src="item.product.img"/>
      <div>
        <h3 class="item-product-title">{{ item.product.title }}</h3>
        <p class="size mt-3 ">Size: <span id="size"> {{ item.size }}</span></p>
        <p class="quantity " type="number">Quantity: {{ item.quantity }}
        <p class="price">${{ item.quantityPrice }}</p>
      </div>
      <div class="cancel px-3 ">
        <div @click.prevent="removeProductFromCart(item)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16"
               height="16" fill="currentColor" class="bi bi-trash3"
               viewBox="0 0 16 16">
            <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="p-4 m-auto summary-card">
      <h4 class="fw-bold mb-5">ORDER SUMMARY</h4>
      <p>Subtotal: ${{ cartTotalPrice }}</p>
      <h5 class="fw-bold py-3 border-top border-bottom">Total: ${{ cartTotalPrice }} </h5>

      <router-link to="/" class="footer-back">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace"
             viewBox="0 0 16 16">
          <path
              d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
          <path
              d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
        </svg>
        Back to shopping
      </router-link>
      <div>
        <button class="py-2 px-4 " @click="continueToCheckout" id="checkout-btn">Continue to checkout</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CartSummary",
  data() {
    return {
      cart: this.$store.state.user?.cart,
    };
  },
  computed: {
    cartTotalPrice() {
      return this.$store.getters.getCartTotalPrice
    }
  },
  methods: {
    removeProductFromCart(product) {
      this.$store.dispatch("removeProductFromCart", product);
    },
    async continueToCheckout() {
      console.log("hostname", location.host)
      const intent = await fetch("http://localhost:9999/.netlify/functions/stripe", {
        // const intent = await fetch("https://shopping-app-meduzza.netlify.app/.netlify/functions/stripe", {
        method: 'POST',
        body: JSON.stringify({amount: this.cartTotalPrice, currency: "RON"})
      })
      const {paymentIntent} = await intent.json()
      console.log(paymentIntent)
      await this.$router.push({
        name: 'Checkout',
        params: {
          clientSecret: paymentIntent?.client_secret,
        }
      })
    },
  },
}
;
</script>

<style scoped>

#checkout-btn {
  background-color: black;
  color: white;
  border-radius: 0;
  float: right;
  width: max-content;
  border: 1px solid black;
}

#size {
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #000000;
  padding: 4px;
}

#checkout-btn:hover {
  background-color: white;
  color: black;
}

.order-summary-page {
  font-family: "Malgun Gothic Semilight", sans-serif;
  position: relative;
  padding-bottom: 250px;
}

.title {
  margin-top: 120px;
  margin-bottom: 100px;
  letter-spacing: 0.1em;
  font-weight: 100;
}

.cart-item {
  width: 60%;
  border-bottom: solid 1px #333;
  display: grid;
  grid-template-columns: 3fr 6fr 1fr;
  padding: 20px;
  background-color: #ffffff;
}

.cart-item:hover {
  background-color: #e3e3e3;
}

.cart-item img {
  position: relative;
  width: 130px;
  height: 170px;
  display: block;
  left: 0;
  object-position: top;
  animation: fade-in 0.5s forwards;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.item-product-title {
  display: flex;
  position: relative;
  font-size: 16px;
  text-align: start;
  text-decoration: none;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.034);
  transition: 0.5s;
}

.price {
  display: flex;
  justify-content: right;
  letter-spacing: 0.2em;
  transform: translateY(150%) translateX(13%);
}

.size, .quantity {
  text-align: start;
}

.cancel {
  text-align: right;
  margin-right: 7px;
  margin-top: -10px;
  transform: translateY(-3%) translateX(30%);
  font-size: 18px;
  color: #000000;
}

.cancel:hover {
  color: #ffffff;
  cursor: pointer;
}

.summary-card {
  display: grid;
  width: 60%;
  border-bottom: solid 1px #333;
  background-color: #ffffff;
  text-align: start;
}

.footer-back {
  text-decoration: none;
  color: black;
  width: max-content;
  transform: translateY(70%);
}

.footer-back:hover {
  color: #656565;
}

.login-checkout {
  width: 100%;
  border-bottom: solid 1px #333;
  display: grid;
  background-color: #a2a2a2;
  position: fixed;
  top: -5%;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black background */
  z-index: 1;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 40%;
  background-color: #e7e7e7;
  transform: translate(-50%, -50%); /* center the element */
  z-index: 2;
}

.login {
  width: 70%;
  border: 1px solid black;
  text-align: center;
  color: black;
  background-color: white;
  transform: translateY(200%);
}

.login:hover {
  background-color: black;
  color: white;
}
</style>
