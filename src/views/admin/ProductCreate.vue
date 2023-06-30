<template>
  <div class="product-form-page">
    <h2>Add new Product</h2>
    <div>
      <input v-model="product.title" placeholder="Title" class="input-product d-block mt-5 mb-3 m-auto">
      <p v-show="showAlertTitleIncomplete" class="alert-input">This field is required</p>
      <input v-model="product.price" placeholder="Price" type="number" class="input-product d-block mb-3 m-auto">
      <p v-show="showAlertPriceIncomplete" class="alert-input">This field is required</p>
      <input v-model="product.description" placeholder="Description" class="input-product d-block mb-3 m-auto">
      <p v-show="showAlertDescriptionIncomplete" class="alert-input">This field is required</p>
      <input v-model="product.color" placeholder="Color" class="input-product d-block mb-3 m-auto">
      <p v-show="showAlertColorIncomplete" class="alert-input">This field is required</p>
      <input v-model="product.brand" placeholder="Brand" class="input-product d-block mb-3 m-auto">
      <p v-show="showAlertBrandIncomplete" class="alert-input">This field is required</p>
      <input v-model="product.type" placeholder="Type" class="input-product d-block mb-3 m-auto">
      <p v-show="showAlertTypeIncomplete" class="alert-input">This field is required</p>
      <select v-model="product.gender" placeholder="Gender" class="input-product d-block mb-4 m-auto">Gender
        <option> women</option>
        <option> men</option>
      </select>
      <p v-show="showAlertGenderIncomplete" class="alert-input">This field is required</p>
      <UploadImages
          @changed="handleImages"
          :max="5"
          maxError="Max files exceed"
          uploadMsg="upload product images"
          fileError="images files only accepted"
      />
      <button @click="addProductToArray" class="btn btn-primary mt-5">Add</button>
    </div>
    <div v-show="showSuccessAlert" class="overlay">
      <transition name="fade">
        <div class="alert alert-success m-auto py-4" id="alert-cart" role="alert">
          The product has been added to {{ product.gender }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {v4 as uuid} from "uuid";
import UploadImages from "vue-upload-drop-images";
import {firebase} from "../../firebaseInit.js"

export default {
  name: "ProductCreate",
  components: {UploadImages},
  data() {
    return {
      product: {
        title: '',
        img: '',
        price: '',
        description: '',
        color: '',
        brand: '',
        type: '',
        gender: 'women',
        id: uuid(),
      },
      productImageFile: {},
      quantity: '',
      showAlertTitleIncomplete: false,
      showAlertPriceIncomplete: false,
      showAlertDescriptionIncomplete: false,
      showAlertColorIncomplete: false,
      showAlertBrandIncomplete: false,
      showAlertTypeIncomplete: false,
      showAlertGenderIncomplete: false,
      showSuccessAlert: false,
    }
  },
  methods: {
    async addProductToArray() {
      this.showAlertTitleIncomplete = this.product.title === '';
      this.showAlertPriceIncomplete = this.product.price === '';
      this.showAlertDescriptionIncomplete = this.product.description === '';
      this.showAlertColorIncomplete = this.product.color === '';
      this.showAlertBrandIncomplete = this.product.brand === '';
      this.showAlertTypeIncomplete = this.product.type === '';
      this.showAlertGenderIncomplete = this.product.gender === '';
      let clear = () => (this.showSuccessAlert = false)
      if (!this.showAlertTitleIncomplete && !this.showAlertPriceIncomplete &&
          !this.showAlertDescriptionIncomplete && !this.showAlertColorIncomplete
          && !this.showAlertBrandIncomplete && !this.showAlertTypeIncomplete
          && !this.showAlertGenderIncomplete) {
        const storage = firebase.storage();
        // Create a root reference
        let storageRef = storage.ref();
        //salvam imaginea cu nume unic
        //folosium uuid ca sa generam un uuic unic si il apenduim la numele imagini
        //`images/${files[0].name+uuid()}`
        const imgPath = "images/" + this.productImageFile.name;
        const imgRef = storageRef.child(imgPath)
        await imgRef.put(this.productImageFile);
        // Get the download URL
        const imgUrl = await imgRef.getDownloadURL();
        this.product.img = imgUrl
        await this.$store.dispatch('addProductAsAdmin', this.product)
        this.showSuccessAlert = true;
        setTimeout(clear, 3000);
      }
    },
    handleImages(files) {
      console.log("files");
      console.log(files);
      console.log(files[0].name);
      this.productImageFile = files[0]
    },
  },
}
</script>

<style scoped>
.product-form-page {
  margin-top: 7%;
  margin-bottom: 20%;
}

.input-product {
  padding: 5px;
  display: grid;
  width: 330px;
  outline: none;
}

.alert-input {
  color: red;
  display: flow;
  margin-top: -15px;
  margin-right: 185px;
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
  transform: translateY(250px);
  width: 500px;
}
</style>