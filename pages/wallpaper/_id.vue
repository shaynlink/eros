<template>
  <section>
    {{ path }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.path,
    };
  },
};
</script>
