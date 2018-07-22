import _total from './_total';
import _list from './_list';
import _pageSize from './_page-size';

export default
function pageCount(root, listName, opts = {}) {
    const list = _list(root, listName);
    const pageSize = _pageSize(list, opts);
    const total = _total(list);

    return Math.ceil(total / pageSize);
}
