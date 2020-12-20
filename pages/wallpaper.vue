<template>
  <section class="hero-body">
    <div class="columns">
      <div class="column is-1">
        <aside class="menu">
          <div v-for="(list, index) of menu" :key="index">
            <p class="menu-label">{{ list.label }}</p>
            <ul class="menu-list">
              <li v-for="(slist, _index) of list.list" :key="_index">
                <NuxtLink
                  :to="`/wallpaper/${slist.name}`"
                  :class="
                    $route.params.id == slist.name
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
      <div class="column is-11">
        <NuxtChild keep-alive />
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
              name: "dragon ball",
              list: [],
            },
            {
              name: "femme",
              list: [],
            },
            {
              name: "naruto",
              list: [],
            },
            {
              name: "technologie",
              list: [],
            },
            {
              name: "univers",
              list: [],
            },
          ],
        },
      ],
    };
  },
};
</script>