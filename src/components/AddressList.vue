<template>
  <div>
    <div v-for="(address, index) in addresses" :key="index">
      <div v-if="index !== addressIndex">
        <div id="address-saved-form"
             :class="{ 'selected-address': index === selectedAddressIndex }"
             @click="selectAddress(index, address)"
             class="px-5 pt-3 m-auto mt-4 border border-2 w-50 m-auto rounded rounded-4">
          <h5 class=" px-4 my-address"> {{
              title === 'Billing address' ?
                  'Billing address' : "Delivery address"
            }} </h5>
          <div v-show="userIsLoggedIn">
            <div class="edit-delete ps-2 d-inline-block " @click="removeAddress(address, index)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-trash3" viewBox="0 0 16 16">
                <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
            </div>
          </div>
          <div class="edit-delete d-inline-block"
               @click="editAddress(index)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
                 viewBox="0 0 16 16">
              <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </div>
          <p class=" px-4 address">{{ address.city }}, {{ address.country }},{{ address.street }},{{ address.number }}
            {{ address.blockStaircase }}</p>
          <p class=" px-4 address" id="postcode">{{ address.postcode }}</p>
        </div>
      </div>
      <div v-if="addressIndex === index">
        <AddressForm :addressInitial="address"
                     :titleInitial="title"
                     :isAddressSavedInitial="true"
                     :index="addressIndex"
                     @closeAddressForm="closeAddressForm"/>
      </div>
    </div>
  </div>
</template>

<script>


import AddressForm from "@/components/AddressForm";

export default {
  name: "AddressList",
  props: ['addresses', 'title'],
  components: {AddressForm},
  data() {
    return {
      selectedAddressIndex: null,
      billingAddresses: this.$store.state.user?.billingAddresses,
      deliveryAddresses: this.$store.state.user?.deliveryAddresses,
      addressesInitial: this.addresses,
      isAddressSaved: false,
      addressIndex: -1,
      userIsLoggedIn: this.$store.getters.isUserLoggedIn,
    };
  },
  methods: {
    editAddress(index) {
      this.addressIndex = this.addressIndex !== index ? index : -1
    },
    closeAddressForm() {
      this.isAddressSaved = true;
      this.addressIndex = -1;
    },
    async selectAddress(index, address) {
      this.selectedAddressIndex = index;
      if (this.title === 'Delivery address') {
      this.$emit('selectDeliveryAddress', address)
        } else {
        this.$emit('selectBillingAddress', address)
        }
    },
    async removeAddress(address, index) {
      if (this.addressesInitial === this.deliveryAddresses) {
        await this.$store.dispatch('removeDeliveryAddress', address.id, index)
      } else if (this.addressesInitial === this.billingAddresses) {
        await this.$store.dispatch('removeBillingAddress', address.id, index)
      }
    },

  }
  ,
}
</script>


<style scoped>

#address-saved-form {
  height: 115px;
}

#address-saved-form:hover {
  background-color: #dcdcdc;
  cursor: pointer;
}

#postcode {
  margin-top: 50px;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.my-address {
  letter-spacing: 2px;
  float: left;
}

.edit-delete {
  float: right;
  display: grid;
  cursor: pointer;
}


.edit-delete:hover {
  color: #5b5b5b;
}

.address,
#postcode {
  display: grid;
  position: absolute;
  float: left;
  font-size: 16px;
}

.selected-address {
  background-color: #bdbdbd;
}

.address {
  margin-top: 30px;
}


</style>