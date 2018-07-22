import u from 'updeep';

import _update from './_update';
import { ERROR } from '../constants';

export default
function error(root, id, error) {
    return u({
        resources: {
            [id]: entry => _update(entry, {
                error,
                state: ERROR
            })
        }
    }, root || {});
}
