<template>
  <div class="container">
    <navbar />
    <Nuxt />
  </div>
</template>

<script>
import navbar from "~/components/Navbar";

export default {
  components: {
    navbar,
  },
};
</script>