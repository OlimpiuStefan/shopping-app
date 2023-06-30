<template>
  <div class="item-details-page">
    <div v-if="product" class="product bg-black">
      <div class="d-inline-block mt-5 pt-5 w-100">
        <div class="mx-3">
          <img @click="openModal" :src="product.img" alt="Image" class="img-fluid"/>
          <div v-if="isModalOpen" class="modal" @click="closeModal">
            <div class="modal-content m-auto">
              <span @click="closeModal" class="close">X</span>
              <img :src="product.img" alt="Image" id="modal-img"/>
            </div>
          </div>
        </div>
        <div class="text-light product-details">
          <p class="fw-bold" id="brand">{{ product.brand }}</p>
          <h1>{{ product.title }}</h1>
          <p class="fs-5 ">${{ product.price }}</p>
          <p class="mt-3" id="prod-description">
            {{ product.description }}
          </p>
          <div class="m-auto my-4">
            <div v-if="!product.isFavorite">
              <button @click="addToFavorite(product)"
                      class="p-2 bg-black text-white border border-3 add-fav-button">Add favorite
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
                     viewBox="0 0 16 16">
                  <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
              </button>
            </div>
            <div v-else>
              <button @click="removeFromFavorite(product)"
                      class="remove-fav-button bg bg-white text-black border border-white">
                Remove favorite 🤍
              </button>
            </div>
          </div>
          <div class="border border-white mt-5"></div>
          <form class="product-details-bottom pt-5">
            <select class="select me-5 m-auto" v-model="size" :class="{ error: error }">
              <option value="Size" disabled>Size</option>
              <option value="xs">xs</option>
              <option value="s">s</option>
              <option value="m">m</option>
              <option value="l">l</option>
              <option value="xl">xl</option>
              <option value="xxl">xxl</option>
            </select>
            <div class="add-cart ms-5 m-auto" @click="addToCart(product, size)">
              Add to cart
            </div>
          </form>
          <div v-show="showSuccessAlert" class="overlay">
            <transition name="fade">
              <div class="alert alert-success px-5 py-4" id="alert-cart" role="alert">
                The product has been added to cart
              </div>
            </transition>
          </div>
          <div v-show="showLoginMessageForFav" class="overlay">
            <transition name="fade">
              <div class="alert-log alert alert-warning py-4"
                   role="alert">
                Please log in to add to favorites
              </div>
            </transition>
          </div>
          <div v-show="showLoginMessageForCart" class="overlay">
            <transition name="fade">
              <div class="alert-log alert alert-warning py-4"
                   role="alert">
                Please log in to add to cart
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ItemDetails",
  props: ["id", "product"],
  data() {
    return {
      favorites: this.$store.state.user?.favorites,
      image: require("@/assets/black.jpg"),
      size: "Size",
      error: false,
      isModalOpen: false,
      isFavorite: false,
      showSuccessAlert: false,
      showLoginMessageForFav: false,
      showLoginMessageForCart: false,
      quantity: 1,
      isUserLoggedIn: this.$store.getters.isUserLoggedIn,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    async addToCart(product, size) {
      let item = {
        product: {
          brand: product.brand,
          title: product.title,
          price: product.price,
          description: product.description,
          id: product.id,
          img: product.img
        },
        size: size,
        quantity: 1,
        quantityPrice: product.price,
      };
      let clear = () => (this.showSuccessAlert = false)
      if (size !== "Size" && this.isUserLoggedIn) {
          await this.$store.dispatch("addToCart", item);
        this.showSuccessAlert = true;
        setTimeout(clear, 3000);
      } else {
        this.error = true;
        this.showLoginMessageForCart = true;
        let clear = () => (this.showLoginMessageForCart = false)
        if (this.showLoginMessageForCart) {
          setTimeout(clear, 3000);
        }
      }
    },
    async addToFavorite(product) {
      if (this.isUserLoggedIn && !product.isFavorite) {
        this.$store.dispatch("toggleFavorite", product.id);
        await this.$store.dispatch("addToFavorites", product);
        product.isFavorite = true;
      } else {
        this.showLoginMessageForFav = true;
        let clear = () => (this.showLoginMessageForFav = false)
        if (this.showLoginMessageForFav) {
          setTimeout(clear, 3000);
        }
      }
    },
    async removeFromFavorite(product) {
      this.$store.dispatch("toggleFavorite", product.id);
      await this.$store.dispatch("removeFromFavorites", product.id);
      product.isFavorite = false;
    },
  },
};
</script>
<style scoped>
#modal-img {
  width: 180%;
  margin-right: 200px;
}

#brand {
  display: flow;
  letter-spacing: 0.2em;
  font-size: 18px;
}


#prod-description {
  font-size: 20px;
}

#alert-cart {
  display: flow;
  position: relative;
  top: 11%;
  left: 75%;
  height: max-content;
  width: max-content;
}

.img-fluid {
  width: 30%;
  height: 70%;
  cursor: pointer;
  position: absolute;
  margin-left: -40%;
  margin-top: -13%;
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

.alert-log {
  position: absolute;
  top: 9%;
  left: 52%;
  width: 36%;
  height: max-content;
  z-index: 2;
}

.product-details {
  width: 40%;
  height: 70%;
  margin-left: 50%;
  margin-top: -11%;
  font-family: "JetBrains Mono Light", sans-serif;
  text-align: center;
  justify-content: center;
  position: absolute;
}

.product {
  display: flex;
  position: absolute;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 300px;
}

.item-details-page {
  z-index: 1;
}

.add-fav-button,
.remove-fav-button {
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 17px;
  width: 220px;
  height: 46px;
}


.bi-heart {
  margin-left: 10px;
  margin-right: -10px;
}

.product-details-bottom {
  display: flex;
  flex-direction: row;
}

.select,
.add-cart {
  display: block;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 19px;
  width: 220px;
  height: 46px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  text-transform: uppercase;
  border: 3px solid white;
  padding-bottom: -30%;
}

.add-cart {
  padding-top: 7px;
}

.select:hover,
.add-cart:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-radius: 0.5em;
  border: 0.2em solid rgb(0, 0, 0);
}

.error {
  background-color: rgb(103, 0, 0);
}

.modal {
  display: block;
  position: fixed;
  padding-right: 15%;
  padding-top: 3%;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
  padding-top: 5%;
  display: block;
  max-width: 350px;
  background-color: transparent;
}

.close {
  position: absolute;
  left: 170%;
  z-index: 1;
  font-size: 30px;
  color: #000000;
  cursor: pointer;
}
</style>
