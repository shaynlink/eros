<template>
  <section>
    <div class="card">
      <div class="columns">
        <div class="column">
          <div class="card-image">
            <figure class="image">
              <img
                :src="imgURL"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        <div class="column">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image">
                            <img :src="`${
                                action == 'Follow' ?
                                    'https://i.pinimg.com/originals/cc/e9/a9/cce9a9a4a3d74bfce45f8b568d8c6e6d.png' : ''
                                    
                            }`" style="width: 50px" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">{{ title }}</p>
                        <p class="subtitle is-6">{{ action }}</p>
                    </div>
                </div>
                <div class="content">
                    {{ content }}
                    <br>
                    <time datetime="2016-1-1">{{ time }}</time>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    props: {
        imgURL: {
            type: String,
            default: 'https://bulma.io/images/placeholders/1280x960.png',
        },
        content: {
            type: String,
            default: 'Hello world',
        },
        time: {
            type: String,
        },
        title: String,
        action: String,
    },
};
</script>