<template>
  <div class="text-cookie">
    <p>This website uses cookies.</p>
    <p>
      We use cookies to personalise content and ads, provide social-media
      features, make your shopping experience more secure, and analyse traffic
      to our website.
    </p>
    <p>
      We also share information about your use of our website with our
      social-media, advertising and analytics partners and payment service
      providers.
    </p>
    <p>
      Cookies are small text files that can be used by websites to make a user's
      experience more efficient.
    </p>
    <p>
      The law states that we can store cookies on your device if they are
      strictly necessary for the operation of this site. For all other types of
      cookies we need your permission.
    </p>
    <p>
      This site uses different types of cookies. Some cookies are placed by
      third party services that appear on our pages.
    </p>
    <p>
      You can at any time change or withdraw your consent from the Cookie
      Declaration on our website.
    </p>
    <p>
      Learn more about who we are, how you can contact us and how we process
      personal data in our
      <router-link to="/privacy/policy" class="nav-link"
      >Privacy Policy.
      </router-link
      >
    </p>
    <p>
      Please state your consent ID and date when you contact us regarding your
      consent.
    </p>
    <p>
      Your consent applies to the following domains: www.meduzza.es,
      www.meduzza.at, www.meduzza.be, www.meduzza.ch, www.meduzza.co.uk,
      www.meduzza.com, www.meduzza.de, www.meduzza.dk, www.meduzza.fr,
      www.meduzza.nl, www.meduzza.ru, www.meduzza.se
    </p>
    <p>Your current state: Allow all.</p>
  </div>
</template>

<script>
export default {
  name: "CookieStatement",
};
</script>

<style scoped>
.text-cookie {
  margin: 130px 300px 150px;
  font-size: 17px;
}

.nav-link:hover {
  color: #8d8d8d;
}
</style>
