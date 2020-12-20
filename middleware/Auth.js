export default function (context) {
    if (context.store.state.user) return context.redirect('/');
};