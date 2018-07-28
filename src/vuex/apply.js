export default
function apply(action, state, ...args) {
    const next = action(state, ...args);

    state = state || {};
    Object.assign(state, next);

    return state;
}
