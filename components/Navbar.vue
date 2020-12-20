<template>
  <section>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <NuxtLink class="navbar-item" to="/">
          <img src="https://avatarfiles.alphacoders.com/263/263237.jpg" />
        </NuxtLink>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <NuxtLink class="navbar-item" to="/"> Home </NuxtLink>

          <NuxtLink class="navbar-item" to="/wallpaper">Wallpaper </NuxtLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
              <p>{{ byteSize(this.$store.state.size).value }} {{ byteSize(this.$store.state.size).unit }} loaded</p>
          </div>
          <div v-if="$store.state.user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ $store.state.user.username }}
            </a>

            <div class="navbar-dropdown">
              <NuxtLink class="navbar-item" to="/user/@me">
                account
              </NuxtLink>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                log out
              </a>
            </div>
          </div>
          <div v-else class="navbar-item">
            <div class="buttons">
              <NuxtLink class="button is-primary" to="/register">
                <strong>Sign up</strong>
              </NuxtLink>
              <NuxtLink class="button is-light" to="/login"> Log in </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { name } from "~/package.json";
import { close } from '~/lib/Websocket';
const byteSize = require('byte-size');

export default {
  data() {
    return {
      name,
      byteSize,
    };
  },
  methods: {
    logout(e) {
      e.preventDefault();

      const c = close.bind(this);
      c();

      window.localStorage.removeItem('credential');
      window.localStorage.removeItem('user');

      this.$store.commit('setCredential', null);
      this.$store.commit('setUser', null);

      this.$router.push('/');
    },
  },
};
</script>