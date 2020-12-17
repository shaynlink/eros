<template>
  <section class="hero-body">
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <aside class="menu">
            <div v-for="(list, index) of menu" :key="index">
              <p class="menu-label">{{ list.label }}</p>
              <ul class="menu-list">
                <li v-for="(slist, _index) of list.list" :key="_index">
                  <NuxtLink
                    :to="`/wallpaper/${slist.name}`"
                    :class="
                      $router.path == `/wallpaper/${slist.name}`
                        ? 'is-active'
                        : ''
                    "
                    >{{ slist.name }}</NuxtLink
                  >
                  <ul v-if="$router.path == `/wallpaper/${slist.name}`">
                    <li v-for="(sname, sindex) of slist" :key="sindex">
                      <a>{{ sname }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div class="column is-10">
          <NuxtChild />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          label: "wallpaper",
          list: [
            {
              name: "anime",
              list: ["dragon-ball", "naruto"],
            },
            {
              name: "femme",
              list: [],
            },
            {
              name: "technologie",
              list: [],
            },
            {
              name: "espace",
              list: ["univers"],
            },
          ],
        },
      ],
    };
  },
};
</script>