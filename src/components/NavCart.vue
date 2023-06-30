<template>
  <div class="outer-card" @click="toggleCartButton">
    <div class="cart border border-dark" @click.stop>
      <div class="cart-header">
        <div class="shopping-bag p-2">Shopping bag</div>
        <div class="cart-close" @click="toggleCartButton">X</div>
      </div>
      <div class="cart-body">
        <CartItem/>
        <h5 class="fw-bold p-5 text-danger" v-show="isBagEmpty">YOUR BAG IS EMPTY</h5>
        <p class="p-5" v-show="this.$store.getters.getCartItemCount === 0 && !this.isBagEmpty">YOUR BAG IS EMPTY</p>
      </div>
      <div class="subtotal p-3">Subtotal: $ {{ this.$store.getters.getCartTotalPrice }}</div>
      <button @click="proceedToCheckout"
              class="checkout p-2 w-50 m-auto">Proceed to checkout
      </button>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem";

export default {
  name: "NavCart",
  components: {CartItem},
  data() {
    return {
      isBagEmpty: false,
    }
  },
  methods: {
    toggleCartButton() {
      this.$emit("toggleCart");
    },
    proceedToCheckout() {
      if (this.$store.getters.getCartItemCount === 0) {
        this.isBagEmpty = true;
        setTimeout(() => {
          this.isBagEmpty = false;
        }, 5000);
      } else {
        this.$router.push('/cart/summary')
      }
    }
  },
};
</script>

<style scoped>
.outer-card {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  width: 100%;
  height: 100%;
  top: 75px;
  z-index: 2;
}

.cart {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 360px;
  height: 450px;
  background-color: #dedede;
  transform: translateX(-4%);
  z-index: 2;
}

.cart-header {
  position: relative;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  background-color: #cccccc;
  width: 100%;
  justify-content: center;
  top: 0;
}

.cart-header:before {
  content: "";
  position: fixed;
  height: 0px;
  width: 0px;
  right: 22px;
  top: -30px;
  border-width: 15px;
  border-color: transparent #cccccc transparent transparent;
  border-style: solid;
  transform: rotate(90deg);
  z-index: -6;
}

.cart-close {
  display: grid;
  font-size: 20px;
  position: relative;
  cursor: pointer;
  justify-content: end;
  align-self: center;
  right: 5px;
  color: black;
}

.shopping-bag {
  position: relative;
  font-size: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.cart-body {
  background: #ffffff;
  overflow: auto;
  height: 285px;
}

.subtotal {
  background-color: #e8e8e8;
  top: 0;
  border-bottom: 1px solid black;
}

.checkout {
  background-color: black;
  color: white;
  border: black 1px solid;

}
</style>
