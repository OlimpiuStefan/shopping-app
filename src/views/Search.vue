<template>
  <div class="bg-black">
    <h1 class="text-light title">Search</h1>
    <input
        v-model="searchWord"
        placeholder="Search"
        type="text"
        class="p-1 rounded rounded-2 input-search"
    />
    <ItemList :products="filteredProducts" :image="image" class="card-item"/>
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  components: {ItemList},
  data() {
    return {
      searchWord: "",
      image: "black.jpg",
    };
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
};
</script>

<style scoped>
.input-search {
  width: 100%;
  max-width: 280px;
  border: none;
  outline: none;
  background-color: rgba(137, 137, 133, 0.4);
  border-radius: 16px;
  border-bottom: 2px solid #c2c2c2;
  font-size: 20px;
  transition: 0.2s ease-out;
  position: absolute;
  display: grid;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.input-search:focus {
  background-color: rgba(169, 164, 164, 0.5);
}

.title {
  position: absolute;
  display: grid;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  letter-spacing: 0.1em;
  font-size: 50px;
  text-transform: uppercase;
}

.card-item {
  margin-top: -5%;
}

</style>
