<template>
  <div>
    <div class="content-about">
      <h1 class="p-5 fw-bolder">About us</h1>
      <div class="about-text">
        <p class="mt-5 fs-5">
          Since our founding in 2006, we at dress-for-less strive to offer our
          customers new styles at the best prices day after day.
        </p>
        <p class="fs-5">
          Fashion is always in focus with our selection of international labels
          and top brands, including<span class="fw-bold">
            Gucci, Valentino, Dolce & Gabbana, Versace, Alexander Mqueen and
            Dutti.
          </span>
          Every day our customers can save up to 70% on quality basics, fashion
          classics and trending styles. In addition to women’s and men’s
          clothing we also carry a large selection of shoes and accessories.
        </p>
        <p class="fs-5">
          The best part? Every day there are new pieces to shop in our outlet!
        </p>
        <p class="fs-5">
          Our technology partner EXASOL AG passionately and wholeheartedly
          assists us with improving your shopping experience. We adapt our
          choice of products to your individual needs by analysing data and
          information at an incomparable speed - 24/7.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "About",
};
</script>

<style scoped>

li {
  text-align: start;
}

.content-about {
  margin-top: 7%;
  display: grid;
}

.about-text {
  display: grid;
  margin-bottom: 330px;
  margin-left: 100px;
  margin-right: 100px;
}

</style>
