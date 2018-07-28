import _page from './_page';
import _list from './_list';
import loadingRange from './loading-range';

export default
function loadingPage(root, listName, page, opts = {}) {
    const list = _list(root, listName);
    const { start, end } = _page(list, page, opts);

    return loadingRange(root, listName, start, end);
}
