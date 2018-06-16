import ids from './ids';
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
    const pageSize = opts.pageSize || list.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + (pageSize - 1);

    const entries = ids(root, listName, start, end);
    return resources(root, entries);
}
