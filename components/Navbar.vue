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
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { name } from "~/package.json";
const byteSize = require('byte-size');

export default {
  data() {
    return {
      name,
      byteSize,
    };
  },
};
</script>