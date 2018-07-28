export default
function getRoot(state, namespace) {
    if (!namespace || typeof namespace != 'string')
        return state;

    const modules = namespace.split('/');
    const len = modules.length;

    for (let i = 0; state && i < len; i++)
        state = state[modules[i]];

    return state;
}

