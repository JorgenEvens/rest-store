import u from 'updeep';

import { OK } from '../constants';
import _expires from '../status/_expires';

export default
function options(root, listName, opts) {
    if (opts && opts.total === 0 && !opts.state) {
        opts = {
            ...opts,
            expires: _expires(opts),
            state: OK
        };
    }

    return u({
        list: {
            [listName]: opts
        }
    }, root || {});
}
