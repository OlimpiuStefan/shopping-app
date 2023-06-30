<template>
  <div class="admin-page">
    <router-link to="/admin/product/create" class="add-button text-decoration-none d-block mb-4 px-3 py-2 btn btn-primary me-4">
     + Add new Product
    </router-link>
    <input
        v-model="searchWord"
        placeholder="Search by name, type, color"
        type="text"
        class="p-1 rounded rounded-2 my-5 input-search"
    />
    <div class="shop-section">
      <div v-for="(product, index) in filteredProducts" :key="index"
           class="card">
        <img class="card-image" :src="product.img"/>
        <div class="card-bottom text-light">
          <div class="edit-delete-div">
            <router-link :to="{
            name: 'ProductDetails',
            params: {
              product: product,
              id: product.id,
            },
          }" class="d-inline mx-3">
              <button class="edit-delete-buttons btn btn-secondary"> Edit</button>
            </router-link>
            <button class="edit-delete-buttons btn btn-danger d-inline" @click="removeProduct(product)">Remove</button>
          </div>
          <p class="item-title m-2">
            {{ product.title }} - {{ product.brand }}
          </p>
          <p class="item-price text-light mb-2">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Products",
  data() {
    return {
      searchWord: "",
    }
  },
  computed: {
    filteredProducts() {
      return this.$store.getters.getAllProducts.filter((product) => {
        return (
            product.title.toLowerCase().includes(this.searchWord.toLowerCase()) ||
            product.brand.toLowerCase().includes(this.searchWord.toLowerCase()) ||
            product.color.toLowerCase().includes(this.searchWord.toLowerCase()) ||
            product.gender.toLowerCase().includes(this.searchWord.toLowerCase()) ||
            product.type.toLowerCase().includes(this.searchWord.toLowerCase())
        );
      });
    },
  },
  methods: {
    removeProduct(product) {
      this.$store.dispatch('removeProduct', product)
    },
  },
}
</script>

<style scoped>
.admin-page {
  margin-top: 7%;
  margin-bottom: 20%;
}

.add-button {
  float: right;
  margin-top: -40px;
}
.shop-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20em);
  grid-gap: 0.4em;
  justify-content: center;
  height: fit-content;
  width: 100%;
  padding-top: 180px;
  padding-bottom: 300px;
}


.card {
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  width: 20em;
  height: 26em;
  border: none;
  border-bottom: inherit;
  overflow: hidden;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0);
  text-decoration: none;
}

.edit-delete-div {
  margin-top: -100px;
  margin-bottom: 65px;
}

.input-search {
  width: 100%;
  max-width: 380px;
  border: none;
  outline: none;
  background-color: rgba(137, 137, 133, 0.4);
  border-radius: 16px;
  border-bottom: 2px solid #c2c2c2;
  font-size: 20px;
  transition: 0.2s ease-out;
  position: absolute;
  display: grid;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
}

.input-search:focus {
  background-color: rgba(169, 164, 164, 0.5);
}

.card-image {
  position: absolute;
  z-index: 0;
  width: inherit;
  height: inherit;
  object-fit: cover;
  display: block;
  object-position: top;
  filter: brightness(80%);
}

.card-bottom {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: black;
  width: 100%;
  height: 110px;
  justify-content: center;
  text-align: center;
}

.edit-delete-buttons {
  width: 100px;
}

.item-title {
  font-size: 18px;
  font-weight: 700;
}
</style>