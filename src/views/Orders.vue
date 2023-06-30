<template>
  <div class="orders-page">
    <h2 class="title">My account</h2>
    <div class="border-top pt-5 w-100">
      <NavProfile class="outer-card"/>
      <div class="bg-secondary bg-opacity-50" id="orders-card">
        <h4 class=" m-5 border border-1 bg-white p-3 order-title">My orders</h4>
        <div v-for="(order, index) in $store.state.user?.orders" :key="index"
             class="border border-dark bg-light rounded-2 my-3 mx-5 p-3">
          <h5 class="order-id py-2 fw-bold">Order: #{{ order.number }}</h5>
          <button class="btn btn-dark px-5" @click="showOrder(index)">
            {{ index === indexOrder ? 'Close' : 'See more' }}
          </button>
          <p class="border border-dark border-pgf"></p>
          <p class="date-status my-3">Data: <span class="fw-bold">{{ order.orderDate }}</span></p>
          <p class="amount m-3">Total: <span class="text-danger">${{ order.amount }}</span></p>
          <p class="date-status w-100">Status: <span class="fw-bold">{{ order.status }}</span></p>
          <router-link v-if="order.status === 'Received'"
                       :to="{
            name: 'ReturnItem',
            params: {
              order: order,
            },
          }"
                       id="return" class="text-decoration-none w-100 fw-bold">Return
          </router-link>
          <div v-show="index === indexOrder" class="my-5 pt-5">
            <h5 class="products-header d-block m-auto">Products ordered</h5>
            <div v-for="(item,index) in order.productList"
                 :key="index" class="cart-item m-auto">
              <img :src="item.product.img"/>
              <div>
                <h3 class="item-product-title">{{ item.product.title }}</h3>
                <p class="size mt-3 ">Size: <span id="size"> {{ item.size }}</span></p>
                <p class="quantity " type="number">Quantity: {{ item.quantity }}
                <p class="price">${{ item.quantityPrice }}</p>
              </div>
            </div>
            <div v-if="order.deliveryAddress" class="address-item  m-auto">
              <h5 class="mb-2 address-title"> Delivery address</h5>
              <p class="address">{{ order.deliveryAddress.city }}, {{
                  order.deliveryAddress.country
                }},{{ order.deliveryAddress.street }},{{ order.deliveryAddress.number }}
                {{ order.deliveryAddress.blockStaircase }}</p>
              <p class="pt-5 " id="postcode">{{ order.deliveryAddress.postcode }}</p>
            </div>

            <div v-if="order.billingAddress" class="address-item m-auto">
              <h5 class="mb-2 address-title">Billing address</h5>
              <p class="address">{{ order.billingAddress.city }}, {{
                  order.billingAddress.country
                }},{{ order.billingAddress.street }},{{ order.billingAddress.number }}
                {{ order.billingAddress.blockStaircase }}</p>
              <p class="pt-5 " id="postcode">{{ order.billingAddress.postcode }}</p>
            </div>
            <p class="payment-item m-auto"> Payment method: <span class="fw-bold">{{ order.paymentMethod }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavProfile from "@/components/NavProfile";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Orders",
  components: {NavProfile},
  data() {
    return {
      indexOrder: -1,
      currentDate: new Date(),
    }
  },
  methods: {
    showOrder(index) {
      this.indexOrder = this.indexOrder !== index ? index : -1;
    },
  }
}
</script>

<style scoped>
.title {
  margin-top: 130px;
  margin-bottom: 50px;
  letter-spacing: 2px;
}

.order-id {
  float: left;

}

.border-pgf {
  margin-top: 60px;
}

#orders-card {
  display: grid;
  width: 65%;
  padding-bottom: 5%;
  margin-right: 60px;
  margin-bottom: 100px;
  border: 1px solid grey;
  float: right;
}

#return {
  color: grey;
  float: left;
  text-align: start;
}

#return:hover {
  color: #3f3f3f;
}

.order-title {
  text-align: center;
  letter-spacing: 2px;
}

#size {
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #000000;
  padding: 4px;
}

.orders-page {
  padding-bottom: 150px;
}

.btn {
  float: right;
  border-radius: 0;
}

.amount {
  float: right;
}

.date-status {
  float: left;
  text-align: start;
}

.outer-card {
  text-align: left;
  float: left;
  margin-left: 13%;
  font-family: "Malgun Gothic Semilight", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  border: 1px solid grey;
  width: 16%;
}

.cart-item {
  grid-template-columns: 3fr 6fr 1fr;
}

.products-header,
.payment-item,
.address-item,
.cart-item {
  width: 70%;
  border-bottom: solid 1px #333;
  display: grid;
  padding: 20px;
  background-color: #ffffff;
}

.address-item {
  height: 110px;
  alignment: left;
}

.products-header,
.payment-item {
  text-align: start;
}

.address-title {
  width: 100%;
  text-align: start;
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

.address, #postcode {
  display: grid;
  position: absolute;
  float: left;
  font-size: 16px;
}

.address {
  margin-top: 30px;
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
  transform: translateY(150%) translateX(13%);
}

.size, .quantity {
  text-align: start;
}


</style>