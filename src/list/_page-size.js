import { isUndefined } from '../utils';

export default
function _pageSize(list, opts = {}) {
    list = list  || {};

    if (!isUndefined(opts.pageSize))
        return opts.pageSize;

    if (!isUndefined(list.pageSize))
        return list.pageSize;

    return 10;
}

