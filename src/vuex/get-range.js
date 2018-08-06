import _get from 'lodash/get';

import shouldFetchRange from '../list/should-fetch-range';
import fetchRange from '../list/range';
import getRoot from './get-root';
import _compact from './_compact';

const rangeDefaults = {
    namespace: null,
    listName: 'all',
    fetch: 'fetchRange',
    storeName: '$store'
};

export default
function getRange(rangeSelector, listName, options = {}) {
    options = { ...rangeDefaults, ...options };

    const { namespace, params, storeName } = options;
    let { fetch } = options;

    const getRange = typeof rangeSelector === 'function' ?
        rangeSelector : (cmp) => _get(cmp, rangeSelector);

    const getListName = typeof listName === 'function' ?
        listName : () => listName;

    const getParams = typeof params === 'function' ?
        params : () => params || {};

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const opts = getParams(this);
        const listName = getListName(this, opts);
        const { state, dispatch } = _get(this, storeName);
        const { start = 0, end = 9 } =  getRange(this, opts) || {};

        const root = getRoot(state, namespace);

        if (shouldFetchRange(root, listName, start, end))
            dispatch(fetch, { listName, start, end, ...opts });

        const entries = fetchRange(root, listName, start, end, opts);
        return _compact(entries);
    };
}
