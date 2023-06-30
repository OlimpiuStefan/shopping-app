<template>
  <div class="home-page">
    <video autoplay loop muted class="video-home">
      <source
          src="https://player.vimeo.com/external/396570197.hd.mp4?s=b31763e4f3b76f8c4fa6bd1d2be237ec6dc30442&profile_id=174&oauth2_token_id=57447761"
          type="video/mp4"/>
    </video>
    <div class="content">
      <h2 class="coupon text-secondary">Get a 10% discount with code <span class="text-light">EXTRA10</span> </h2>
      <div>
        <router-link to="/wo23/collection">
          <button class="nav-button">WO23 Collection</button>
        </router-link>
        <router-link to="/me23/collection">
          <button class="nav-button">ME23 Collection</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
};
</script>
<style>
.video-home {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-page {
  position: relative;
  width: 100vw;
  height: 65em;
  object-fit: cover;
  display: block;
  object-position: center;
  animation: fade-in 0.5s forwards;
  filter: brightness(50%) grayscale(30%);
}

.coupon {
  transform: translateY(-730%);
}

.home-page::after {
  position: absolute;
  bottom: -100px;
  left: 0;
  right: 0;
  height: 200px;
}

.alert {
  bottom: 300px;
}

.content {
  position: absolute;
  display: grid;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.nav-button {
  background: #575757;
  color: white;
  margin: 10px;
  border: none;
  border-radius: 20px;
  width: 300px;
  padding: 12px;
}

.nav-button:hover {
  background: #525252;
  opacity: 0.8;
}
</style>
