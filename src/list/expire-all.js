import _list from './_list';
import expireRange from './expire-range';

export default
function expireAll(root, listName) {
    const list = _list(root, listName);
    const end = Math.max(0, list.entries.length - 1);

    return expireRange(root, listName, 0, end);
}
