import u from 'updeep';

import _expand from './_expand';

export default
function addRange(root, listName, start, end, data) {
    const len = end - start + 1;

    data = data.slice(0, len);
    data = data.map(id => ({ id }));
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
