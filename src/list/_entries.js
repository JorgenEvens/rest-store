import _total from './_total';
import _list from './_list';
import _expand from './_expand';

export default
function _entries(root, listName, start, end) {
    const list = _list(root, listName);
    const entries = list.entries || [];
    const total = _total(list);

    start = Math.max(start, 0);
    end = Math.min(total, end + 1);

    if (start >= total)
        return [];

    const count = end - start;
    const result = entries
        .slice(start, end);

    if (result.length == count)
        return result;

    return _expand(result, count);
}
