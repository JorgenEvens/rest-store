import _pageSize from './_page-size';

export default
function _page(list, page, opts = {}) {
    const pageSize = _pageSize(list, opts);
    const start = (page - 1) * pageSize;
    const end = start + (pageSize - 1);

    return { start, end, pageSize };
}
