import _get from 'lodash/get';

import shouldFetchPage from '../list/should-fetch-page';
import fetchPage from '../list/page';
import getRoot from './get-root';
import _compact from './_compact';

const pageDefaults = {
    namespace: null,
    listName: 'all',
    fetch: 'fetchPage',
    storeName: '$store'
};

export default
function getPage(pageSelector, listName, options = {}) {
    options = { ...pageDefaults, ...options };

    const { namespace, params, storeName } = options;
    let { fetch } = options;

    const getPage = typeof pageSelector === 'function' ?
        pageSelector : (cmp) => _get(cmp, pageSelector);

    const getListName = typeof listName === 'function' ?
        listName : () => listName;

    const getParams = typeof params === 'function' ?
        params : () => params || {};

    if (namespace && typeof fetch === 'string')
        fetch = `${namespace}/${fetch}`;

    return function() {
        const opts = getParams(this);
        const page =  getPage(this, opts) || 1;
        const listName = getListName(this, opts);
        const { state, dispatch } = _get(this, storeName);

        if (page < 1)
            throw new Error('page must be greater than 0');

        const root = getRoot(state, namespace);

        if (shouldFetchPage(root, listName, page, opts))
            dispatch(fetch, { listName, page, ...opts });

        const entries = fetchPage(root, listName, page, opts);
        return _compact(entries);
    };
}
