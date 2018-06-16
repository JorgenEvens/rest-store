import u from 'updeep';

import { DEFAULT_RESOURCE_TTL, OK } from '../constants';

export default
function add(root, id, resource) {
    return u({
        resources: {
            [id]: {
                expires: Date.now() + DEFAULT_RESOURCE_TTL,
                state: OK,
                data: resource
            }
        }
    }, root || {});
}
