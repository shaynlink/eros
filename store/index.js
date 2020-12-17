export const state = () => ({
    cache: {},
    size: 0,
});

export const mutations = {
    setCache(state, cache) {
        state.cache = Object.assign(cache, state.cache);
    },

    incrementSize(state, num) {
        state.size += parseInt(num);
    },
};