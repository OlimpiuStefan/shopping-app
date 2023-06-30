<template>
  <div class="bg-black">
    <h1 class="title text-light">Favorite products</h1>
    <ItemList :products="this.$store.state.user?.favorites" :image="image" class="card-item"/>
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Favorites",
  components: {ItemList},
  data() {
    return {
      image: "black.jpg",
    };
  },
};
</script>

<style scoped>
.title {
  letter-spacing: 7px;
  font-size: 50px;
  z-index: 1;
  left: 50%;
  top: 20%;
  text-transform: uppercase;
  position: absolute;
  display: grid;
  transform: translate(-50%, -50%);
  font-family: "JetBrains Mono Light", sans-serif;
}


.card-item {
  margin-bottom: 50px;
  margin-top: -10%;
}
</style>
