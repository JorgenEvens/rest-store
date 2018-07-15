import _page from './_page';
import _list from './_list';
import shouldFetchRange from './should-fetch-range';

export default
function shouldFetchPage(root, listName, page, opts = {}) {
    const list = _list(root, listName);
    const { start, end } = _page(list, page, opts);

    return shouldFetchRange(root, listName, start, end);
}
