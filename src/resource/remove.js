import u from 'updeep';

import _remove from './_remove';

export default
function remove(root, id) {
    return u({
        resources: {
            [id]: _remove
        }
    }, root || {});
}
