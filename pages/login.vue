<template>
  <section>
    <div class="hero">
      <div class="hero-body">
        <div class="container is-max-desktop">
          <form>
            <div class="columns is-multiline">
              <div class="column is-12">
                <figure class="image">
                  <img
                    style="border-radius: 30px;width: 15%;margin-left: auto;margin-right: auto;"
                    src="https://avatarfiles.alphacoders.com/263/263237.jpg"
                    alt=""
                  />
                </figure>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">email</label>
                  <div class="control">
                    <input
                      class="input"
                      type="email"
                      v-model="email"
                      name="email"
                      placeholder="e.g. me@shaynlink.fr"
                      autocomplete="email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input" type="password" autocomplete="current-password" v-model="password" name="password" required />
                  </div>
                </div>
              </div>

              <div v-if="errors.global" class="column is-12">
                <article class="message is-danger">
                  <div class="message-body">
                    {{ errors.global }}
                  </div>
                </article>
              </div>

              <div class="column is-12">
                <div class="field is-grouped is-grouped-centered">
                  <p class="control">
                    <a class="button is-primary" @click="submit"> Submit </a>
                  </p>
                  <p class="control">
                    <a class="button is-light"> Cancel </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Websocket from '~/lib/Websocket';

export default {
  data() {
    return {
      email: null,
      password: null,

      errors: {
        global: null
      },
    };
  },
  methods: {
    submit: function(e) {
      e.preventDefault();

      this.errors.global = null;

      this.$axios.post('http://localhost:3030/accounts/login', {
        email: this.email,
        password: this.password
      }).then((response) => {
        this.$store.commit('setCredential', response.data);

        window.localStorage.setItem('credential', JSON.stringify(response.data));

        const c = Websocket.bind(this);
        c(response.data.token);

        this.$axios.get(`http://localhost:3030/accounts/${response.data.token}`).then((response) => {
          this.$store.commit('setUser', response.data);

          window.localStorage.setItem('user', JSON.stringify(response.data));


          this.$router.push('/');
        }).catch((err) => {
          this.errors.global = 'An error occured, please contact an administator';
          if (!err.response) return;
          this.errors.global += `<br />-${err.response.data?.errors?.map((v) => v.message).join('<br />-')}`;
        });
      }).catch((err) => {
        if (!err.response) return this.errors.global = 'An error occured, please contact an administator';
        if (err.response.data?.errors.some((v) => v.message == 'Incorrect password')) {
          this.errors.global = 'This password is incorrect';
        } else {
          this.errors.global = `An error occured, please retry <br />-${err.response.data?.errors?.map((v) => v.message).join('<br />-')}`;
        };
      });
    },
  },
};
</script>   