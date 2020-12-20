<template>
  <div>
    <section id="home" class="hero is-large">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <h1 class="title">Welcome to {{ name }}</h1>
              <p class="subtitle">
                Created by
                <a href="https://github.com/Shaynlink" target="_blank"
                  ><strong>Shaynlink</strong></a
                >
                &
                <a
                  href="https://www.youtube.com/channel/UCYdkuiG_0eKefRKFsC-REvg"
                  target="_blank"
                >
                  <strong>Goken</strong>
                </a>
                !
              </p>
              <p class="subtitle">API states: {{
                $store.state.services.api == 'WAITING' ? 'Await for acknowledge 🛰' :
                $store.state.services.api == 'READY' ? 'Working 🚀' : 'API not available, website not working ❌'
                }}<br />
                WS states: {{
                  $store.state.services.ws == 'WAITING' ? 'Await for connection 🛰' :
                  $store.state.services.ws == 'READY' ? 'Working 🚀' : 'WS not available, update not working ❌'
                }}
                </p>
            </div>
            <div class="column is-6">
              <img
                src="https://images2.alphacoders.com/727/72732.png"
                alt="Home picture"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { name } from "~/package.json";

export default {
  data() {
    return {
      name,
    };
  },
};
</script>