<template>
  <div>
    <h1 class="title text-black fw-bold">Men</h1>
    <ItemList :products="this.$store.state.men" :image="image" class="card-item"/>
<!--    <vue-blob-json-csv-->
<!--        @success="handleSuccess"-->
<!--        @error="handleError"-->
<!--        file-type="csv"-->
<!--        file-name="Products"-->
<!--    >-->
<!--      Download-->npm
<!--    </vue-blob-json-csv>-->
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Men",
  components: { ItemList},
  data() {
    return {
      image: "men2.avif",
    };
  },
  methods: {
    handleSuccess() {
      console.log('success')
    },
    handleError() {
      console.log('error')
    },
  }
};
</script>

<style scoped>
.title {
  letter-spacing: 0.2em;
  z-index: 1;
  left: 32%;
  top: 30%;
  font-size: 50px;
  text-transform: uppercase;
  position: absolute;
  display: grid;
  font-family: "Franklin Gothic Medium", sans-serif;
}
</style>
