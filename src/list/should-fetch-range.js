import isExpired from '../status/is-expired';
import isOK from '../status/is-ok';
import isLoading from '../status/is-loading';
import _entries from './_entries';
import _list from './_list';
import _total from './_total';

export default
function shouldFetchRange(root, listName, start, end) {
    const list = _list(root, listName);
    const total = _total(list);

    end = Math.min(end, total - 1); // Limit end to the number of entries
    end = Math.max(0, end); // Prevent negative numbers (when total == 0)

    const entries = _entries(root, listName, start, end);

    return entries.reduce((r, entry) => {

        // If entry is in a valid state don't refresh it
        const isValid = isOK(entry) || isLoading(entry);

        return r || !isValid || isExpired(entry);
    }, false);
}
