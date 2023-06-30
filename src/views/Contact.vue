<template>
  <div class="container">
    <div>
      <label>Name</label>
      <input
          type="text"
          v-model="name"
          name="name"
          placeholder="Your Name"
      >
      <label>Email</label>
      <input
          type="email"
          v-model="email"
          name="email"
          placeholder="Your Email"
      >
      <label>Message</label>
      <textarea
          name="message"
          v-model="message"
          cols="30" rows="5"
          placeholder="Message">
          </textarea>
      <button class="btn btn-dark px-4 mt-2" @click="sendEmail">Send</button>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Contact",
  data() {
    return {
      email: '',
      message: '',
      name: '',
    }
  },
  methods: {
    sendEmail() {
      try {
        emailjs.send('service_a5t9saj', 'template_siye7am',
            {
              from_name: this.name,
              from_email: this.email,
              message: this.message
            }, 'aDIfVs3j8DVwr2L7K')

      } catch (error) {
        console.log({error})
      }
      this.name = ''
      this.email = ''
      this.message = ''
    },
  }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: block;
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 40%;
  height: 500px;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>