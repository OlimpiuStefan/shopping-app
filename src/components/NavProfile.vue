<template>
  <div class="outer-card">
    <div class="text-decoration-none text-dark " @click="closeProfile">
      <router-link to="/settings" class="mt-4 px-2 body-pgf" :class="{ 'fw-bold': $route.path === '/settings' }">
        Settings
      </router-link>
      <router-link to="/orders" class="px-2 body-pgf" :class="{ 'fw-bold': $route.path === '/orders' }">Orders
      </router-link>
      <router-link to="/returns" class="px-2 body-pgf" :class="{ 'fw-bold': $route.path === '/returns' }">Returns
      </router-link>
      <router-link to="/addresses" class="px-2 body-pgf" :class="{ 'fw-bold': $route.path === '/addresses' }">
        Addresses
      </router-link>
      <p @click="logout" class="body-pgf w-100 mb-4">Logout</p>
    </div>
  </div>
</template>

<script>
import {firebase} from "@/firebaseInit";

export default {
  name: "NavProfile",
  methods: {
    logout() {
      firebase.auth().signOut()
          .then(() => {
            this.$store.commit("RESET_USER")
            console.log('User logged out')
            this.$router.push('/login')
            this.closeProfile()
          })
          .catch((error) => {
            console.error('Error logging out: ', error);
          })
    },
    closeProfile() {
      this.$emit('closeProfile')
    }
  }
}
</script>

<style scoped>
.outer-card {
  text-align: left;
  font-family: "Malgun Gothic Semilight", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  width: 100%;
  z-index: 1;
  position: absolute;
}

.body-pgf {
  cursor: pointer;
  margin-top: -10px;
  padding: 6px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
  display: block;
}

.body-pgf:hover {
  background-color: #e5e5e5;
}
</style>