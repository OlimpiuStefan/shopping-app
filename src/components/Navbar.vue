<template>
  <div class="navbar-grid">
    <nav class="navbar navbar-expand-lg p-3" id="navbar">
      <div class="container-fluid">
        <h1 class="navbar-brand text-light">M.E.D.U.Z.Z.A</h1>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav fw-bold ">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/women">Women</router-link>
            <router-link class="nav-link" to="/men">Men</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </div>
          <div class="right">
            <div v-if="!this.$store.getters.isUserLoggedIn" @click="showLoginBox" class="navbar-login ms-4"> Login</div>
            <div v-else @click="openProfile" id="profile-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16"
                   height="16" fill="currentColor" class="bi bi-person-lines-fill text-white"
                   viewBox="0 0 16 16">
                <path
                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
              </svg>
            </div>
            <router-link to="/favorites">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart text-light fw-bold mx-3"
                  viewBox="0 0 16 16">
                <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
            </router-link>
            <router-link to="/search" class="search-box rounded-5 me-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  class="bi bi-search text-dark"
              >
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </router-link>
            <div class="cart rounded-5" @click="showCart">
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="16"
                   height="16"
                   class="bi bi-bag text-dark">
                <path
                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
              </svg>
              <span id="notification-counter" class="fw-bold">{{ this.$store.getters.getCartItemCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div v-show="showLogin">
      <AuthDialog @toggleLoginButton="showLogin = !showLogin"/>
    </div>
    <div v-show="showCartDetails">
      <NavCart @toggleCart="showCartDetails = false"/>
    </div>
    <div v-show="showProfile">
      <NavProfile id="profile-div" @closeProfile="closeProfile"/>
    </div>
  </div>
</template>

<script>
import NavCart from "@/components/NavCart";
import AuthDialog from "@/components/AuthDialog";
import NavProfile from "@/components/NavProfile";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  components: {NavProfile, NavCart, AuthDialog},
  data() {
    return {
      scrollPosition: null,
      showCartDetails: false,
      showLogin: false,
      showProfile: false,
      showWrote: false,
      productName: "",
      profile: '',
      user: this.$store.getters.isUserLoggedIn,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    showCart() {
      this.showCartDetails = !this.showCartDetails;
      this.showLogin = false;
      this.showProfile = false;
    },
    showLoginBox() {
      if (this.user) {
        this.showLogin = false
        this.showProfile = !this.showProfile;
        this.showCartDetails = false;
      } else {
        this.showLogin = !this.showLogin;
        this.showProfile = false;
        this.showCartDetails = false;
      }
    },
    openProfile() {
      this.showProfile = !this.showProfile;
      this.showCartDetails = false;
    },
    closeProfile() {
      this.showProfile = !this.showProfile;
      this.showCartDetails = false;
    },
  },
};
</script>

<style scoped>
#navbar {
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1fr 1fr;
  background: #3f3f3f;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 2;
}

#profile-icon {
  cursor: pointer;
}

#profile-div {
  position: fixed;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  top: 74px;
  right: 30px;
  z-index: 2;
  flex-direction: column;
  width: 300px;
  height: 250px;
  background-color: #ffffff;
}

#profile-div:before {
  content: "";
  position: fixed;
  height: 0;
  width: 0;
  right: 148px;
  top: 44px;
  border-width: 15px;
  border-color: transparent #ffffff transparent transparent;
  border-style: solid;
  transform: rotate(90deg);
  z-index: -6;
}

#notification-counter {
  float: right;
  position: absolute;
  color: white;
  right: 25px;
  top: -8px;
  background-color: red;
  border-radius: 20px;
  padding: 5px;
  font-size: 9px;
  width: 20px;
  height: 20px;
}

.navbar-brand {
  font-size: 24px;
  display: flex;
}

.navbar-grid {
  display: grid;
  align-items: center;
}

.navbar-nav {
  letter-spacing: 0.1em;
  display: flex;
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.nav-link:hover {
  color: #b4b4b4;
}

.nav-link {
  color: #ffffff;
}

.right {
  float: right;
  position: absolute;
  right: 0;
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: right;
  padding-right: 2em;
}

.navbar-login {
  font-size: 13px;
  cursor: pointer;
  color: white;
}

.navbar-login:hover {
  color: #b4b4b4;
  text-decoration: underline;
}

.search-box,
.cart {
  float: right;
  padding: 8px;
  align-items: self-end;
  display: grid;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

</style>
