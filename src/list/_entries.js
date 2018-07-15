import _total from './_total';
import _list from './_list';

export default
function _entries(root, listName, start, end) {
    const list = _list(root, listName);
    const entries = list.entries;
    const total = _total(list);

    if (!Array.isArray(entries))
        return [];

    start = Math.max(start, 0);
    end = Math.min(total, end + 1);

    if (start >= total)
        return [];

    const count = end - start;
    const result = entries
        .slice(start, end);

    if (result.length == count)
        return result;

    const missing = new Array(count - result.length).fill(null);

    return result.concat(missing);
}
