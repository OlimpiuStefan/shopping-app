<template>
  <div>
    <h1 class="title text-black fw-bold">Women</h1>
    <ItemList :products="this.$store.state.women" :image="image" class="card-item"/>
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Women",
  components: { ItemList},
  data() {
    return {
      image: "women.avif",
    };
  },
};
</script>

<style scoped>
.title {
  letter-spacing: 0.2em;
  z-index: 1;
  left: 73%;
  top: 30%;
  font-size: 50px;
  text-transform: uppercase;
  position: absolute;
  display: grid;
  font-family: "Franklin Gothic Medium", sans-serif;
}
</style>
