import u from 'updeep';

import _update from './_update';
import _expires from '../status/_expires';
import { EXPIRED } from '../constants';

export default
function expire(root, id, opts = {}) {
    return u({
        resources: {
            [id]: entry => entry && _update(entry, {
                expires: _expires({ ...opts, ttl: -1 }),
                state: EXPIRED
            })
        }
    }, root || {});
}
