import _get from 'lodash/get';
import hash from 'hash-it';

const defaultHasher = (v) => hash(v);

export default
function _options(selector, options = {}) {

    const { listName, params, hasher } = options;

    const getSelection = typeof selector === 'function' ?
        selector : (cmp) => _get(cmp, selector);

    const getListName = typeof listName === 'function' ?
        listName : () => listName;

    const getParams = typeof params === 'function' ?
        params : () => params || {};

    const getHash = typeof hasher === 'function' ?
        hasher : defaultHasher;

    return {
        getSelection,
        getListName,
        getParams,
        getHash
    };
}

