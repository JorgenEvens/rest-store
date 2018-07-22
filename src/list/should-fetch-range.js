import isExpired from '../status/is-expired';
import isOK from '../status/is-ok';
import _entries from './_entries';

export default
function shouldFetchRange(root, listName, start, end) {
    const entries = _entries(root, listName, start, end);

    return entries.reduce((r, entry) => {
        return r || isExpired(entry) || !isOK(entry);
    }, false);
}
