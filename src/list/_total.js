import { isUndefined } from '../utils';

export default
function _total(list) {
    if (!isUndefined(list.total))
        return list.total;

    return Infinity;
}
