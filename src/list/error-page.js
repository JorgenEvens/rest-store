import _page from './_page';
import errorRange from './error-range';

export default
function errorPage(root, listName, page, error, opts = {}) {
    const list = root && root.list && root.list[listName];
    const { start, end } = _page(list, page, opts);

    return errorRange(root, listName, start, end, error);
}
