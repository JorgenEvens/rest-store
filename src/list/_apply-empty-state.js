import u from 'updeep';

import _list from './_list';
import _total from './_total';

export default
function _applyEmptyState(root, listName, options) {
    const list = _list(root, listName);
    const total = _total(list);

    if (total > 0)
        return root;

    return u({
        list: {
            [listName]: options
        }
    }, root || {});
}
