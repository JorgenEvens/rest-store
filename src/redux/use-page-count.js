import useList from './_use-list';

import _total from '../list/_total';
import _pageSize from '../list/_page-size';

export default
function usePageCount(listName, options) {
    const list = useList(listName, options.namespace);
    const total = _total(listName);
    const pageSize = _pageSize(list, options);

    return Math.ceil(total / pageSize);
}
