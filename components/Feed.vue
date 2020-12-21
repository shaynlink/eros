<template>
    <section v-if="$fetchState.pending" class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <Loader />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section v-else class="hero">
        <div class="hero-body">
            <div v-if="feed.length > 0">
                <article v-for="(d, index) of feed" :key="index" class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                        <img :src="d.imgURL">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ d.title }}</strong> <small>{{ d.time }}</small>
                                <br>
                                {{ $store.state.user.username }} now <strong>{{ d.action }}</strong> {{ d.title }}
                            </p>
                        </div>
                    </div>
                </article>
                
            </div>
            <div v-else>
                <div class="columns is-vcentered">
                    <div class="column is-3">
                        <img src="~/assets/images/ani.png" />
                    </div>
                    <div class="column">
                        <p class="subtitle">No feed for {{ $store.state.user.username }}.<br />Maybe retry later.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Loader from '~/components/Loader';
import Card from '~/components/Card';
import humanize from 'humanize';

export default {
    props: {
        userID: {
            type: String,
            required: true,
        },
    },
    components: {
        Card,
        Loader,
    },
    watch: {
        '$store.state.auditlog': function() {
            console.log('update');
        },
    },
    async fetch() {
        let auditlogs = this.$store.state.auditlog?.filter((ad) => ['FOLLOWER'].includes(ad.type)).splice(0, 5);
        if (!auditlogs) return;
        for (const ad of auditlogs) {
            if (ad.type == 'FOLLOWER') {
                const user = await this.$axios.get(`http://localhost:3030/users/${ad.data}`, {
                    headers: {
                        authorization: this.$store.state.credential.token,
                    },
                }).then((response) => response.data).catch(console.error);
                if (!user) continue;
                this.feed.push({
                    imgURL: user.avatar ?
                        `https://storage.googleapis.com/baketsu.kabegami.ohori.me/avatars/${user._id.toString()}/${user.avatar}` :
                        'https://avatarfiles.alphacoders.com/262/262215.png',
                    content: user.description,
                    time: humanize.date('F j, Y, g:i a', ad.timestamp),
                    title: user.username,
                    action: ad.action == 'ADD' ? 'follow' : 'unfollow',
                });
            };
        };
    },
    data() {
        this.$store.subscribe((mutation) => {
            if (mutation.type == 'pushAuditLogs' || mutation.type == 'setAuditLogs') this.$fetch();
        });
        return {
            feed: [],
        };
    },
};
</script>