import _total from './_total';
import _list from './_list';
import _expand from './_expand';
import isState from '../status/is-state';
import { OK } from '../constants';

function _resourceState(root, id) {
    if (!root || !root.resources || !root.resources[id])
        return null;

    const entry = root.resources[id];
    return entry.state;
}

export default
function _entries(root, listName, start, end) {
    const list = _list(root, listName);
    const entries = list.entries;
    const total = _total(list);

    start = Math.max(start, 0);
    end = Math.min(total, end + 1);

    if (start >= total)
        return [];

    const count = end - start;
    const result = entries
        .slice(start, end)
        .map(entry => {
            if (!isState(entry, OK))
                return entry;

            const state = _resourceState(root, entry && entry.id);
            if (!state) return null;

            return { ...entry, state };
        });

    if (result.length == count)
        return result;

    return _expand(result, count);
}
