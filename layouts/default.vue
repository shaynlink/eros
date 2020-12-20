<template>
<section>
  <navbar />
   <Nuxt />
</section>
</template>

<script>
import navbar from "~/components/Navbar";
import WebSocket from '~/lib/Websocket';

export default {
  components: {
    navbar,
  },
  async fetch() {
    await this.$axios.get(`https://eropy-tvd3bgsfya-uc.a.run.app/`)
    .then(() => {
      this.$store.commit('updateServices', {api: 'READY'});
    }).catch(() => {
      this.$store.commit('updateServices', {api: 'ERROR'});
    });
  },
  mounted() {
    let credential = window.localStorage.getItem('credential');

    if (!credential || credential.length < 1) return;
    
    credential = JSON.parse(credential);
    this.$store.commit('setCredential', credential);

    if (credential.timestamp < Date.now()) return;

    let user = window.localStorage.getItem('user');
    
    if (!user || user.length < 1) {
      this.$axios.get(`http://localhost:3030/accounts/${credential.token}`).then((response) => {
        this.$store.commit('setUser', response.data);

        window.localStorage.setItem('user', response.data);
      }).catch((err) => {});
    } else {
      user = JSON.parse(user);
      
      this.$store.commit('setUser', user);

      let c = WebSocket.bind(this);
      c(credential.token);
    };
  },
};
</script>