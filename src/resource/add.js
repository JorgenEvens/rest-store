import u from 'updeep';

import _expires from '../status/_expires';
import { ENTRY, OK } from '../constants';

function update(entry, id, resource, opts) {
    entry = {
        ...entry,
        id,
        expires: _expires(opts),
        state: OK,
        data: resource && {
            ...resource,
            get [ENTRY]() { return entry; }
        }
    };

    return entry;
}

export default
function add(root, id, resource, opts = {}) {
    return u({
        resources: {
            [id]: entry => update(entry, id, resource, opts)
        }
    }, root || {});
}
