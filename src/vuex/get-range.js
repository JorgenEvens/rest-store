import _get from 'lodash/get';

import shouldFetchRange from '../list/should-fetch-range';
import _transformable from './_transformable';
import fetchRange from '../list/range';
import getRoot from './get-root';
import _compact from './_compact';
import _selectors from './_selectors';
import { updateListHash } from './_state-helper';
import { wrapDispatch } from './throttled-dispatch';

const rangeDefaults = {
    namespace: null,
    listName: 'all',
    fetch: 'fetchRange',
    storeName: '$store',
    condition: () => true
};

export default
function getRange(rangeSelector, listName, options = {}) {
    options = { ...rangeDefaults, ...options };

    const { namespace, storeName } = options;
    let { fetch, condition } = options;

    const {
        getSelection,
        getListName,
        getParams,
        getHash
    } = _selectors(rangeSelector, { ...options, listName });

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return _transformable(function() {
        const opts = getParams(this);
        const listName = getListName(this, opts);
        const { start = 0, end = 9 } = getSelection(this, opts) || {};

        const store = _get(this, storeName);
        const hash = getHash(opts);
        const allowFetch = condition(this, opts);
        const dispatch = wrapDispatch(store.dispatch);

        updateListHash(store, namespace, listName, hash);

        const root = getRoot(store.state, namespace);
        if (allowFetch && shouldFetchRange(root, listName, start, end))
            dispatch(fetch, { listName, start, end, ...opts });

        const entries = fetchRange(root, listName, start, end, opts);
        return _compact(entries);
    });
}
