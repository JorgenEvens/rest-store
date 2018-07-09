import ids from './ids';
import _page from './_page';
import pageCount from './page-count';
import resources from '../resource/list';

export default
function page(root, listName, page, opts = {}) {
    if (!root || !root.list || !root.list[listName])
        return [];

    page = Math.max(0, page);
    const pages = pageCount(root, listName, opts);

    if (page > pages)
        return [];

    const list = root.list[listName];
    const { start, end } = _page(list, page, opts);

    const entries = ids(root, listName, start, end);
    return resources(root, entries);
}
