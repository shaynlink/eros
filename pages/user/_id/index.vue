<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns"> 
                    <div class="column is-4">
                        <div class="relative">
                            <h1 class="title">
                                Description
                            </h1>
                            <p>{{ $store.state.user && $store.state.user.description ? $store.state.user.description : 'A description is a description, even if the description is not descriptive' }}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="relative">
                            <h1 class=""></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>