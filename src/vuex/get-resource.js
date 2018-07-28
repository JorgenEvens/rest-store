import _get from 'lodash/get';

import resource from '../resource';
import shouldFetch from '../resource/should-fetch';
import getRoot from './get-root';

const resourceDefaults = {
    namespace: null,
    fetch: 'fetch',
    storeName: '$store'
};

export default
function getResource(selector, options) {
    options = { ...resourceDefaults, ...options };

    const { storeName } = options;

    const getId = typeof selector === 'function' ?
        selector : (cmp) => _get(cmp, selector);

    const { namespace } = options;
    let { fetch } = options;

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const { state, dispatch } = _get(this, storeName);
        const id =  getId(this);

        const root = getRoot(state, namespace);

        if (shouldFetch(root, id))
            dispatch(fetch, { id });

        return resource(root, id);
    };
}
