import _total from './_total';

export default
function ids(root, listName, start, end) {
    if (!root || !root.list || !root.list[listName])
        return [];

    const list = root.list[listName];
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
        .slice(start, end)
        .map(entry => entry.id);

    if (result.length == count)
        return result;

    const missing = new Array(count - result.length).fill(null);

    return result.concat(missing);
}
