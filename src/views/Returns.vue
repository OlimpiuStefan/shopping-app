<template>
  <div class="returns-page">
    <h2 class="title">My account</h2>
    <div class="border-top pt-5 w-100">
      <NavProfile class="outer-card"/>
      <div class="bg-secondary bg-opacity-50" id="orders-card">
        <h4 class=" m-5 border border-1 bg-white p-3 order-title">My returns</h4>
        <div v-for="(returnedOrder, index) in $store.state.user?.returns" :key="index"
             class="border border-dark bg-light rounded-2 my-3 mx-5 p-4 ">
          <h5 class="return-number mb-1 d-block fw-bold">Return: #{{ returnedOrder.returnNumber }}</h5>
          <p class="details px-5" @click="showOrder(index, order)">
            {{ index === indexOrder ? 'close' : 'view details' }}
          </p>
          <p class="w-100 content-body">Data: <span class="fw-bold">{{ returnedOrder.returnDate }}</span></p>
          <p class="w-100 content-body">Returned products from the order:
            <span class="fw-bold">#{{ returnedOrder.orderNumber }}</span></p>
          <div v-show="index === indexOrder" class="my-5 pt-5">
            <p class="return-type w-100 content-body">Return type:
              <span class="fw-bold">Courier</span></p>
            <p class="refund-type w-100 content-body">Money refund option:
              <span class="fw-bold">Refund to the card</span></p>
            <p class="refund-type w-100 content-body">Status:
              <span class="fw-bold">{{ returnedOrder.status }}</span></p>
            <p v-show="returnedOrder.status === 'Pending'" class="pickup-date w-100 content-body">Estimate pickup date:
              <span class="fw-bold">{{ returnedOrder.estimatedPickupDate }}</span></p>
            <p class="message content-body">Message: {{ returnedOrder.message }}</p>
            <h4 class="products-header m-auto">Returned products</h4>
            <div v-for="(item,index) in returnedOrder.productList"
                 :key="index" class="cart-item m-auto ">
              <img :src="item.product.img"/>
              <div>
                <h3 class="item-product-title">{{ item.product.title }}</h3>
                <p class="size mt-3 ">Size: <span id="size"> {{ item.size }}</span></p>
                <p class="quantity " type="number">Quantity: {{ item.quantity }}</p>
              </div>
            </div>
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
  name: "Returns",
  components: {NavProfile},
  data() {
    return {
      indexOrder: -1,
    }
  },
  methods: {
    showOrder(index,order) {
      this.indexOrder = this.indexOrder !== index ? index : -1;
      this.getReturnDate(order.orderDate)
    },
    getReturnDate(orderDate) {
      const currentDate = new Date();
      const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
      const difference = currentDate.getTime() - orderDate.getTime();
      return difference > thirtyDaysInMilliseconds;
    }
  }
}
</script>

<style scoped>


#orders-card {
  display: grid;
  width: 65%;
  padding-bottom: 5%;
  margin-right: 60px;
  margin-bottom: 100px;
  border: 1px solid grey;
  float: right;
}

#size {
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #000000;
  padding: 4px;
}

.returns-page {
  padding-bottom: 150px;
}

.title {
  margin-top: 130px;
  margin-bottom: 50px;
  letter-spacing: 2px;
}

.return-number {
  float: left;
}

.details {
  float: right;
  cursor: pointer;
}

.details:hover {
  color: grey;
}

.order-title {
  text-align: center;
  letter-spacing: 2px;
}

.content-body {
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
.cart-item {
  width: 95%;
  border-bottom: solid 1px #333;
  display: grid;
  padding: 20px;
  background-color: #ffffff;

}

.products-header {
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

.size, .quantity {
  text-align: start;
}


</style>