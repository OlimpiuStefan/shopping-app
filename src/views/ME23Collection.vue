<template>
  <div>
    <h1 class="title fw-bold">ME23 Collection</h1>
    <ItemList :products="menCollection" :image="image" class="card-item"/>
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";

export default {
  name: "MenCollection",
  // eslint-disable-next-line vue/no-unused-components
  components: {ItemList},
  data() {
    return {
      image: "me23.avif",
    };
  },
  computed: {
    menCollection() {
      return this.$store.state.men.filter(
          (p) => p.brand === "Alexander Mqueen" || p.brand === 'Gucci'
      );
    },
  },
};
</script>

<style scoped>
.title {
  top: 32%;
  left: 15%;
  font-size: 50px;
  letter-spacing: 0.1em;
  z-index: 1;
  position: absolute;
  text-transform: uppercase;
  font-family: "Franklin Gothic Medium", sans-serif;
  color: #250d01;
}
</style>
