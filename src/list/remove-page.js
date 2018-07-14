import _page from './_page';
import removeRange from './remove-range';

export default
function removePage(root, listName, page, opts = {}) {
    const list = root && root.list && root.list[listName];
    const { start, end } = _page(list, page, opts);

    return removeRange(root, listName, start, end);
}
