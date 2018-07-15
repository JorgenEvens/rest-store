import u from 'updeep';

import _update from './_update';
import _expires from '../status/_expires';
import { OK } from '../constants';


export default
function add(root, id, resource, opts = {}) {
    return u({
        resources: {
            [id]: entry => _update(entry, {
                id,
                expires: _expires(opts),
                state: OK,
                data: resource
            })
        }
    }, root || {});
}
