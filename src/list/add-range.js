import u from 'updeep';

import { OK } from '../constants';
import _expires from '../status/_expires';
import _expand from './_expand';

export default
function addRange(root, listName, start, end, data, opts = {}) {
    const len = end - start + 1;

    const state = OK;
    const expires = _expires(opts);

    data = data.slice(0, len);
    data = data.map(id => ({ id, expires, state }));
    data = _expand(data, len);

    const entries = (ids = []) => {
        ids = _expand(ids, end);

        return ids.slice(0, start)
            .concat(data)
            .concat(ids.slice(end + 1));
    };

    return u({
        list: {
            [listName]: {
                entries
            }
        }
    }, root || {});
}
