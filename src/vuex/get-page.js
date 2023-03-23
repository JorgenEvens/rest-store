import _get from 'lodash/get';
import _omit from 'lodash/omit';

import shouldFetchPage from '../list/should-fetch-page';
import fetchPage from '../list/page';

import { wrapDispatch } from '../utils/throttled-dispatch';
import { updateListHash } from './_state-helper';
import _transformable from './_transformable';
import _selectors from './_selectors';
import _compact from './_compact';
import getRoot from './get-root';

// These arguments should not influence the contents
// of the retrieved list, so we blacklist them when hashing
const HASH_IGNORE = [
    'pageSize',
    'page'
];

const pageDefaults = {
    namespace: null,
    listName: 'all',
    fetch: 'fetchPage',
    storeName: '$store',
    condition: () => true
};

export default
function getPage(pageSelector, listName, options = {}) {
    options = { ...pageDefaults, ...options };

    const { namespace, storeName } = options;
    let { fetch, condition } = options;

    const {
        getSelection,
        getListName,
        getParams,
        getHash
    } = _selectors(pageSelector, { ...options, listName });

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return _transformable(function() {
        const opts = getParams(this);
        const page =  getSelection(this, opts) || 1;
        const listName = getListName(this, opts);
        const store = _get(this, storeName);
        const allowFetch = condition(this, opts);
        const hash = getHash(_omit(opts, HASH_IGNORE));
        const dispatch = wrapDispatch(store.dispatch);

        if (page < 1)
            throw new Error('page must be greater than 0');

        updateListHash(store, namespace, listName, hash);

        const root = getRoot(store.state, namespace);
        if (allowFetch && shouldFetchPage(root, listName, page, opts))
            dispatch(fetch, { listName, page, ...opts });

        const entries = fetchPage(root, listName, page, opts);
        return _compact(entries);
    });
}
