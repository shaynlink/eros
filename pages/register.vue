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

              <div class="column is-12">
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                    <input
                      :class="`input ${errors.username ? 'is-danger' : ''}`"
                      type="text"
                      v-model="username"
                      name="username"
                      placeholder="e.g. Shaynlink"
                      autocomplete="username"
                      required
                    />
                  </div>
                  <p v-if="errors.username" class="help is-danger">{{errors.username}}</p>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">email</label>
                  <div class="control">
                    <input
                      :class="`input ${errors.email ? 'is-danger' : ''}`"
                      type="email"
                      v-model="email"
                      name="email"
                      placeholder="e.g. me@shaynlink.fr"
                      autocomplete="email"
                      required
                    />
                  </div>
                  <p :class="`help ${errors.email ? 'is-danger' : ''}`">{{ errors.email ? errors.email : 'This information is private' }}</p>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <label class="label">Re-enter email</label>
                  <div class="control">
                    <input
                      :class="`input ${errors.reemail ? 'is-danger' : ''}`"
                      type="text"
                      v-model="reemail"
                      name="reemail"
                      placeholder="e.g. me@shaynlink.fr"
                      autocomplete="email"
                      required
                    />
                    <div v-if="errors.reemail" class="help is-danger">{{ errors.reemail }}</div>
                  </div>
                </div>
              </div>

              <div class="column is-12">
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input :class="`input ${errors.password ? 'is-danger' : ''}`" type="password" autocomplete="new-password" v-model="password" name="password" required />
                  </div>
                  <p v-if="errors.password" class="help is-danger">{{ errors.password }}</p>
                </div>
              </div>

              <div class="column">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="tos" name="tos" required />
                      I agree to the
                      <NuxtLink to="/tos">terms and conditions</NuxtLink>
                    </label>
                  </div>
                  <p v-if="errors.tos" class="help is-danger">{{errors.tos}}</p>
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
      username: null,
      email: null,
      reemail: null,
      password: null,
      tos: false,

      errors: {
        username: null,
        email: null,
        reemail: null,
        password: null,
        tos: null,
        global: null
      },
    };
  },
  methods: {
    submit: function(e) {
      e.preventDefault();

      this.errors.global = null;

      if (!this.username) {
        this.errors.username = 'Please enter your username';
      } else if (this.username.length < 3) {
        this.errors.username = 'Your username is too short, 3 letter min';
      } else if (this.username.length > 30) {
        this.errors.username = 'Your username is too long, 30 letter max';
      } else this.errors.username = null;

      if (!this.email) {
        this.errors.email = 'Please enter your email';
      } else if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.email)) {
        this.errors.email = 'Invalid email';
      } else this.errors.email = null;

      if (!this.reemail) {
        this.errors.reemail = 'Please enter a re-email';
      } else if (this.reemail != this.email) {
        this.errors.reemail = 're-email is not same of '
      } else this.errors.reemail = null;

      if (!this.password) {
        this.errors.password = 'Please enter a password';
      } else if (!/[a-z]/g.test(this.password) || !/[A-Z]/g.test(this.password) || !/[0-9]/g.test(this.password)) {
        this.errors.password = 'You must use a lowercase and uppercase characters and at least a number';
      } else if (new RegExp(this.username, 'gi').test(this.password) || new RegExp(this.email, 'gi').test(this.password)) {
        this.errors.password = 'Your password doesn\'t content your username or email';
      } else if (this.password.length < 6) {
        this.errors.password = 'Your password is too short, 6 letter min';
      } else if (this.password.length > 50) {
        this.errors.password = 'Your password is too long, 50 letter max';
      } else this.errors.password = null;

      if (!this.tos) {
        this.errors.tos = 'Please accept T.O.S.';
      } else this.errors.tos = null;

      if (Object.values(this.errors).some((v) => !!v)) return;

      this.$axios.post('http://localhost:3030/accounts', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then((response) => {
        this.$store.commit('setUser', response.data);

        window.localStorage.setItem('user', JSON.stringify(response.data));

        this.$axios.post('http://localhost:3030/accounts/login', {
          email: this.email,
          password: this.password,
        }).then((response) => {
          this.$store.commit('setCredential', response.data);

          window.localStorage.setItem('credential', JSON.stringify(response.data));

          const c = Websocket.bind(this);
          c(response.data.token);

          this.$router.push('/');
        }).catch((err) => {
          this.errors.global = 'An error occured, please contact an administator';
          if (!err.response) return;
          this.errors.global += `<br />-${err.response.data?.errors?.map((v) => v.message).join('<br />-')}`;
        });
      }).catch((err) => {
        if (!err.response) return this.errors.global = 'An error occured, please contact an administator';
        if (err.response.data?.errors.some((v) => v.error.startsWith('E11000'))) {
          this.errors.global = 'This email is already used';
        } else {
          this.errors.global = `An error occured, please retry <br />-${err.response.data?.errors?.map((v) => v.message).join('<br />-')}`;
        };
      });
    },
  },
};
</script>