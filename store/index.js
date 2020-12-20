export const state = () => ({
    cache: {},
    size: 0,
    user: null,
    credential: null,
    analytics: null,
    ws: null,
    metadata: {},
    services: {
        api: 'WAITING',
        ws: 'WAITING',
    },
});

export const mutations = {
    setCache(state, cache) {
        state.cache = Object.assign(state.cache, cache);
    },

    incrementSize(state, num) {
        state.size += parseInt(num);
    },

    setUser(state, user) {
        state.user = user;
    },

    updateUser(state, user) {
        state.user = Object.assign(state.user, user);
    },

    setCredential(state, credential) {
        state.credential = credential;
    },

    setAnalytics(state, analytics) {
        state.analytics = analytics;
    },

    updateAnalytics(state, analytics) {
        state.analytics = Object.assign(state.analytics, analytics);
    },

    setWs(state, ws) {
        state.ws = ws;
    },

    setMetadata(state, meta) {
        state.meta = meta;
    },

    updateServices(state, service) {
        state.services = Object.assign(state.services, service);
    },
};