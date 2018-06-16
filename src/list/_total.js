import { isUndefined } from '../utils';

export default
function _total(list) {
    const { entries } = list;

    return isUndefined(list.total) ? entries.length : list.total;
}
