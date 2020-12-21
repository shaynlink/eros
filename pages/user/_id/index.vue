<template>
    <section v-if="!$store.state.user">
        <Loader />
    </section>
    <section v-else class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns"> 
                    <div class="column is-3">
                        <h1 class="title">
                            Description
                        </h1>
                        <p>{{ $store.state.user.description ? $store.state.user.description : 'A description is a description, even if the description is not descriptive' }}</p>
                    </div>
                    <div class="column is-5">
                        <h1 class="title" style="margin-left: auto;margin-right: auto;">Feed</h1>
                        <Feed :userID="$store.state.user._id" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Feed from '~/components/Feed';
import Loader from '~/components/Loader';

export default {
    components: {
        Feed,
        Loader
    },
    fetch() {
        
    },
    data() {
        return {
            feed: [],
        };
    },
};
</script>