import _page from './_page';
import _expand from './_expand';
import addRange from './add-range';

export default
function addPage(root, listName, page, data, opts = {}) {
    const list = root && root.list && root.list[listName];
    const { start, end, pageSize } = _page(list, page, opts);

    data = _expand(data, pageSize);

    return addRange(root, listName, start, end, data);
}
