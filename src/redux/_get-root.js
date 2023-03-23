import _get from 'lodash/get';

export default
function getRoot(state, namespace) {
    if (!namespace || typeof namespace != 'string')
        return state;

    const modules = namespace.split('/');

    return _get(state, modules);
}

