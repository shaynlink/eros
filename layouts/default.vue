<template>
<section>
  <navbar />
   <Nuxt />
</section>
</template>

<script>
import navbar from "~/components/Navbar";

export default {
  components: {
    navbar,
  },
};
</script>