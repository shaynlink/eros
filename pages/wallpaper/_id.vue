<template>
  <section v-if="$fetchState.pending">
    <Loader />
  </section>
  <div v-else>
    <div class="columns is-multiline">
      <div v-for="(item, index) of items" :key="index" class="column is-4">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="item.mediaLink" :alt="item.name" width="100" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="subtitle is-6">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader';

export default {
  components: {
    Loader,
  },
  watch: {
    "$route.query": "$fetch",
  },
  async fetch() {
    const path = this.$route.params.id.replace(/ +/g, "_");
    let cache = this.$store.state.cache;
    if (cache[path]) {
      this.items = cache[path];
      console.log("[CACHE] %s element loaded", Object.keys(cache[path]).length);
    } else {
      this.items = await this.$axios
        .get(`https://eropy-tvd3bgsfya-uc.a.run.app/wallpapers/${path}`)
        .then((response) => response.data)
        .then((data) => {
          const rawItems = data.items.filter((item) => item.size != 0);
          this.$store.commit("setCache", { [path]: rawItems });
          this.$store.commit(
            "incrementSize",
            rawItems.map((v) => parseInt(v.size)).reduce((a, b) => a + b)
          );
          return rawItems;
        });
    }
  },
  data() {
    return {
      items: [],
    };
  },
};
</script>