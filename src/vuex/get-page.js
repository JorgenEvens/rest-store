import _get from 'lodash/get';

import shouldFetchPage from '../list/should-fetch-page';
import fetchPage from '../list/page';

import { updateListHash } from './_state-helper';
import _selectors from './_selectors';
import _compact from './_compact';
import getRoot from './get-root';

const pageDefaults = {
    namespace: null,
    listName: 'all',
    fetch: 'fetchPage',
    storeName: '$store'
};

export default
function getPage(pageSelector, listName, options = {}) {
    options = { ...pageDefaults, ...options };

    const { namespace, storeName } = options;
    let { fetch } = options;

    const {
        getSelection,
        getListName,
        getParams,
        getHash
    } = _selectors(pageSelector, { ...options, listName });

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const opts = getParams(this);
        const page =  getSelection(this, opts) || 1;
        const listName = getListName(this, opts);
        const store = _get(this, storeName);
        const { state, dispatch } = store;
        const hash = getHash(opts);

        if (page < 1)
            throw new Error('page must be greater than 0');

        updateListHash(store, namespace, listName, hash);

        const root = getRoot(state, namespace);
        if (shouldFetchPage(root, listName, page, opts))
            dispatch(fetch, { listName, page, ...opts });

        const entries = fetchPage(root, listName, page, opts);
        return _compact(entries);
    };
}
