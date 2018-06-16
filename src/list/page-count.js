import _total from './_total';

export default
function pageCount(root, listName, opts = {}) {
    if (!root || !root.list || !root.list[listName])
        return 0;

    const list = root.list[listName];
    const pageSize = opts.pageSize || list.pageSize;
    const total = _total(list);

    return Math.ceil(total / pageSize);
}
