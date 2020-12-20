<template>
    <div>
        <section class="hero" style="background: no-repeat center url('https://images2.alphacoders.com/111/1118834.png')">
            <div class="hero-body">
                <div class="columns is-vcentered">
                    <div class="column is-1">
                        <img style="border-radius: 10%;width: 100%;margin-left: auto;margin-right: auto;" :src="`${
                            $store.state.user && $store.state.user.avatar ? `https://storage.googleapis.com/baketsu.kabegami.ohori.me/avatars/${$store.state.user._id}/${$store.state.user.avatar}` : 'https://avatarfiles.alphacoders.com/262/262215.png'
                        }`">
                    </div>
                    <div class="column is-11">
                        <h1 class="title" style="color: #EFEFEF">
                            {{ $store.state.user ? $store.state.user.username : '' }}
                        </h1>
                        <h2 class="subtitle" style="color: #CBCBCB">
                            The Hero
                        </h2>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-menu">
                    <div class="navbar-start navbar-end">
                        <a class="navbar-item">
                            Overview
                        </a>

                        <a class="navbar-item">
                            Documentation
                        </a>

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                            More
                            </a>

                            <div class="navbar-dropdown">
                                <a class="navbar-item">
                                    About
                                </a>
                                <a class="navbar-item">
                                    Jobs
                                </a>
                                <a class="navbar-item">
                                    Contact
                                </a>
                                <hr class="navbar-divider">
                                <a class="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
        <section>
            <NuxtChild />
        </section>
    </div>
</template>

<script>
export default {
    fetch() {
        if (this.$route.params.id == '@me') {
            this.user = this.$store.state.user;
        };
    },
    data() {
        return {
            user: null,
        };
    },
};
</script>