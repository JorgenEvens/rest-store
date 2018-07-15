import u from 'updeep';

import _update from './_update';
import { LOADING } from '../constants';

export default
function loading(root, id) {
    return u({
        resources: {
            [id]: entry => _update(entry, {
                state: LOADING
            })
        }
    }, root || {});
}
