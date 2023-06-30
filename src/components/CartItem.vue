<template>
  <div>
    <div v-for="(item, index) in this.$store.state.user?.cart" :key="index" class="cart-item">
      <img :src="item.product.img"/>
      <div>
        <router-link
            :to="{
                  name: 'ItemDetails',
                  params: {
                    product: item.product,
                    id: item.product.id,
                  },
                }" class="item-header"
        >
          <h3 class="item-product-title px-2">{{ item.product.title }}</h3></router-link>
        <div>
          <p class="size text-uppercase mt-2 d-inline-block ">Size: <span id="size"> {{ item.size }}</span></p>
          <div class="d-inline-block justify-content-end">
            <button class="quantity-button m-2 " @click="decreaseQuantity(item)">-</button>
            <span class="quantity " type="number">{{ item.quantity }}</span>
            <button class="quantity-button m-2" @click="increaseQuantity(item)">+</button>
          </div>
        </div>
        <span class="price">${{ item.quantityPrice }}</span>
      </div>
      <div class="cancel px-2 ">
        <span @click.prevent="removeProductFromCart(index)">X</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CartItem",
  methods: {
    async removeProductFromCart(index) {
        await this.$store.dispatch("removeProductFromCart", index);
    },
    increaseQuantity(item) {
      this.$store.dispatch('increaseQuantity', item)
    },
    decreaseQuantity(item) {
      this.$store.dispatch('decreaseQuantity', item)
    }
  },
};
</script>

<style scoped>
img {
  position: relative;
  width: 80px;
  height: 130px;
  display: block;
  left: 0;
  object-position: top;
  animation: fade-in 0.5s forwards;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#size {
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid black;
  padding: 4px;
  font-family: "ITC Cheltenham Std", sans-serif;
}

.cart-item {
  display: grid;
  grid-template-columns: 3fr 6fr 1fr;
  padding: 1em 0.8em;
  overflow-x: hidden;
  text-decoration: none;
  color: black;
  transition: 0.5s;
}

.cart-item:hover {
  background-color: grey;
}

.item-product-title {
  display: flex;
  position: relative;
  font-size: 16px;
  text-align: start;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Clab Personal Use", sans-serif;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.034);
  transition: 0.5s;
}

.item-product-title:hover {
  color: #dedede;
}

.item-header {
  text-decoration: none;
}

.price {
  display: flex;
  justify-content: right;
  margin-top: 1.3em;
  font-size: 1rem;
  letter-spacing: 0.2em;
  color: black;
  font-family: "Valverde", sans-serif;
  font-weight: 100;
}

.quantity-button {
  border: none;
  background-color: white;
  padding: unset;
  width: 20px;
  height: 30px;
  font-size: 20px;
}

.quantity-button:hover {
  background-color: #c0c0c0;
}

.size {
  margin-right: 10px;
  padding-left: 3px;
}

.quantity {
  font-size: 20px;
}

.cancel {
  text-align: right;
  margin-right: 3px;
  transform: translateY(-3%) translateX(30%);
  position: relative;
  font-size: 1.2em;
  transition: 0.5s;
}

.cancel:hover {
  color: #dedede;
  cursor: pointer;
}
</style>
