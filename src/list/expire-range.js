import u from 'updeep';

import _applyRange from './_apply-range';
import _expire from './_expire';
import options from './options';

import _list from './_list';
import _expires from '../status/_expires';

export default
function expireRange(root, listName, start, end, opts = {}) {
    const expires = _expires({ ...opts, ttl: -1 });
    const update = entry => _expire(entry, expires);

    root = _applyRange(root, listName, start, end, update);

    const list = _list(root, listName);

    if (list.total > 0)
        return root;

    return options(root, listName, u.omit('total'));
}
