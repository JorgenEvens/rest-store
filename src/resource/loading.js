import u from 'updeep';

import { LOADING } from '../constants';

export default
function loading(root, id) {
    return u({
        resources: {
            [id]: entry => ({
                ...entry,
                state: LOADING
            })
        }
    }, root || {});
}
