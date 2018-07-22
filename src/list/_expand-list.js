import u from 'updeep';

import _expand from './_expand';

export default
function _expandList(root, listName, end, filler) {
    return u({
        list: {
            [listName]: {
                entries: (entries = []) => {
                    const length = Math.max(end + 1, entries.length);
                    return _expand(entries, length, filler);
                }
            }
        }
    }, root || {});
}
