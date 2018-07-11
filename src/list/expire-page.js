import _page from './_page';
import expireRange from './expire-range';

export default
function expirePage(root, listName, page, opts = {}) {
    const list = root && root.list && root.list[listName];
    const { start, end } = _page(list, page, opts);

    return expireRange(root, listName, start, end);
}
