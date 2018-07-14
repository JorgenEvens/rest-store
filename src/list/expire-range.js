import _applyRange from './_apply-range';
import _expire from './_expire';

import _expires from '../status/_expires';

export default
function expireRange(root, listName, start, end, opts = {}) {
    const expires = _expires({ ...opts, ttl: -1 });
    const update = entry => _expire(entry, expires);

    return _applyRange(root, listName, start, end, update);
}
