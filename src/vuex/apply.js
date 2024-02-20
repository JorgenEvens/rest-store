export default
function apply(action, state, ...args) {
    const root = state && Object.create(state);
    const next = action(root, ...args);

    state = state || {};
    Object.assign(state, next);

    return state;
}
