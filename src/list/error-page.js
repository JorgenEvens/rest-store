import _page from './_page';
import _list from './_list';
import errorRange from './error-range';

export default
function errorPage(root, listName, page, error, opts = {}) {
    const list = _list(root, listName);
    const { start, end } = _page(list, page, opts);

    return errorRange(root, listName, start, end, error);
}
