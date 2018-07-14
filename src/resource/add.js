import u from 'updeep';

import _expires from '../status/_expires';
import { OK } from '../constants';

export default
function add(root, id, resource, opts = {}) {
    return u({
        resources: {
            [id]: entry => ({
                ...entry,
                id,
                expires: _expires(opts),
                state: OK,
                data: resource
            })
        }
    }, root || {});
}
