<template>
  <div class="checkout-page">
    <h1 class="title">Checkout</h1>
    <div v-if=" !existDeliveryAddresses">
      <h4> Select a delivery address<span class="d-block m-auto">or</span></h4>
      <button class="py-2 mb-4 px-4 add-button" @click="addNewDeliveryAddress">
        {{ isAddDeliveryAddressButtonClicked ? 'Close' : 'Add delivery address' }}
      </button>
    </div>
    <div v-if="isAddDeliveryAddressButtonClicked || existDeliveryAddresses">
      <AddressForm :addressInitial="deliveryAddress"
                   titleInitial="Delivery address"
                   :isAddressSavedInitial="false"
                   :index="currentDeliveryAddressesIndex"
                   @closeAddressForm="closeAddingDeliveryAddressForm"/>
    </div>
    <p v-show="isDeliveryAddressNotSelected" class="w-50 m-auto address-alert">Select a delivery address</p>

    <AddressList :addresses="deliveryAddresses"
                 title="Delivery address"
                 @selectDeliveryAddress="selectDeliveryAddress"
    />

    <div v-if="existBillingAddresses" class="mt-5">
      <h4> Select a billing address<span class="d-block m-auto">or</span></h4>
      <button class="py-2 mb-4 px-4 add-button " @click="addNewBillingAddress">
        Add billing address
      </button>
    </div>
    <div v-if="isAddBillingAddressButtonClicked || !existBillingAddresses">
      <AddressForm :addressInitial="billingAddress"
                   titleInitial="Billing address"
                   :isAddressSavedInitial="false"
                   :index="currentBillingAddressesIndex"
                   @closeAddressForm="closeAddingBillingAddressForm "/>
    </div>
    <p v-show="isBillingAddressNotSelected" class="w-50 m-auto pe-3 address-alert">Select a billing address</p>
    <AddressList :addresses="billingAddresses" title="Billing address"
                 @selectBillingAddress="selectBillingAddress"/>

    <div class="summary-card border border-2 m-auto w-50 pt-3 mt-5 px-5 rounded rounded-4">
      <div class="p-4 m-auto shipping">
        <h4 class="mb-5 summary-title">Shipping method</h4>
        <p v-show="showShippingMethodAlert" class="shipping-method-alert">Please select a shipping method</p>
        <div>
          <input v-model="isCheckboxStandardChecked" @click="selectShippingMethod" type="checkbox" name="example"
                 value="1"/>STANDARD
          <p class="shipping-method">4-5 working days <span class="shipping-standard">Free</span></p></div>
        <div>
          <input v-model="isCheckboxExpressChecked" @click="selectShippingMethod" type="checkbox" name="example"
                 value="1"/>
          EXPRESS
          <p class="shipping-method">1-2 working days<span class="shipping-express"> ${{ expressShippingPrice }} </span>
          </p>
        </div>
      </div>
      <div class="p-4 m-auto payment">
        <h4 class="mb-5 summary-title">Payment method</h4>
        <p v-if="showPaymentMethodAlert" class="payment-method-alert">Please select a payment method</p>
        <div class="my-2">
          <input v-model="isCheckboxCreditCardChecked" @click="selectPaymentMethod" type="checkbox" name="example"
                 value="1"/>
          Credit Card
          <img
              src="https://www.dolcegabbana.com/on/demandware.static/Sites-dolcegabbana-Site/-/default/dwb03681c3/images/master.png"
              class="first-credit-card"/>
          <img
              src="https://www.dolcegabbana.com/on/demandware.static/Sites-dolcegabbana-Site/-/default/dw14dc6ef9/images/visa.png"
              class="m-2"/>
          <img
              src="https://www.dolcegabbana.com/on/demandware.static/Sites-dolcegabbana-Site/-/default/dw26f78c16/images/maestro.png"
              class="m-2"/>
          <img
              src="https://www.dolcegabbana.com/on/demandware.static/Sites-dolcegabbana-Site/-/default/dw30c08c97/images/amex.png"
              class="m-2"/>
          <span class="payment-method my-2">FREE </span>
        </div>
        <div v-show="isCheckboxCreditCardChecked" class="my-4 border border-secondary rounded-2">
          <stripe-element-payment
              class="p-5"
              ref="paymentRef"
              :pk="pk"
              :elements-options="elementsOptions"
              :confirm-params="confirmParams"
              @error="displayStripeError"
          />
        </div>
      </div>
      <div class="p-4 m-auto order-summary">
        <h4 class="fw-bold mb-5">ORDER SUMMARY</h4>
        <div v-show="isCouponCodeValid">
          <p class="text-success">You saved: ${{ savedMoney }}</p>
        </div>
        <p>Subtotal:<span :class="{'text-decoration-line-through' : isCouponCodeValid}">${{ subtotal }}</span>
          <span> {{ isCouponCodeValid ? subtotalAfterCouponCode : '' }}</span>
        </p>
        <div class="mb-3">
          <p class="coupon-code-span d-inline-block" @click="enterCouponCode">
            {{ !showEnterCouponCodeForm ? '+Enter coupon code' : '- Enter coupon code' }}</p>
          <div v-if="showEnterCouponCodeForm" class="d-inline-block">
            <input v-model="couponCode" class="coupon-code-input" type="text" v-on:keyup.enter='applyCouponCode'/>
            <button v-if="!isCouponCodeApplied" @click="applyCouponCode" class="coupon-code-button">Apply</button>
            <button v-else class="coupon-code-button" @click="removeCouponCode">
              {{ isCouponCodeApplied ? 'Remove' : 'Apply' }}
            </button>
          </div>
          <p v-show="isCouponCodeInvalid" class="coupon-code-alert">The coupon code is not valid.</p>
        </div>
        <p>{{ isCheckboxExpressChecked ? ' Shipping: $' : 'Shipping:' }}
          <span :class="[ shippingFinalCost === 0 ? 'text-success' : 'text-dark']">
            {{ shippingFinalCost === 0 ? 'Free' : shippingFinalCost }}
          </span>
        </p>
        <h5 class="fw-bold py-3 border-top border-bottom">Total: ${{ cartTotalPrice }} </h5>
        <router-link to="/" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace"
               viewBox="0 0 16 16">
            <path
                d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
            <path
                d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
          </svg>
          Back to shopping
        </router-link>
        <div class="payment-button-div">
          <button class="py-2 px-3 m-2 btn btn-dark" id="payment-button" @click="pay">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressForm from "@/components/AddressForm";
import AddressList from "@/components/AddressList";
import {v4 as uuid} from 'uuid';
import {StripeElementPayment} from '@vue-stripe/vue-stripe';
import {firebase} from "@/firebaseInit";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Checkout",
  components: {AddressForm, AddressList, StripeElementPayment},
  props: ['clientSecret'],
  data() {
    return {
      subtotal: this.$store.getters.getCartTotalPrice,
      cart: this.$store.state.user?.cart,
      showEnterCouponCodeForm: false,
      isCouponCodeInvalid: false,
      showShippingMethodAlert: false,
      showPaymentMethodAlert: false,
      isCheckboxStandardChecked: false,
      isCheckboxExpressChecked: false,
      isCheckboxCreditCardChecked: false,
      isCheckboxCashPaymentChecked: false,
      isAddDeliveryAddressButtonClicked: false,
      isAddBillingAddressButtonClicked: false,
      isCouponCodeApplied: false,
      isCouponCodeValid: false,
      isDeliveryAddressNotSelected: false,
      isBillingAddressNotSelected: false,
      expressShippingCost: 35,
      couponCodeName: 'EXTRA10',
      couponCode: '',
      status: '',
      shippingPrice: '',
      deliveryAddressSelected: null,
      billingAddressSelected: null,
      isFormValid: false,
      pk: process.env.VUE_APP_STRIPE_PK,
      elementsOptions: {
        appearance: {},
        clientSecret: this.clientSecret
      },
      confirmParams: {
        return_url: 'http://localhost:8080/order/confirmation',
      },
    };
  },
  computed: {
    deliveryAddress() {
      let address = {};
      if (this.existDeliveryAddresses) {
        address = {
          country: '',
          city: '',
          street: '',
          number: '',
          blockStaircase: '',
          postcode: '',
        }
      }
      return address
    },
    billingAddress() {
      let address = {};
      if (this.existBillingAddresses) {
        address = {
          country: '',
          city: '',
          street: '',
          number: '',
          blockStaircase: '',
          postcode: '',
        }
      }
      return address
    },
    currentBillingAddressesIndex() {
      return this.$store.getters.getCurrentBillingAddressesIndex
    },
    currentDeliveryAddressesIndex() {
      return this.$store.getters.getCurrentDeliveryAddressesIndex
    },
    existDeliveryAddresses() {
      return this.currentDeliveryAddressesIndex === 0
    },
    existBillingAddresses() {
      return this.currentBillingAddressesIndex !== 0
    },
    deliveryAddresses() {
      return this.$store.state.user?.deliveryAddresses
    },
    billingAddresses() {
      return this.$store.state.user?.billingAddresses
    },
    expressShippingPrice() {
      return this.expressShippingCost.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    },
    shippingFinalCost() {
      if (this.isCheckboxStandardChecked) {
        return 0
      }
      return this.expressShippingPrice;
    },
    subtotalAfterCouponCode() {
      let total
      let price = parseFloat(this.subtotal.replace('.', ''));
      if (this.isCouponCodeValid) {
        total = price - parseFloat(this.savedMoney);
      } else {
        total = price;
      }
      return '$' + total.toLocaleString('pt-BR', {maximumFractionDigits: 2});
    },
    savedMoney() {
      let price = parseFloat(this.subtotal.replace('.', ''));
      let total = (price - (price * 0.9)).toFixed(2)
      return total.replace('.', ',')
    },
    cartTotalPrice() {
      let total;
      let price = parseFloat(this.subtotal.replace('.', ''));
      if (this.isCheckboxStandardChecked || this.isCheckboxExpressChecked && !this.showEnterCouponCodeForm) {
        total = price + parseFloat(this.shippingFinalCost);
      } else if (this.isCouponCodeInvalid && (this.isCheckboxStandardChecked || this.isCheckboxExpressChecked)) {
        total = price + parseFloat(this.shippingFinalCost);
      } else if (this.isCouponCodeValid && (this.isCheckboxStandardChecked || this.isCheckboxExpressChecked)) {
        total = price - parseFloat(this.savedMoney) + parseFloat(this.shippingFinalCost);
      } else if (this.isCouponCodeValid && (!this.isCheckboxStandardChecked && !this.isCheckboxExpressChecked)) {
        total = price - parseFloat(this.savedMoney);
      } else {
        total = price
      }
      return total.toLocaleString('pt-BR', {maximumFractionDigits: 2});
    },
  },
  mounted() {
    console.log("ok", this.clientSecret)
    console.log(this.$route.params.clientSecret);
    console.log(this.$refs.paymentRef)
  },
  methods: {
    displayStripeError(e) {
      console.log("error sytripe")
      console.log(e)
    },
    addNewDeliveryAddress() {
      this.isAddDeliveryAddressButtonClicked = !this.isAddDeliveryAddressButtonClicked
      this.address = {
        country: '',
        city: '',
        street: '',
        number: '',
        blockStaircase: '',
        postcode: '',
      }
    },
    addNewBillingAddress() {
      this.isAddBillingAddressButtonClicked = !this.isAddBillingAddressButtonClicked
      this.address = {
        country: '',
        city: '',
        street: '',
        number: '',
        blockStaircase: '',
        postcode: '',
      }
    },
    closeAddingDeliveryAddressForm() {
      this.isAddDeliveryAddressButtonClicked = false;
      this.currentDeliveryAddressesIndex = this.currentDeliveryAddressesIndex !== 0;
    },
    closeAddingBillingAddressForm() {
      this.isAddBillingAddressButtonClicked = false;
      this.currentBillingAddressesIndex = this.currentBillingAddressesIndex !== 0;
    },
    selectShippingMethod() {
      if (this.isCheckboxStandardChecked) {
        this.isCheckboxStandardChecked = !this.isCheckboxStandardChecked;
        this.isCheckboxExpressChecked = false;
      }
      if (this.isCheckboxExpressChecked) {
        this.isCheckboxExpressChecked = !this.isCheckboxExpressChecked;
        this.isCheckboxStandardChecked = false;
      }
    },
    selectPaymentMethod() {
      this.isCheckboxCreditCardChecked = !this.isCheckboxCreditCardChecked;
    },
    enterCouponCode() {
      this.showEnterCouponCodeForm = !this.showEnterCouponCodeForm
    },
    applyCouponCode() {
      if (this.showEnterCouponCodeForm && (this.couponCode.toLowerCase() !== this.couponCodeName.toLowerCase())) {
        this.isCouponCodeInvalid = true;
      } else {
        this.isCouponCodeInvalid = false;
      }
      this.isCouponCodeValid = !this.isCouponCodeInvalid;
      this.isCouponCodeApplied = true;
    },
    removeCouponCode() {
      if (this.couponCode !== "") {
        this.couponCode = '';
      }
      this.isCouponCodeApplied = false;
    },
    selectDeliveryAddress(selectedAddress) {
      this.deliveryAddressSelected = selectedAddress;
    },
    selectBillingAddress(selectedAddress) {
      this.billingAddressSelected = selectedAddress;
    },
    getCurrentDate() {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, '0');
      let day = String(currentDate.getDate()).padStart(2, '0');
      let formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    getEstimateArrivalDate() {
      let currentDate = new Date();
      let estimatedArrivalDate = new Date();
      if (this.isCheckboxStandardChecked) {
        estimatedArrivalDate.setDate(currentDate.getDate() + 4);
      } else if (this.isCheckboxExpressChecked) {
        estimatedArrivalDate.setDate(currentDate.getDate() + 1);
      }
      let year = estimatedArrivalDate.getFullYear();
      let month = String(estimatedArrivalDate.getMonth() + 1).padStart(2, '0');
      let day = String(estimatedArrivalDate.getDate()).padStart(2, '0');
      let formattedEstimatedArrivalDate = `${year}-${month}-${day}`;
      return formattedEstimatedArrivalDate;
    },
    async pay() {
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      if (this.deliveryAddressSelected === null) {
        this.isDeliveryAddressNotSelected = true;
      }
      if (this.billingAddressSelected === null) {
        this.isBillingAddressNotSelected = true;
      }
      let statusOrder;
      let currentDate = new Date();
      if (currentDate > this.getEstimateArrivalDate()) {
        statusOrder = 'Received'
      } else {
        statusOrder = "Processing"
      }

      let order = {
        id: uuid(),
        number: randomNum,
        orderDate: this.getCurrentDate(),
        estimateArrivalDate: this.getEstimateArrivalDate(),
        amount: this.cartTotalPrice,
        productList: this.$store.state.user?.cart,
        deliveryAddress: this.deliveryAddressSelected,
        billingAddress: this.billingAddressSelected,
        paymentMethod: 'Credit Card',
        status: statusOrder,
      }
      console.log("payyyy1")
      this.showShippingMethodAlert = !this.isCheckboxStandardChecked && !this.isCheckboxExpressChecked
      this.showPaymentMethodAlert = !this.isCheckboxCreditCardChecked
      if (!this.showShippingMethodAlert && !this.showPaymentMethodAlert && this.billingAddressSelected !== null
          && this.deliveryAddressSelected !== null) {
        // if (isFormValid) {
        console.log("payyyy2")
        try {
          const res1 = await this.$refs.paymentRef.submit();
          console.log("res:", res1)
        } catch (e) {
          console.log("error:", e)
        }
        await this.$store.dispatch('setOrder', order)
        // this.$router.push('/order/confirmation')
        const db = firebase.firestore();
        let HTMLmessage = this.form.message.replace(/\n/g, '<br/>');
        db.collection('email').add({
          to: 'example@domain.com',
          template: {
            name: "template_name",
            data: {
              email: this.$store.state.user.emailAddress,
              message: HTMLmessage
            }
          },
          replyTo: this.form.email,
          from: this.form.email,
        })
      }
    },
  },
};
</script>

<style scoped>

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

#payment-button {
  display: grid;
  width: max-content;
  border-radius: 0;
}

.payment-button-div {
  margin-left: 80%;
}

.add-button {
  border: 1px solid black;
  background-color: #000000;
  color: #ffffff;
}

.add-button:hover {
  background-color: white;
  color: black;
}

.checkout-page {
  font-family: "Malgun Gothic Semilight", sans-serif;
  padding-bottom: 250px;
}

.title {
  margin-top: 6%;
  margin-bottom: 6%;
  letter-spacing: 2px;
  font-weight: 100;
}

.shipping-standard {
  margin-left: 70px;
}

.shipping-express {
  margin-left: 55px;
}

.payment-method,
.shipping-method {
  position: relative;
  float: right;
}

.shipping, .payment, .order-summary {
  width: 100%;
  display: grid;
  background-color: #ffffff;
  text-align: start;
}

.shipping, .payment {
  border-bottom: solid 1px #333;
}

.summary-title {
  letter-spacing: 2px;
}

.coupon-code-input {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  margin-left: 70px;
}

.coupon-code-span {
  cursor: pointer;
}

.coupon-code-alert {
  position: absolute;
  font-size: 14px;
  color: red;
  margin-top: -13px;
  transform: translateX(118%);
}

.address-alert,
.payment-method-alert,
.shipping-method-alert {
  position: absolute;
  color: red;
}

.shipping-method-alert {
  transform: translateY(190%);
}

.payment-method-alert {
  transform: translateY(230%);
}

.address-alert {
  left: 165px;
}

.first-credit-card {
  margin-left: 50px;
  margin-right: 8px;
}

.coupon-code-button {
  border: none;
  border-bottom: 1px solid black;
  background-color: white;
  margin-left: 30px;
}

.coupon-code-button:hover {
  color: #6c6c6c;
}

.back-link {
  text-decoration: none;
  color: black;
  width: max-content;
  transform: translateY(70%);
}

.back-link:hover {
  color: #656565;
}

</style>
