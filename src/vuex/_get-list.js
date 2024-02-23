import _get from './_get';

import getRoot from './get-root';
import _selectors from './_selectors';
import _list from '../list/_list';

const resourceDefaults = {
    namespace: null,
    option: null,
    storeName: '$store'
};

export default
function getList(listName, options = {}) {
    options = { ...resourceDefaults, ...options };

    const { storeName, namespace } = options;

    const {
        getListName,
        getParams
    } = _selectors('option', { ...options, listName });

    return function(cmp) {
        const store = _get(cmp, storeName);
        const opts = getParams(cmp);
        const listName = getListName(cmp, opts);
        const root = getRoot(store.state, namespace);
        const list = _list(root, listName);

        return list;
    };
}
