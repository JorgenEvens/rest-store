import _get from 'lodash/get';

import { wrapDispatch } from './throttled-dispatch';
import shouldFetch from '../resource/should-fetch';
import resource from '../resource';
import getRoot from './get-root';

const resourceDefaults = {
    namespace: null,
    fetch: 'fetch',
    storeName: '$store'
};

export default
function getResource(selector, options) {
    options = { ...resourceDefaults, ...options };

    const { storeName, params } = options;

    const getId = typeof selector === 'function' ?
        selector : (cmp) => _get(cmp, selector);

    const getParams = typeof params === 'function' ?
        params : () => params || {};

    const { namespace } = options;
    let { fetch } = options;

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const id =  getId(this);
        const opts = getParams(this);
        const store = _get(this, storeName);
        const dispatch = wrapDispatch(store.dispatch);

        const root = getRoot(store.state, namespace);

        if (shouldFetch(root, id))
            dispatch(fetch, { id, ...opts });

        return resource(root, id);
    };
}
