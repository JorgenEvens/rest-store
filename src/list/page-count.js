import _total from './_total';
import _pageSize from './_page-size';

export default
function pageCount(root, listName, opts = {}) {
    if (!root || !root.list || !root.list[listName])
        return 0;

    const list = root.list[listName];
    const pageSize = _pageSize(list, opts);
    const total = _total(list);

    return Math.ceil(total / pageSize);
}
