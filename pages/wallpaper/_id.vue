<template>
  <section v-if="!items">
    <h1>Loading</h1>
  </section>
  <div v-else>
    <div class="columns is-multiline">
      <div v-for="(item, index) of items" :key="index" class="column is-3">
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
                  {{ item.name.split(/\//g).pop().split(/./g).shift() }}
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
export default {
  async asyncData({$axios, route, store}) {
    const path = route.params.id.replace(/ +/g, '_');
    let cache = store.state.cache;
    let items;
    if (cache[path]) {
      items = cache[path];
      console.log('[CACHE] %s element loaded', Object.keys(cache[path]).length);
    } else {
      items = await $axios
        .get(
          `https://eropy-tvd3bgsfya-uc.a.run.app/wallpapers/${path}`
        )
        .then((response) => response.data)
        .then((data) => {
          const rawItems = data.items.filter((item) => item.size != 0);
          store.commit('setCache', {[path]: rawItems});
          store.commit('incrementSize', rawItems.map((v) => parseInt(v.size)).reduce((a, b) => a + b));
          return rawItems;
        });
    };
    return {
      items,
    };
  },
};
</script>
