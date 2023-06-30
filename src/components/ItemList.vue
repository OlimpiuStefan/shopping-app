<template>
  <div class="shop-page bg-black">
    <img class="hero-image" :src="require(`@/assets/${image}`)"/>
    <div class="shop-section">
      <div v-show="showLoginMessageForFav" class="overlay">
        <transition name="fade">
          <div class="alert alert-warning py-4 alert-log"
               role="alert">
            Please log in to add to favorites
          </div>
        </transition>
      </div>
      <div v-for="(product, index) in products" :key="index"
           class="item">
        <div class="favorite-icon">
<!--          <div v-if="($store.getters.isUserLoggedIn  && !product.isFavorite ) || !$store.getters.isUserLoggedIn "-->
<!--          <div v-if="!product.isFavorite"-->
          <div v-if="!$store.getters.getFavorites(product)"
               @click="addToFavorite(product)">
<!--               @click="$store.state.user.favorites.push(product.id)">-->
            <svg

                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
            >
              <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
          </div>
<!--          <div v-else-if="product.isFavorite " @click="removeFromFavorite(product)">-->
          <div v-else @click="removeFromFavorite(product)">
            <svg

                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
            >
              <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </div>
        </div>
        <router-link :to="{
            name: 'ItemDetails',
            params: {
              product: product,
              id: product.id,
            },
          }"
                     class="card">
          <img class="card-image" :src="product.img"/>
          <div class="card-bottom text-light">
            <p class="item-title m-2">
              {{ product.title }} - {{ product.brand }}
            </p>
            <p class="item-price text-light mb-2">${{ product.price }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "ItemList",
  props: ["products", 'image'],
  data() {
    return {
      isFavorite: false,
      showLoginMessageForFav: false,
      productIndex: -1,
    };
  },
  created() {
    this.$store.dispatch('setProductsIsFavorite');
  },
  methods: {
    async addToFavorite(product) {
      if (this.$store.getters.isUserLoggedIn && !product.isFavorite) {
        this.$store.dispatch("toggleFavorite", product.id);
        await this.$store.dispatch("addToFavorites", product);
        product.isFavorite = true;
      } else {
        this.$store.dispatch("setProducts");
        this.showLoginMessageForFav = true;
        let clear = () => (this.showLoginMessageForFav = false)
        if (this.showLoginMessageForFav) {
          setTimeout(clear, 3000);
        }
      }
    },
    async removeFromFavorite(product) {
      this.$store.dispatch("toggleFavorite", product.id);
      // this.$store.commit("SET_PRODUCTS_IS_FAVORITE", product.id);
      await this.$store.dispatch("removeFromFavorites", product.id);
      product.isFavorite = false;
    },
  },
};
</script>

<style scoped>
.shop-page {
  position: relative;
}

.hero-image {
  position: relative;
  width: 100%;
  height: 73em;
  object-fit: cover;
  display: block;
  z-index: 0;
  border-radius: 0 0 50% 50%;
  object-position: center;
  animation: fade-in 0.5s forwards;
  filter: brightness(60%) grayscale(20%);
}


.hero-image::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.alert-log {
  position: absolute;
  top: 40%;
  left: 35%;
  width: 35%;
  height: max-content;
  z-index: 2;
}

.favorite-icon {
  position: absolute;
  right: 12px;
  top: -7px;
  background-color: transparent;
  z-index: 1;
  font-size: 30px;
  color: #000000;
  cursor: pointer;
}


.shop-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20em);
  grid-gap: 0.4em;
  justify-content: center;
  height: fit-content;
  width: 100%;
  margin-top: -550px;
  padding-bottom: 300px;
}

.item {
  position: relative;
  transition: transform 0.6s;
  cursor: pointer;
  border: 0px solid rgba(56, 56, 56, 0);
  overflow: hidden;
  width: 20em;
}

.item:hover {
  transform: translateY(-0.5em);
}

.item:hover > .card > .card-bottom {
  opacity: 1;
}

.card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20em;
  height: 26em;
  cursor: pointer;
  border: none;
  border-bottom: inherit;
  overflow: hidden;
  transition: transform 0.6s;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0);
  text-decoration: none;
}

.item:hover {
  transform: translateY(-0.5em);
}

.item:hover > .card > .card-bottom {
  opacity: 1;
}

.card-image {
  position: absolute;
  width: inherit;
  height: inherit;
  object-fit: cover;
  display: block;
  object-position: top;
  transition: transform 0.6s;
  filter: brightness(80%);
}

.item:hover > .card > .card-image {
  transform: scale(1.1);
}

.card-bottom:hover > .card-image {
  transform: scale(1.1);
}

.card-bottom {
  display: flex;
  flex-direction: column;
  position: relative;
  background: black;
  width: 100%;
  height: 110px;
  z-index: 1;
  opacity: 0;
  transition: opacity 1s;
  justify-content: center;
  text-align: center;
}

.item-title {
  font-size: 18px;
  font-weight: 700;
}
</style>
