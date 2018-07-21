import _page from './_page';
import loadingRange from './loading-range';

export default
function loadingPage(root, listName, page, opts = {}) {
    const list = root && root.list && root.list[listName];
    const { start, end } = _page(list, page, opts);

    return loadingRange(root, listName, start, end);
}
