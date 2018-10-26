import _getList from './_get-list';
import _selectors from './_selectors';

import _total from '../list/_total';
import _pageSize from '../list/_page-size';

export default
function getTotal(listName, options = {}) {
    const getList = _getList(listName, options);
    const { getParams } = _selectors('option', { ...options, listName });

    return function() {
        const list = getList(this);
        const opts = getParams(this);
        const total = _total(list);
        const pageSize = _pageSize(list, opts);

        return Math.ceil(total / pageSize);
    };
}
