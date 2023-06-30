<template>
  <div class="bg bg-black w-100">
    <div class="border border-white"></div>
    <div id="content-footer">
      <div class="contact-service">
        <h5 class="fw-bold">Contact us</h5>
        <ul style="list-style: none">
          <li>📧 service@meduzza.com</li>
          <li>📞 +49 (0) 61 42 83 54 400</li>
          <li>📞 +49 897 400 458 40</li>
        </ul>
      </div>
      <div class="contact-service">
        <h5 class="fw-bold">Legal notice</h5>
        <router-link to="/privacy/policy" class="nav-link link">Privacy Policy</router-link>
        <router-link to="/terms" class="nav-link link">Terms and Conditions</router-link>
        <router-link to="/cookie" class="nav-link link">Cookie Statement</router-link>
      </div>
      <div class="contact-service">
        <h5 class="fw-bold">Service</h5>
        <ol>
          <li>
            <router-link to="/service" class="nav-link link">Delivery</router-link>
          </li>
          <li>
            <router-link to="/service" class="nav-link link">Payment methods</router-link>
          </li>
          <li>
            <router-link to="/service" class="nav-link link">Return</router-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
}
</script>

<style scoped>
#content-footer {
  display: flow;
  position: relative;
}

.contact-service {
  display: inline-block;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 30px;
  height: 200px;
  color: white;
}

.link {
  text-align: start;
}

.nav-link:hover {
  color: gray;
}

li {
  text-align: start;
}
</style>