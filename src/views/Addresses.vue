<template>
  <div class="addresses-page">
    <h2 class="title">My account</h2>
    <div class="border-top pt-5 w-100"></div>
    <NavProfile class="outer-card"/>
    <div class="d-inline-bloc bg-secondary bg-opacity-10" id="address-card">
      <h4 class=" m-5 border border-1 bg-white p-3 address-title">My addresses</h4>
      <AddressList :addresses="deliveryAddresses" title="Delivery address"/>
      <AddressList :addresses="billingAddresses" title="Billing address"/>

      <div class="mt-5 pt-5">
        <button class="btn btn-dark d-inline-block w-25 p-4 mx-5 mb-3 mt-5 address-title"
                @click="openAddressForm">Add delivery address
        </button>
        <button class="btn btn-dark d-inline-block w-25 p-4 mx-5 mb-3 mt-5 address-title"
                @click="openBillingAddressForm">Add billing address
        </button>
        <div v-if="showAddingDeliveryAddressForm">
          <AddressForm :addressInitial="deliveryAddress"
                       titleInitial="Delivery address"
                       :isAddressSavedInitial="false"
                       :index="currentDeliveryAddressesIndex"
                       @closeDeliveryAddressForm="closeAddingDeliveryAddressForm"/>
        </div>
        <div v-else-if="isAddressSaved && !showAddingDeliveryAddressForm">
          <transition name="fade">
            <div class="p-4 alert alert-success bg-opacity-10">
              The address have been saved
            </div>
          </transition>
        </div>
        <div v-show="showAddingBillingAddressForm">
          <AddressForm :addressInitial="billingAddress"
                       titleInitial="Billing address"
                       :isAddressSavedInitial="false"
                       :index="currentBillingAddressesIndex"
                       @closeDeliveryAddressForm="closeAddingDeliveryAddressForm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressForm from "@/components/AddressForm";
import AddressList from "@/components/AddressList";
import NavProfile from "@/components/NavProfile";
import {v4 as uuid} from "uuid";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Addresses",
  components: {NavProfile, AddressList, AddressForm},
  data() {
    return {
      deliveryAddress: {
        country: '',
        city: '',
        street: '',
        number: '',
        blockStaircase: '',
        postcode: '',
        id: uuid(),
      },
      billingAddress: {
        country: '',
        city: '',
        street: '',
        number: '',
        blockStaircase: '',
        postcode: '',
        id: uuid(),
      },
      isAddressSaved: false,
      showAddingDeliveryAddressForm: false,
      showAddingBillingAddressForm: false,
      deliveryAddresses: this.$store.state.user?.deliveryAddresses,
      billingAddresses: this.$store.state.user?.billingAddresses,
      currentDeliveryAddressesIndex: this.$store.getters.getCurrentDeliveryAddressesIndex,
      currentBillingAddressesIndex: this.$store.getters.getCurrentBillingAddressesIndex,
    }
  },
  methods: {
    closeAddingDeliveryAddressForm() {
      this.showAddingDeliveryAddressForm = false;
      this.isAddressSaved = true;
      let clear = () => (this.isAddressSaved = false)
      if (this.isAddressSaved) {
        setTimeout(clear, 3000);
      }
    }, closeAddingBillingAddressForm() {
      this.showAddingBillingAddressForm = false;
      this.isAddressSaved = true;
      let clear = () => (this.isAddressSaved = false)
      if (this.isAddressSaved) {
        setTimeout(clear, 3000);
      }
    },
    openAddressForm() {
      this.showAddingDeliveryAddressForm = !this.showAddingDeliveryAddressForm;
      this.showAddingBillingAddressForm = false;
    },
    openBillingAddressForm() {
      this.showAddingBillingAddressForm = !this.showAddingBillingAddressForm;
      this.showAddingDeliveryAddressForm = false;
    },

  },
}
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


#address-card {
  display: grid;
  width: 65%;
  padding-bottom: 5%;
  margin-right: 60px;
  margin-bottom: 100px;
  border: 1px solid grey;
  float: right;
}

.title {
  margin-top: 130px;
  margin-bottom: 50px;
  letter-spacing: 2px;
}

.addresses-page {
  font-family: "Malgun Gothic Semilight", sans-serif;
  padding-bottom: 150px;
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

.address-title {
  text-align: center;
  letter-spacing: 2px;
}

.alert {
  width: 400px;
  display: flow;
  transform: translateY(500%);
  margin: auto;
}

</style>