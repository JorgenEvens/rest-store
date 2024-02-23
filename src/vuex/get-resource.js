import _get from './_get';

import { wrapDispatch } from '../utils/throttled-dispatch';
import shouldFetch from '../resource/should-fetch';
import _transformable from './_transformable';
import resource from '../resource';
import getRoot from './get-root';

const resourceDefaults = {
    namespace: null,
    fetch: 'fetch',
    storeName: '$store',
    condition: () => true
};

export default
function getResource(selector, options) {
    options = { ...resourceDefaults, ...options };

    const { storeName, params, condition, placeholder = null } = options;

    const getId = typeof selector === 'function' ?
        selector : (cmp) => _get(cmp, selector);

    const getParams = typeof params === 'function' ?
        params : () => params || {};

    const { namespace } = options;
    let { fetch } = options;

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return _transformable(function() {
        const id =  getId(this);
        const opts = getParams(this);
        const allowFetch = condition(this, opts);
        const store = _get(this, storeName);
        const dispatch = wrapDispatch(store.dispatch);

        const root = getRoot(store.state, namespace);

        if (allowFetch && shouldFetch(root, id))
            dispatch(fetch, { id, ...opts });

        const value = resource(root, id);

        if (value === null)
            return placeholder;

        return value;
    });
}
