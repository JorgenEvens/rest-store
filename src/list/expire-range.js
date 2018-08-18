import _applyRange from './_apply-range';
import _applyEmptyState from './_apply-empty-state';
import _expire from './_expire';

import { EXPIRED } from '../constants';
import _expires from '../status/_expires';

export default
function expireRange(root, listName, start, end, opts = {}) {
    const expires = _expires({ ...opts, ttl: -1 });
    const update = entry => _expire(entry, expires);

    root = _applyRange(root, listName, start, end, update);
    root = _applyEmptyState(root, listName, {
        expires,
        state: EXPIRED
    });

    return root;
}
