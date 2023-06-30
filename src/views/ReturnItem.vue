<template>
  <div>
    <div class="border-top pt-5 w-100">
      <NavProfile class="outer-card"/>
      <div v-if="order" class="bg-secondary bg-opacity-50" id="orders-card">
        <h3 class="order-id py-5 fw-bold">Order: #{{ order.number }}</h3>
        <h5 class="products-header d-block m-auto">Products ordered</h5>
        <div v-for="(item,index) in order.productList"
             :key="index" class="cart-item m-auto">
          <img :src="item.product.img"/>
          <div>
            <h3 class="item-product-title">{{ item.product.title }}</h3>
            <p class="size mt-3 ">Size: <span id="size"> {{ item.size }}</span></p>
            <p class="quantity " type="number">Quantity: {{ item.quantity }}
            <div class="fw-bold select">
              <input v-model="item.selected" type="checkbox" name="example" :value="item.product"/>
              <span class="ms-2"> Return this product</span>
            </div>
            <p class="price">${{ item.quantityPrice }}</p>
          </div>
        </div>
        <textarea v-model="message" class="message m-auto mt-5" @input="checkCharacterLimit"
                  placeholder="Write your message"></textarea>
        <p>{{ remainingChars }} characters remaining</p>
        <button @click="sendProductToReturn" class="btn btn-dark w-25 m-auto p-2 mt-3">SEND</button>
      </div>
    </div>
    <div v-show="showImportantAlert" class="overlay">
      <transition name="fade">
        <div class="alert alert-primary py-4"
             role="alert">
          <h5> Make sure that you have selected the right products. </h5>
          <h5> You can't return twice.</h5>
        </div>
      </transition>
    </div>
    <div v-show="showSelectProductAlert " class="overlay">
      <transition name="fade">
        <div class="alert alert-danger py-4"
             role="alert">
          <h5> Please select the product you wish to return </h5>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import NavProfile from "@/components/NavProfile";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ReturnItem",
  components: {NavProfile},
  props: ['order'],
  data() {
    return {
      selectedProducts: this.getSelectedProducts(),
      message: '',
      status: '',
      maxChars: 1000,
      orderNumber: this.order.number,
      hasReturned: false,
      isFirstClick: false,
      showImportantAlert: false,
      showSelectProductAlert: false,
    }
  },
  computed: {
    remainingChars() {
      return this.maxChars - this.message.length;
    }
  },
  methods: {
    getSelectedProducts() {
      return this.order.productList.filter(item => item.selected);
    },
    checkCharacterLimit() {
      if (this.message.length > this.maxChars) {
        this.message = this.message.slice(0, this.maxChars);
      }
    },
    async sendProductToReturn() {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, '0');
      let day = String(currentDate.getDate()).padStart(2, '0');
      let formattedDate = `${year}-${month}-${day}`;
      let randomDays = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
      let randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      let estimatedDate = new Date(currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000);
      if (currentDate > estimatedDate) {
        this.status = 'Received';
      } else {
        this.status = 'Pending';
      }
      let orderToReturn = {
        productList: this.getSelectedProducts(),
        returnDate: formattedDate,
        orderNumber: this.orderNumber,
        returnNumber: randomNum,
        message: this.message,
        estimatedPickupDate: estimatedDate,
        status: this.status,
      }
      if (orderToReturn.productList.length > 0) {
        if (this.isFirstClick) {
          this.isFirstClick = false;
        } else {
          if (!this.hasReturned) {
            this.showImportantAlert = true;
            let clear = () => (this.showImportantAlert = false)
            if (this.showImportantAlert) {
              setTimeout(clear, 5000);
            }
            console.log('PRODUCTS TO RETURN', this.selectedProducts)
            console.log('RETURNED ORDER', orderToReturn)
          } else {
            await this.$store.dispatch('setReturn', orderToReturn);
            this.$router.push('/return/confirmation')
          }
        }
        this.hasReturned = true;
      } else {
        this.showSelectProductAlert = true;
        let clear = () => (this.showSelectProductAlert = false)
        if (this.showSelectProductAlert) {
          setTimeout(clear, 3000);
        }
      }
    },
  }
}
</script>

<style scoped>
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


#size {
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #000000;
  padding: 4px;
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
  margin-top: 30px;
}

.products-header,
.cart-item {
  width: 70%;
  border-bottom: solid 1px #333;
  display: grid;
  padding: 20px;
  background-color: #ffffff;
}

.message {
  width: 70%;
  height: 300px;
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
  width: max-content;
  text-align: start;
  text-decoration: none;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.034);
  transition: 0.5s;
}

.price {
  display: flex;
  justify-content: right;
  transform: translateY(70%) translateX(13%);

}

.size, .quantity {
  text-align: start;
}

.select {
  text-align: start;
  transform: translateY(140%);
}


</style>